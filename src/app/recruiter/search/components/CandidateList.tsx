import { Candidate } from "@/data/mockCandidates";
import CandidateCard from "./CandidateCard";

interface Props {
  candidates: Candidate[];
}

export default function CandidateList({ candidates }: Props) {
  if (!candidates || candidates.length === 0) {
    return (
      <div className="w-full py-20 flex justify-center items-center">
        <p className="text-center text-gray-800 text-xl font-semibold">
          No candidates found.
        </p>
      </div>
    );
  }

  return (
    <section className="md:col-span-3 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {candidates.map((candidate) => (
        <CandidateCard key={candidate.id} candidate={candidate} />
      ))}
    </section>
  );
}
