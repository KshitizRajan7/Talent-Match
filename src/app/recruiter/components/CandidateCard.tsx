import Link from "next/link";
import { Candidate } from "@/data/mockCandidates";

export default function CandidateCard({ candidate }: { candidate: Candidate }) {
  return (
    <Link href={`/recruiter/candidates/${candidate.id}`}>
      <div className="border rounded-xl p-4 bg-white hover:shadow-lg transition cursor-pointer">
        <h3 className="font-semibold text-lg">{candidate.primaryRole}</h3>
        <p className="text-sm text-gray-600">
          {candidate.fullName} • {candidate.city}, {candidate.country}
        </p>
        <p className="mt-2 text-sm text-gray-700">
          {candidate.experienceLevel} • {candidate.experienceYears} years
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {candidate.skills.slice(0, 3).map((skill) => (
            <span
              key={skill.name}
              className="text-xs bg-gray-100 px-2 py-1 rounded-full"
            >
              {skill.name} • {skill.level}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
