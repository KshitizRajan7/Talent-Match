import Link from "next/link";
import { Users } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <Link href="/recruiter">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          <Users size={20} />
          Go to Recruiter
        </button>
      </Link>
    </main>
  );
}
