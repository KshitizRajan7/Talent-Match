"use client";

import { useState } from "react";
import RecruiterSearchClient from "./RecruiterSearchClient";
import { Candidate, CandidateSkill, ExperienceLevel } from "@/data/mockCandidates";
import { CandidateFilters, fetchCandidates } from "@/lib/api/candidates";
import SearchForm from "./SearchForm";

export default function RecruiterSearchPage() {
  const [filters, setFilters] = useState<CandidateFilters | null>(null);

  const [initialCandidates, setInitialCandidates] = useState<Candidate[]>([]);

  const handleSearchSubmit = async (formFilters: typeof filters) => {
    if (!formFilters) return;

    // Fetch candidates according to search form
    const data = await fetchCandidates(formFilters);
    setInitialCandidates(data);
    setFilters(formFilters); // triggers RecruiterSearchClient to render
  };

  // Step 1: Show search form
  if (!filters) {
    return <SearchForm onSubmit={handleSearchSubmit} />;
  }

  // Step 2: Show recruiter search client with sidebar + candidate list
  return (
    <RecruiterSearchClient initialCandidates={initialCandidates} initialFilters={filters} />
  );
}
