import { Candidate } from "@/data/mockCandidates";
import CandidateCard from "./CandidateCard";

export default function CandidateList({ candidates }: { candidates: Candidate[] }) {
  return (
    <section className="md:col-span-3 grid gap-4 sm:grid-cols-2">
      {candidates.map((candidate) => (
        <CandidateCard key={candidate.id} candidate={candidate} />
      ))}
    </section>
  );
}
