"use client";

import { useState } from "react";
import SearchForm from "../search/SearchForm"; // your SearchForm component
import RecruiterSearchClient from "./RecruiterSearchClient";
import { Candidate, ExperienceLevel } from "@/data/mockCandidates";
import { fetchCandidates, CandidateFilters } from "@/lib/api/candidates";

export default function SearchPage() {
  const [showClient, setShowClient] = useState(false);
  const [filters, setFilters] = useState<CandidateFilters | null>(null);

  const [initialCandidates, setInitialCandidates] = useState<Candidate[]>([]);

  const handleSearchSubmit = async (formFilters: CandidateFilters) => {
    if (!formFilters) return;

    // Fetch candidates according to submitted search form
    const data = await fetchCandidates(formFilters);
    setInitialCandidates(data);

    // Set filters and show RecruiterSearchClient
    setFilters(formFilters);
    setShowClient(true);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Search Candidates</h1>

      {/* Step 1: Show search form */}
      {!showClient && <SearchForm onSubmit={handleSearchSubmit} />}

      {/* Step 2: Show RecruiterSearchClient after submit */}
      {showClient && filters && (
        <RecruiterSearchClient
          initialCandidates={initialCandidates}
          initialFilters={filters}
        />
      )}
    </main>
  );
}
