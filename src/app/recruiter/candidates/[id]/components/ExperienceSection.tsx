import { Candidate } from "@/data/mockCandidates";

export default function ExperienceSection({ candidate }: { candidate: Candidate }) {
  return (
    <section>
      <h2 className="font-semibold mb-2">Work Experience</h2>
      <ul className="list-disc list-inside">
        {candidate.workExperiences.map((we, idx) => (
          <li key={idx}>
            <strong>{we.position}</strong> at {we.company} (
            {we.startYear} - {we.endYear ?? "Present"})
          </li>
        ))}
      </ul>
    </section>
  );
}
