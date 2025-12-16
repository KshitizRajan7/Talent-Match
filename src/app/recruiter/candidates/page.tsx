  import { fetchCandidates } from "@/lib/api/candidates";
  import CandidateList from "../components/CandidateList";
  import { Candidate } from "@/data/mockCandidates";

  export default async function RecruiterSearchPage() {
    // Fetch initial candidates on the server (server component)
    const initialCandidates: Candidate[] = await fetchCandidates();

    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Search Candidates</h1>

        {/* Pass initialCandidates to client component */}
        <CandidateList candidates={initialCandidates} />
      </main>
    );
  }
