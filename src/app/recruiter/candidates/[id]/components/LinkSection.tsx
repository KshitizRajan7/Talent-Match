import { Candidate } from "@/data/mockCandidates";

export default function LinkSection({ candidate }: { candidate: Candidate }) {
  const { linkedin, portfolio, github } = candidate.links;

  return (
    <section>
      <h2 className="font-semibold mb-2">Links</h2>
      <div className="flex gap-4">
        {linkedin && (
          <a href={linkedin} target="_blank" className="text-blue-600 underline">
            LinkedIn
          </a>
        )}
        {portfolio && (
          <a href={portfolio} target="_blank" className="text-blue-600 underline">
            Portfolio
          </a>
        )}
        {github && (
          <a href={github} target="_blank" className="text-blue-600 underline">
            GitHub
          </a>
        )}
      </div>
    </section>
  );
}
