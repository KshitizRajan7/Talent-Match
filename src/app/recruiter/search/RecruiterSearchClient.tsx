"use client";

import { useState, useEffect } from "react";
import { fetchCandidates } from "@/lib/api/candidates";
import { Candidate, ExperienceLevel } from "@/data/mockCandidates";

import FilterSidebar from "./components/FilterSideBar";
import CandidateList from "./components/CandidateList";

interface Props {
  initialCandidates: Candidate[];
  initialFilters?: {
    role: string;
    skills: string[]; // changed to array
    experienceLevel?: ExperienceLevel;
    country: string;
  };
}

export default function RecruiterSearchClient({ initialCandidates, initialFilters }: Props) {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);

  const [filters, setFilters] = useState(initialFilters || {
    role: "",
    skills: [], // default empty array
    experienceLevel: undefined,
    country: "",
  });

  // Fetch candidates whenever filters change
  useEffect(() => {
    const getCandidates = async () => {
      try {
        const data = await fetchCandidates(filters);
        setCandidates(data);
      } catch (err) {
        console.error(err);
      }
    };

    getCandidates();
  }, [filters]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <FilterSidebar filters={filters} onChange={setFilters} />
      <CandidateList candidates={candidates} />
    </div>
  );
}
