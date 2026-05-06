"use server";

export async function testEnv() {
  console.log("SUPABASE URL:", process.env.SUPABASE_URL);
}