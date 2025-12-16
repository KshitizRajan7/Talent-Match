// "use client";

import { fetchCandidateById } from "@/lib/api/candidates";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CandidateDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const candidate = await fetchCandidateById(resolvedParams.id);

  if (!candidate) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Candidate Not Found</h1>
        <p className="text-gray-600">The candidate you are looking for does not exist.</p>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <header className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200 space-y-3">
        <h1 className="text-4xl font-bold text-gray-900">{candidate.fullName}</h1>
        <p className="text-lg text-gray-700">{candidate.primaryRole}</p>
        <p className="text-gray-600">{candidate.city}, {candidate.country}</p>
        <p className="text-gray-700">{candidate.experienceLevel} • {candidate.experienceYears} years</p>
        <p className="text-gray-700">Job Types: {candidate.jobTypes.join(", ")}</p>
        <p className="text-gray-700">Location Preference: {candidate.locationPreference}</p>
        <p className="text-gray-700">
          Email: <a href={`mailto:${candidate.email}`} className="text-blue-600 underline hover:text-blue-800 transition">{candidate.email}</a>
        </p>
      </header>

      {/* Skills */}
      <section className="bg-white p-6 rounded-2xl shadow border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {candidate.skills.map((skill) => (
            <span
              key={skill.name}
              className="px-4 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium shadow-sm"
            >
              {skill.name} • {skill.level}
            </span>
          ))}
        </div>
      </section>

      {/* Work Experience */}
      <section className="bg-white p-6 rounded-2xl shadow border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Work Experience</h2>
        <div className="space-y-3">
          {candidate.workExperiences.map((exp, idx) => (
            <div key={idx} className="p-4 border rounded-xl bg-gray-50 hover:bg-gray-100 transition">
              <p className="font-medium text-gray-800">{exp.position} @ {exp.company}</p>
              <p className="text-gray-600">{exp.startYear} - {exp.endYear ?? "Present"}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="bg-white p-6 rounded-2xl shadow border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Education</h2>
        <div className="space-y-3">
          {candidate.education.map((edu, idx) => (
            <div key={idx} className="p-4 border rounded-xl bg-gray-50 hover:bg-gray-100 transition">
              <p className="font-medium text-gray-800">{edu.degree} in {edu.field}</p>
              <p className="text-gray-600">{edu.institution} • {edu.graduationYear}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Links */}
      <section className="bg-white p-6 rounded-2xl shadow border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Links</h2>
        <ul className="flex flex-wrap gap-4">
          {candidate.links.linkedin && (
            <li>
              <a href={candidate.links.linkedin} target="_blank" className="px-4 py-2 rounded bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition">LinkedIn</a>
            </li>
          )}
          {candidate.links.github && (
            <li>
              <a href={candidate.links.github} target="_blank" className="px-4 py-2 rounded bg-gray-50 text-gray-800 font-medium hover:bg-gray-100 transition">GitHub</a>
            </li>
          )}
          {candidate.links.portfolio && (
            <li>
              <a href={candidate.links.portfolio} target="_blank" className="px-4 py-2 rounded bg-green-50 text-green-700 font-medium hover:bg-green-100 transition">Portfolio</a>
            </li>
          )}
        </ul>
      </section>
    </main>
  );
}
