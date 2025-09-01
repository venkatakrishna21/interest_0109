"use client";
import { useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";

export default function CustomerLogin() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("Sending magic link...");
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) setMsg("Error: " + error.message);
    else setMsg("Check your email for the login link.");
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Customer Login</h1>
      <form className="space-y-4" onSubmit={onSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full border rounded-lg px-3 py-2"
          required
        />
        <button className="w-full rounded-lg px-4 py-2 bg-blue-600 text-white">Send Magic Link</button>
      </form>
      {msg && <p className="mt-4 text-sm text-gray-700">{msg}</p>}
    </div>
  );
}
