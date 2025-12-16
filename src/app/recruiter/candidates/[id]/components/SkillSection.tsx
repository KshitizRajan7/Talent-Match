import { Candidate } from "@/data/mockCandidates";

export default function SkillSection({ candidate }: { candidate: Candidate }) {
  return (
    <section>
      <h2 className="font-semibold mb-2">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {candidate.skills.map((skill) => (
          <span
            key={skill.name}
            className="px-3 py-1 rounded-full bg-gray-100 text-xs"
          >
            {skill.name} • {skill.level}
          </span>
        ))}
      </div>
    </section>
  );
}
