"use client";

import { useState } from "react";
import { CandidateFilters } from "@/lib/api/candidates";
import {
  CandidateSkill,
  ExperienceLevel,
  JobType,
  mockCandidates,
} from "@/data/mockCandidates";

interface Props {
  filters: CandidateFilters;
  onChange: React.Dispatch<React.SetStateAction<CandidateFilters>>;
}

// Extract unique roles, skills, and countries from mockCandidates
const ALL_ROLES = Array.from(new Set(mockCandidates.map((c) => c.primaryRole)));
const ALL_SKILLS = Array.from(
  new Set(mockCandidates.flatMap((c) => c.skills.map((s) => s.name)))
);
const ALL_COUNTRIES = Array.from(new Set(mockCandidates.map((c) => c.country)));

const JOB_TYPES: JobType[] = ["Full-time", "Part-time", "Remote", "Internship"];
const LOCATION_PREFERENCES = ["Remote", "Onsite", "Hybrid"] as const;
const SKILL_LEVELS: CandidateSkill["level"][] = ["Beginner", "Intermediate", "Advanced", "Expert"];

export default function FilterSidebar({ filters, onChange }: Props) {
  const [roleInput, setRoleInput] = useState(filters.role ?? "");
  const [skillInput, setSkillInput] = useState("");
  const [countryInput, setCountryInput] = useState(filters.country ?? "");

  // Handle adding a new skill
  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newSkill = skillInput.trim();
      if (!newSkill) return;

      const exists = filters.skills?.some(
        (s) => s.name.toLowerCase() === newSkill.toLowerCase()
      );
      if (!exists) {
        onChange((prev) => ({
          ...prev,
          skills: [...(prev.skills ?? []), { name: newSkill, level: "Beginner" }],
        }));
      }

      setSkillInput("");
    }
  };

  const removeSkill = (name: string) => {
    onChange((prev) => ({
      ...prev,
      skills: prev.skills?.filter((s) => s.name !== name),
    }));
  };

  const changeSkillLevel = (name: string, level: CandidateSkill["level"]) => {
    onChange((prev) => ({
      ...prev,
      skills: prev.skills?.map((s) =>
        s.name === name ? { ...s, level } : s
      ),
    }));
  };

  return (
    <aside className="w-full md:w-64 p-6 bg-white rounded-3xl shadow-xl border border-gray-200 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Filters</h2>

      {/* Role */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Role
        </label>
        <input
          className="w-full border p-3 rounded-lg"
          placeholder="Select or type role"
          list="roles"
          value={roleInput}
          onChange={(e) => {
            setRoleInput(e.target.value);
            onChange((prev) => ({ ...prev, role: e.target.value || undefined }));
          }}
        />
        <datalist id="roles">
          {ALL_ROLES.map((r) => (
            <option key={r} value={r} />
          ))}
        </datalist>
      </div>

      {/* Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Skills
        </label>
        <input
          className="w-full border p-3 rounded-lg"
          placeholder="Add skill (press Enter or comma)"
          list="skills"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={handleSkillKeyDown}
        />
        <datalist id="skills">
          {ALL_SKILLS.map((s) => (
            <option key={s} value={s} />
          ))}
        </datalist>
        <div className="flex flex-wrap gap-2 mt-2">
          {filters.skills?.map((s) => (
            <div key={s.name} className="flex items-center gap-2 bg-teal-100 px-3 py-1 rounded-full">
              <span>{s.name}</span>
              <select
                className="border rounded px-1"
                value={s.level}
                onChange={(e) => changeSkillLevel(s.name, e.target.value as CandidateSkill["level"])}
              >
                {SKILL_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
              <button type="button" className="font-bold" onClick={() => removeSkill(s.name)}>
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Experience Level
        </label>
        <select
          className="w-full border p-3 rounded-lg"
          value={filters.experienceLevel ?? ""}
          onChange={(e) =>
            onChange({
              ...filters,
              experienceLevel: e.target.value ? (e.target.value as ExperienceLevel) : undefined,
            })
          }
        >
          <option value="">Select level</option>
          <option value="Junior">Junior</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>
      </div>

      {/* Country */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Country
        </label>
        <input
          className="w-full border p-3 rounded-lg"
          placeholder="Select or type country"
          list="countries"
          value={countryInput}
          onChange={(e) => {
            setCountryInput(e.target.value);
            onChange((prev) => ({ ...prev, country: e.target.value || undefined }));
          }}
        />
        <datalist id="countries">
          {ALL_COUNTRIES.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </div>

      {/* Job Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Job Type
        </label>
        <div className="flex flex-wrap gap-2">
          {JOB_TYPES.map((type) => (
            <button
              type="button"
              key={type}
              className={`px-3 py-1 rounded-full border ${
                filters.jobType === type ? "bg-teal-600 text-white" : "bg-white"
              }`}
              onClick={() =>
                onChange((prev) => ({ ...prev, jobType: type }))
              }
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Location Preference */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location Preference
        </label>
        <div className="flex flex-wrap gap-2">
          {LOCATION_PREFERENCES.map((loc) => (
            <button
              type="button"
              key={loc}
              className={`px-3 py-1 rounded-full border ${
                filters.locationPreference === loc ? "bg-teal-600 text-white" : "bg-white"
              }`}
              onClick={() =>
                onChange((prev) => ({ ...prev, locationPreference: loc }))
              }
            >
              {loc}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
