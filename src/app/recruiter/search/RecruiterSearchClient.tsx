"use client";

import { useState, useEffect } from "react";
import { CandidateFilters, fetchCandidates } from "@/lib/api/candidates";
import { Candidate, ExperienceLevel } from "@/data/mockCandidates";

import FilterSidebar from "./components/FilterSideBar";
import CandidateList from "./components/CandidateList";

interface Props {
  initialCandidates: Candidate[];
  initialFilters?: CandidateFilters;
}

export default function RecruiterSearchClient({
  initialCandidates,
  initialFilters,
}: Props) {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [filters, setFilters] = useState<CandidateFilters>(
    initialFilters || {}
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only fetch after mount to avoid hydration mismatch
  useEffect(() => {
    if (!mounted) return;

    const getCandidates = async () => {
      try {
        const data = await fetchCandidates(filters);
        setCandidates(data);
      } catch (err) {
        console.error(err);
      }
    };

    getCandidates();
  }, [filters, mounted]);

  if (!mounted) return null; // prevents server/client mismatch

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <FilterSidebar filters={filters} onChange={setFilters} />
      <CandidateList candidates={candidates} />
    </div>
  );
}
