import { LeadForm } from "@/components/LeadForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-100 px-6 py-16">
      <section className="mx-auto max-w-xl rounded-2xl bg-white p-10 shadow-sm">

        <p className="mb-2 text-sm font-semibold text-[#ec5c39]">
          Secco Squared
        </p>

        <h1 className="mb-3 text-3xl font-bold tracking-tight text-black">
          Let’s start a conversation
        </h1>

        <p className="mb-8 text-zinc-600">
          Tell us a little about yourself and we’ll follow up soon.
        </p>

        <LeadForm />
      </section>
      <div className="mt-6 text-center">
        <a href="/leads" className="text-sm text-[#ec5c39] underline">
          View submitted leads →
        </a>
      </div>  
    </main>
    
  );
}