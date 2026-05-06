"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function submitLead(formData: FormData) {
  const fullName = String(formData.get("fullName") || "");
  const email = String(formData.get("email") || "");
  const company = String(formData.get("company") || "");
  const source = String(formData.get("source") || "");
  const message = String(formData.get("message") || "");

  console.log("Submitting lead:", { fullName, email, company, source, message });

  const { data, error } = await supabaseAdmin
    .from("leads")
    .insert({
      full_name: fullName,
      email,
      company,
      source,
      message,
    })
    .select();

  if (error) {
    console.error("Supabase error:", error);
    return;
  }

  console.log("Lead inserted:", data);
}