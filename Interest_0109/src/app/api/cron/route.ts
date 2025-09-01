import { NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabaseAdmin';

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Example: Apply daily interest
  const { data: debts, error } = await supabaseAdmin.from('debts').select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  for (const debt of debts) {
    const newPrincipal =
      Number(debt.principal) *
      (1 + (Number(debt.interest_rate) || 0) / 100 / 30);

    await supabaseAdmin
      .from('debts')
      .update({ principal: newPrincipal, updated_at: new Date().toISOString() })
      .eq('id', debt.id);
  }

  return NextResponse.json({ message: 'Interest updated successfully' });
}
