"use client";

import { ExperienceLevel } from "@/data/mockCandidates";
import { useState } from "react";

interface Props {
  onSubmit: (filters: {
    role: string;
    skills: string[];
    experienceLevel?: ExperienceLevel;
    country: string;
    jobType?: string;
    locationPreference?: string;
  }) => void;
}

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];
const LOCATION_PREFERENCES = ["Remote", "On-site", "Hybrid"];

export default function SearchForm({ onSubmit }: Props) {
  const [role, setRole] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | "">("");
  const [country, setCountry] = useState("");
  const [jobType, setJobType] = useState<string | "">("");
  const [locationPreference, setLocationPreference] = useState<string | "">("");

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newSkill = skillInput.trim();
      if (newSkill && !skills.includes(newSkill)) {
        setSkills([...skills, newSkill]);
        setSkillInput("");
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      role,
      skills,
      experienceLevel: experienceLevel || undefined,
      country,
      jobType: jobType || undefined,
      locationPreference: locationPreference || undefined,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-8 bg-white rounded-3xl shadow-xl border border-gray-300 space-y-6"
    >
      <h2 className="text-3xl font-bold mb-1 text-center text-gray-900">Search Candidates</h2>
      <p className="text-center text-gray-600 mb-6 text-sm">
        Filter candidates by role, skills, experience, location, and job type.
      </p>

      {/* Role */}
      <div>
        <label className="block text-gray-800 font-semibold mb-2">Role</label>
        <input
          type="text"
          placeholder="e.g., Frontend Developer"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border border-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition placeholder-gray-500 text-gray-900"
        />
      </div>

      {/* Skills */}
      <div>
        <label className="block text-gray-800 font-semibold mb-2">Skills</label>
        <input
          type="text"
          placeholder="Type and press Enter or comma"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={handleSkillKeyDown}
          className="w-full border border-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition placeholder-gray-500 text-gray-900"
        />
        <div className="flex flex-wrap mt-3 gap-2">
          {skills.map((s) => (
            <span
              key={s}
              className="flex items-center gap-2 bg-teal-100 text-teal-900 px-3 py-1 rounded-full text-sm font-semibold shadow-sm"
            >
              {s}
              <button
                type="button"
                className="text-teal-900 font-bold hover:text-teal-700 transition"
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
        <label className="block text-gray-800 font-semibold mb-2">Experience Level</label>
        <select
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
          className="w-full border border-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-900"
        >
          <option value="">Any Experience</option>
          <option value="Junior">Junior</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>
      </div>

      {/* Country */}
      <div>
        <label className="block text-gray-800 font-semibold mb-2">Country</label>
        <input
          type="text"
          placeholder="e.g., United States"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full border border-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition placeholder-gray-500 text-gray-900"
        />
      </div>

      {/* Job Type */}
      <div>
        <label className="block text-gray-800 font-semibold mb-2">Job Type</label>
        <div className="flex flex-wrap gap-2">
          {JOB_TYPES.map((type) => (
            <button
              type="button"
              key={type}
              className={`px-4 py-2 rounded-full border font-medium text-sm transition ${
                jobType === type
                  ? "bg-teal-600 text-white border-teal-600"
                  : "bg-white text-gray-700 border-gray-400 hover:bg-gray-100"
              }`}
              onClick={() => setJobType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Location Preference */}
      <div>
        <label className="block text-gray-800 font-semibold mb-2">Location Preference</label>
        <div className="flex flex-wrap gap-2">
          {LOCATION_PREFERENCES.map((loc) => (
            <button
              type="button"
              key={loc}
              className={`px-4 py-2 rounded-full border font-medium text-sm transition ${
                locationPreference === loc
                  ? "bg-teal-600 text-white border-teal-600"
                  : "bg-white text-gray-700 border-gray-400 hover:bg-gray-100"
              }`}
              onClick={() => setLocationPreference(loc)}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition text-lg"
      >
        Search
      </button>
    </form>
  );
}
