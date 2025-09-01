import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function GET(req: Request) {
  // 🔒 Security check
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Example: Fetch all debts that are due today
  const { data: debts, error } = await supabaseAdmin
    .from("debts")
    .select("*")
    .eq("status", "due");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Optional: send emails
  if (debts && debts.length > 0) {
    for (const debt of debts) {
      try {
        await resend.emails.send({
          from: process.env.EMAIL_FROM!,
          to: "customer@example.com", // 👈 replace with debt.customer_email if you store it
          subject: "Debt Reminder",
          html: `<p>Hi, your debt of <b>${debt.principal}</b> is due. Please make payment.</p>`,
        });
      } catch (err) {
        console.error("Email send error:", err);
      }
    }
  }

  return NextResponse.json({ success: true, sent: debts?.length || 0 });
}
