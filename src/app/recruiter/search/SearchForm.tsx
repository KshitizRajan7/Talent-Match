"use client";

import { useState } from "react";
import { CandidateSkill,SkillLevel, JobType, ExperienceLevel } from "@/data/mockCandidates";
import { CandidateFilters } from "@/lib/api/candidates";

interface Props {
  onSubmit: (filters: CandidateFilters) => void;
}

// interface SelectedSkill {
//   name: string;
//   level: SkillLevel;
// }

const ALL_SKILLS = [
  "React",
  "JavaScript",
  "TypeScript",
  "Next.js",
  "Node.js",
  "MongoDB",
  "Docker",
  "Tailwind CSS",
  "Figma",
  "Python",
];

const ALL_ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "UI/UX Designer",
  "DevOps Engineer",
  "Product Manager",
];

const ALL_COUNTRIES = [
  "Nepal",
  "India",
  "United States",
  "Germany",
  "Canada",
  "Australia",
];

const JOB_TYPES: JobType[] = [
  "Full-time",
  "Part-time",
  "Remote",
  "Internship",
];

const LOCATIONS = ["Onsite", "Remote", "Hybrid"] as const;

export default function SearchForm({ onSubmit }: Props) {
  const [role, setRole] = useState("");
  const [roleInput, setRoleInput] = useState("");
  const [country, setCountry] = useState("");
  const [countryInput, setCountryInput] = useState("");
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | "">("");
  const [jobTypes, setJobTypes] = useState<JobType[]>([]);
  const [locationPreference, setLocationPreference] = useState<(typeof LOCATIONS)[number] | "">("");

  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<CandidateSkill[]>([]);

  // Suggestions
  const filteredSkills = ALL_SKILLS.filter(
    (s) =>
      s.toLowerCase().includes(skillInput.toLowerCase()) &&
      !skills.some((sk) => sk.name === s)
  );

  const filteredRoles = ALL_ROLES.filter(
    (r) =>
      r.toLowerCase().includes(roleInput.toLowerCase())
  );

  const filteredCountries = ALL_COUNTRIES.filter(
    (c) =>
      c.toLowerCase().includes(countryInput.toLowerCase())
  );

  // Handlers
  const addSkill = (name: string) => {
    setSkills([...skills, { name, level: "Beginner" }]);
    setSkillInput("");
  };

  const updateSkillLevel = (name: string, level: SkillLevel) => {
    setSkills((prev) =>
      prev.map((s) => (s.name === name ? { ...s, level } : s))
    );
  };

  const removeSkill = (name: string) => {
    setSkills(skills.filter((s) => s.name !== name));
  };

  const handleJobTypeToggle = (type: JobType) => {
    if (jobTypes.includes(type)) {
      setJobTypes(jobTypes.filter((j) => j !== type));
    } else {
      setJobTypes([...jobTypes, type]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      role: role || undefined,
      country: country || undefined,
      experienceLevel: experienceLevel || undefined,
      jobType: jobTypes.length > 0 ? jobTypes[0] : undefined,
      locationPreference: locationPreference || undefined,
       skills: skills.length > 0 ? skills : undefined,  
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow space-y-6">
      <h2 className="text-2xl font-bold text-center">Search Candidates</h2>

      {/* Role */}
      <div className="relative">
        <label className="block font-semibold mb-1">Role</label>
        <input
          className="w-full border p-3 rounded"
          placeholder="Type role"
          value={roleInput || role}
          onChange={(e) => {
            setRoleInput(e.target.value);
            setRole(""); // reset role when typing
          }}
        />
        {roleInput && filteredRoles.length > 0 && (
          <ul className="absolute z-10 bg-white border w-full rounded mt-1">
            {filteredRoles.map((r) => (
              <li
                key={r}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setRole(r);
                  setRoleInput("");
                }}
              >
                {r}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Skills */}
      <div className="relative">
        <label className="block font-semibold mb-1">Skills</label>
        <input
          className="w-full border p-3 rounded"
          placeholder="Type skill"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
        />
        {skillInput && filteredSkills.length > 0 && (
          <ul className="absolute z-10 bg-white border w-full rounded mt-1">
            {filteredSkills.map((s) => (
              <li
                key={s}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => addSkill(s)}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map((s) => (
            <div key={s.name} className="flex items-center gap-2 bg-teal-100 px-3 py-2 rounded">
              <span>{s.name}</span>
              <select
                value={s.level}
                onChange={(e) => updateSkillLevel(s.name, e.target.value as SkillLevel)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Expert</option>
              </select>
              <button type="button" onClick={() => removeSkill(s.name)}>×</button>
            </div>
          ))}
        </div>
      </div>

      {/* Country */}
      <div className="relative">
        <label className="block font-semibold mb-1">Country</label>
        <input
          className="w-full border p-3 rounded"
          placeholder="Type country"
          value={countryInput || country}
          onChange={(e) => {
            setCountryInput(e.target.value);
            setCountry(""); // reset selected country
          }}
        />
        {countryInput && filteredCountries.length > 0 && (
          <ul className="absolute z-10 bg-white border w-full rounded mt-1">
            {filteredCountries.map((c) => (
              <li
                key={c}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setCountry(c);
                  setCountryInput("");
                }}
              >
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Experience Level */}
      <div>
        <label className="block font-semibold mb-1">Experience Level</label>
        <select
          className="w-full border p-3 rounded"
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
        >
          <option value="">Any</option>
          <option>Junior</option>
          <option>Mid</option>
          <option>Senior</option>
        </select>
      </div>

      {/* Job Types (multiple) */}
      <div>
        <label className="block font-semibold mb-1">Job Types</label>
        <div className="flex flex-wrap gap-2">
          {JOB_TYPES.map((jt) => (
            <button
              type="button"
              key={jt}
              className={`px-4 py-2 rounded-full border font-medium text-sm transition ${
                jobTypes.includes(jt)
                  ? "bg-teal-600 text-white border-teal-600"
                  : "bg-white text-gray-700 border-gray-400 hover:bg-gray-100"
              }`}
              onClick={() => handleJobTypeToggle(jt)}
            >
              {jt}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block font-semibold mb-1">Location Preference</label>
        <select
          className="w-full border p-3 rounded"
          value={locationPreference}
          onChange={(e) =>
            setLocationPreference(e.target.value as any)
          }
        >
          <option value="">Any</option>
          {LOCATIONS.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </div>

      <button className="w-full bg-teal-600 text-white py-3 rounded font-semibold">
        Search
      </button>
    </form>
  );
}
