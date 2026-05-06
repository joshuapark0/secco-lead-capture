"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";

export type LeadFormState = {
  success: boolean;
  message: string;
};

export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const fullName = String(formData.get("fullName") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const company = String(formData.get("company") || "").trim();
  const source = String(formData.get("source") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!fullName) return { success: false, message: "Full name is required." };

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  if (!["Google", "Referral", "Social", "Other"].includes(source)) {
    return { success: false, message: "Please select a source." };
  }

  const lead = {
    full_name: fullName,
    email,
    company: company || null,
    source,
    message: message || null,
  };

  const { error } = await supabaseAdmin.from("leads").insert(lead);

  if (error) {
    if (error.code === "23505") {
      return { success: false, message: "This email has already been submitted." };
    }

    console.error("Supabase insert error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }

  try {
    const response = await fetch(process.env.WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Candidate-Name": process.env.CANDIDATE_NAME!,
      },
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      console.error("Webhook failed:", {
        status: response.status,
        statusText: response.statusText,
      });
    }
  } catch (error) {
    console.error("Webhook request failed:", error);
  }

  return { success: true, message: "Thanks! Your information was submitted." };
}