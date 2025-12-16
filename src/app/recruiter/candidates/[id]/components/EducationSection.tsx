import { Candidate } from "@/data/mockCandidates";

export default function EducationSection({ candidate }: { candidate: Candidate }) {
  return (
    <section>
      <h2 className="font-semibold mb-2">Education</h2>
      <ul className="list-disc list-inside">
        {candidate.education.map((edu, idx) => (
          <li key={idx}>
            {edu.degree} in {edu.field}, {edu.institution} ({edu.graduationYear})
          </li>
        ))}
      </ul>
    </section>
  );
}
