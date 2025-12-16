"use client";

import { useState } from "react";
import { ExperienceLevel } from "@/data/mockCandidates";

interface Props {
  filters: {
    role: string;
    skills: string[];
    experienceLevel?: ExperienceLevel;
    country: string;
    jobType?: string;
    locationPreference?: string;
  };
  onChange: (filters: Props["filters"]) => void;
}

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];
const LOCATION_PREFERENCES = ["Remote", "On-site", "Hybrid"];

export default function FilterSidebar({ filters, onChange }: Props) {
  const [skillInput, setSkillInput] = useState("");

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newSkill = skillInput.trim();
      if (newSkill && !filters.skills.includes(newSkill)) {
        onChange({ ...filters, skills: [...filters.skills, newSkill] });
        setSkillInput("");
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange({
      ...filters,
      skills: filters.skills.filter((s) => s !== skillToRemove),
    });
  };

  return (
    <aside className="w-full md:w-64 p-6 bg-white rounded-3xl shadow-xl border border-gray-200 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Filters</h2>

      {/* Role */}
      <div>
        <input
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
          placeholder="Role (e.g., Frontend Developer)"
          value={filters.role}
          onChange={(e) => onChange({ ...filters, role: e.target.value })}
        />
      </div>

      {/* Skills */}
      <div>
        <input
          className="w-full border border-gray-300 p-3 rounded-lg mb-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
          placeholder="Skills (press Enter or comma)"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={handleSkillKeyDown}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {filters.skills.map((s) => (
            <span
              key={s}
              className="flex items-center gap-1 bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
            >
              {s}
              <button
                type="button"
                className="text-teal-800 font-bold hover:text-teal-900 transition"
                onClick={() => removeSkill(s)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div>
        <select
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
          value={filters.experienceLevel ?? ""}
          onChange={(e) =>
            onChange({
              ...filters,
              experienceLevel: e.target.value ? (e.target.value as ExperienceLevel) : undefined,
            })
          }
        >
          <option value="">Experience Level</option>
          <option value="Junior">Junior</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>
      </div>

      {/* Country */}
      <div>
        <input
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
          placeholder="Country"
          value={filters.country}
          onChange={(e) => onChange({ ...filters, country: e.target.value })}
        />
      </div>

      {/* Job Type (single selection) */}
      <div>
        <p className="text-gray-700 font-medium mb-2">Job Type</p>
        <div className="flex flex-wrap gap-2">
          {JOB_TYPES.map((type) => (
            <button
              type="button"
              key={type}
              className={`px-3 py-1 rounded-full border text-sm font-medium transition ${
                filters.jobType === type
                  ? "bg-teal-600 text-white border-teal-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => onChange({ ...filters, jobType: type })}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Location Preference (single selection) */}
      <div>
        <p className="text-gray-700 font-medium mb-2">Location Preference</p>
        <div className="flex flex-wrap gap-2">
          {LOCATION_PREFERENCES.map((loc) => (
            <button
              type="button"
              key={loc}
              className={`px-3 py-1 rounded-full border text-sm font-medium transition ${
                filters.locationPreference === loc
                  ? "bg-teal-600 text-white border-teal-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => onChange({ ...filters, locationPreference: loc })}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
