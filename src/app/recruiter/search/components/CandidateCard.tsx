import Link from "next/link";
import { Candidate } from "@/data/mockCandidates";

export default function CandidateCard({ candidate }: { candidate: Candidate }) {
  return (
    <Link href={`/recruiter/candidates/${candidate.id}`}>
      <div className="border border-gray-200 rounded-3xl p-6 bg-white hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer flex flex-col justify-between">
        
        {/* Candidate Role */}
        <h3 className="font-semibold text-lg text-gray-900 mb-1 truncate">
          {candidate.primaryRole}
        </h3>

        {/* Name and Location */}
        <p className="text-sm text-gray-600 mb-1 truncate">
          {candidate.fullName} • {candidate.city}, {candidate.country}
        </p>

        {/* Experience */}
        <p className="text-sm text-gray-700 mb-3">
          {candidate.experienceLevel} • {candidate.experienceYears} {candidate.experienceYears > 1 ? "years" : "year"}
        </p>

        {/* Job Types & Location Preference */}
        <div className="flex flex-wrap gap-2 mb-3">
          {candidate.jobTypes?.map((jobType) => (
            <span
              key={jobType}
              className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full font-medium"
            >
              {jobType}
            </span>
          ))}
          {candidate.locationPreference && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium">
              {candidate.locationPreference}
            </span>
          )}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {candidate.skills.slice(0, 3).map((skill) => (
            <span
              key={skill.name}
              className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium"
            >
              {skill.name} • {skill.level}
            </span>
          ))}
          {candidate.skills.length > 3 && (
            <span className="text-xs bg-gray-200 text-gray-800 px-3 py-1 rounded-full font-medium">
              +{candidate.skills.length - 3} more
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
