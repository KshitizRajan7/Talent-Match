import Link from "next/link";
import { Users, Search, ClipboardList } from "lucide-react";

  export default async function RecruiterSearchPage() {

    const dashboardItems = [
    {
      title: "Recruiter Search",
      description: "Search candidates with advanced filters and view detailed profiles.",
      href: "/recruiter/search",
      icon: Search,
      bg: "bg-blue-600",
    },
    {
      title: "All Candidates",
      description: "View and manage all candidates in the system efficiently.",
      href: "/recruiter/candidates",
      icon: Users,
      bg: "bg-green-600",
    },
    
  ];

    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        TalentMatch Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {dashboardItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group relative block rounded-2xl p-6 shadow-md bg-white border border-gray-200 hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <div
              className={`flex items-center justify-center w-14 h-14 rounded-full ${item.bg} text-white mb-5`}
            >
              <item.icon size={28} />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 group-hover:text-gray-800 transition">
              {item.title}
            </h2>
            <p className="text-gray-600 group-hover:text-gray-700 transition leading-relaxed">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
      </main>
    );
  }
