"use client";

import { ExperienceLevel } from "@/data/mockCandidates";

interface Props {
  filters: {
    role: string;
    skill: string;
    experienceLevel?: ExperienceLevel;
    country: string;
  };
  onChange: (filters: Props["filters"]) => void;
}

export default function FilterSidebar({ filters, onChange }: Props) {
  return (
    <aside className="md:col-span-1 border rounded-xl p-4 bg-white">
      <h2 className="font-semibold mb-4">Filters</h2>

      {/* Role input */}
      <input
        className="w-full border rounded p-2 mb-3"
        placeholder="Role (e.g. Frontend Developer)"
        value={filters.role}
        onChange={(e) => onChange({ ...filters, role: e.target.value })}
      />

      {/* Skill input */}
      <input
        className="w-full border rounded p-2 mb-3"
        placeholder="Skill (e.g. React)"
        value={filters.skill}
        onChange={(e) => onChange({ ...filters, skill: e.target.value })}
      />

      {/* Experience Level select */}
      <select
        className="w-full border rounded p-2 mb-3"
        value={filters.experienceLevel ?? ""}
        onChange={(e) =>
          onChange({
            ...filters,
            experienceLevel: e.target.value
              ? (e.target.value as ExperienceLevel)
              : undefined,
          })
        }
      >
        <option value="">Experience Level</option>
        <option value="Junior">Junior</option>
        <option value="Mid">Mid</option>
        <option value="Senior">Senior</option>
      </select>

      {/* Country input */}
      <input
        className="w-full border rounded p-2"
        placeholder="Country"
        value={filters.country}
        onChange={(e) => onChange({ ...filters, country: e.target.value })}
      />
    </aside>
  );
}
