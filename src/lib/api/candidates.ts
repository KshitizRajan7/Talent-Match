// lib/api/candidates.ts

import { mockCandidates, Candidate, ExperienceLevel, JobType, CandidateSkill } from "@/data/mockCandidates";

export interface CandidateFilters {
  role?: string;
  // skill?: string;
  skills?: CandidateSkill[]; // alternative for multiple skills
  country?: string;
  city?: string;
  experienceLevel?: ExperienceLevel;
  jobType?: JobType;
  locationPreference ?: Candidate["locationPreference"]  
}

/**
 * Simple text match helper (case-insensitive, partial).
 */
function includesIgnoreCase(haystack: string, needle: string): boolean {
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

/**
 * Filters candidates locally using mock data.
 * Later, this implementation can be replaced with a real API call
 * without changing the rest of the UI.
 */
export async function fetchCandidates(filters: CandidateFilters = {}): Promise<Candidate[]> {
  const { role, skills, country, city, experienceLevel, jobType } = filters;

  let results = [...mockCandidates];

  if (role && role.trim()) {
    results = results.filter((c) =>
      includesIgnoreCase(c.primaryRole, role)
    );
  }

  if (country && country.trim()) {
    results = results.filter((c) =>
      includesIgnoreCase(c.country, country)
    );
  }

  if (city && city.trim()) {
    results = results.filter((c) =>
      includesIgnoreCase(c.city, city)
    );
  }

  if (experienceLevel) {
    results = results.filter((c) => c.experienceLevel === experienceLevel);
  }

  if (jobType) {
    results = results.filter((c) => c.jobTypes.includes(jobType));
  }

  // // Single skill filter
  // if (skill && skill.trim()) {
  //   results = results.filter((c) =>
  //     c.skills.some((s) => includesIgnoreCase(s.name, skill))
  //   );
  // }

  // Multiple skills filter (all must be present)
  if (skills && skills.length > 0) {
    results = results.filter((c) =>
      skills.every((sk ) =>
        c.skills.some((s) => includesIgnoreCase(s.name, sk.name))
      )
    );
  }

  // Simulate async (e.g., for loading states in UI)
  await new Promise((resolve) => setTimeout(resolve, 150));

  return results;
}

/**
 * Fetch a single candidate by ID.
 * Later, this can be replaced with an actual fetch(`/api/candidates/${id}`)
 */
export async function fetchCandidateById(id: string): Promise<Candidate | null> {
  const candidate = mockCandidates.find((c) => c.id === id) || null;

  // Simulate async delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return candidate;
}