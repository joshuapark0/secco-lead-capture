"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitLead, type LeadFormState } from "@/app/actions";

const initialState: LeadFormState = {
  success: false,
  message: "",
};

export function LeadForm() {
  const [state, formAction, isPending] = useActionState(submitLead, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      {state.message && (
        <div
          className={`rounded-lg border p-4 text-sm ${
            state.success
              ? "border-[#ec5c39]/30 bg-[#ec5c39]/10 text-[#9f321c]"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {state.message}
        </div>
      )}

      <input
        name="fullName"
        placeholder="Full name"
        required
        className="w-full rounded-lg border-2 border-black px-4 py-3 text-black placeholder:text-zinc-400 focus:outline-none focus:border-[#ec5c39]"
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        required
       className="w-full rounded-lg border-2 border-black px-4 py-3 text-black placeholder:text-zinc-400 focus:outline-none focus:border-[#ec5c39]"
      />

      <input
        name="company"
        placeholder="Company"
      className="w-full rounded-lg border-2 border-black px-4 py-3 text-black placeholder:text-zinc-400 focus:outline-none focus:border-[#ec5c39]"
      />

      <select 
      name="source" 
      required  
      className="w-full rounded-lg border-2 border-black px-4 py-3 text-black placeholder:text-zinc-400 focus:outline-none focus:border-[#ec5c39]"
      >
        <option value="">How did you hear about us?</option>
        <option value="Google">Google</option>
        <option value="Referral">Referral</option>
        <option value="Social">Social</option>
        <option value="Other">Other</option>
      </select>

      <textarea
        name="message"
        placeholder="Message"
        rows={4}
       className="w-full rounded-lg border-2 border-black px-4 py-3 text-black placeholder:text-zinc-400 focus:outline-none focus:border-[#ec5c39]"
      />

      <button
        disabled={isPending}
        className="w-full rounded-lg bg-[#ec5c39] px-5 py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-60"
        >
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}