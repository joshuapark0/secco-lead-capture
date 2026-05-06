import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function LeadsPage() {
  const { data: leads, error } = await supabaseAdmin
    .from("leads")
    .select("id, full_name, email, company, source, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading leads:", error);

    return (
      <main className="min-h-screen bg-zinc-100 p-10">
        <p className="text-red-600">Error loading leads.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-100 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <a href="/" className="mb-6 inline-block text-sm text-[#ec5c39] underline">
          ← Back to form
        </a>

        <h1 className="mb-6 text-3xl font-bold text-black">Submitted Leads</h1>

        <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="border-b-2  bg-[#ec5c39] text-white">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Company</th>
                <th className="p-4">Source</th>
                <th className="p-4">Submitted</th>
              </tr>
            </thead>

            <tbody>
              {leads?.map((lead) => (
                <tr key={lead.id} className="border-b border-zinc-200 text-black">
                  <td className="p-4">{lead.full_name}</td>
                  <td className="p-4">{lead.email}</td>
                  <td className="p-4">{lead.company || "-"}</td>
                  <td className="p-4">{lead.source}</td>
                  <td className="p-4">
                    {new Date(lead.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}

              {leads?.length === 0 && (
                <tr>
                  <td className="p-4 text-zinc-600" colSpan={5}>
                    No leads submitted yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}