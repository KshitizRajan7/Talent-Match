
// data/mockCandidates.ts

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";
export type ExperienceLevel = "Junior" | "Mid" | "Senior";
export type JobType = "Full-time" | "Part-time" | "Remote" | "Internship";

export interface CandidateSkill {
  name: string;
  level: SkillLevel;
}

export interface WorkExperience {
  position: string;
  company: string;
  startYear: number;
  endYear: number | null; // null = current
}

export interface EducationEntry {
  degree: string;
  field: string;
  institution: string;
  graduationYear: number;
}

export interface CandidateLinks {
  linkedin?: string;
  portfolio?: string;
  github?: string;
}

export interface Candidate {
  id: string;
  fullName: string;
  email: string;
  country: string;
  city: string;
  primaryRole: string;
  experienceLevel: ExperienceLevel;
  jobTypes: JobType[];
  locationPreference: "Onsite" | "Remote" | "Hybrid";
  experienceYears: number;
  skills: CandidateSkill[];
  workExperiences: WorkExperience[];
  education: EducationEntry[];
  links: CandidateLinks;
}

// You can freely edit/add more candidates here.
export const mockCandidates: Candidate[] = [
  {
    id: "cand_001",
    fullName: "Sita Sharma",
    email: "sita@example.com",
    country: "Nepal",
    city: "Kathmandu",
    primaryRole: "Frontend Developer",
    experienceLevel: "Mid",
    jobTypes: ["Full-time", "Remote"],
    locationPreference: "Remote",
    experienceYears: 3,
    skills: [
      { name: "React", level: "Advanced" },
      { name: "JavaScript", level: "Advanced" },
      { name: "TypeScript", level: "Intermediate" },
      { name: "Tailwind CSS", level: "Intermediate" },
    ],
    workExperiences: [
      {
        position: "Frontend Developer",
        company: "ABC Tech",
        startYear: 2022,
        endYear: null,
      },
      {
        position: "Junior Frontend Developer",
        company: "XYZ Solutions",
        startYear: 2021,
        endYear: 2022,
      },
    ],
    education: [
      {
        degree: "BSc CSIT",
        field: "Computer Science",
        institution: "Some College, Kathmandu",
        graduationYear: 2021,
      },
    ],
    links: {
      linkedin: "https://linkedin.com/in/sita",
      portfolio: "https://sita.dev",
      github: "https://github.com/sita",
    },
  },
  {
    id: "cand_002",
    fullName: "Rahul Verma",
    email: "rahul@example.com",
    country: "India",
    city: "Bangalore",
    primaryRole: "Backend Developer",
    experienceLevel: "Senior",
    jobTypes: ["Full-time", "Remote"],
    locationPreference: "Hybrid",
    experienceYears: 6,
    skills: [
      { name: "Node.js", level: "Advanced" },
      { name: "Express", level: "Advanced" },
      { name: "PostgreSQL", level: "Advanced" },
      { name: "Docker", level: "Intermediate" },
    ],
    workExperiences: [
      {
        position: "Senior Backend Engineer",
        company: "FinTech Corp",
        startYear: 2021,
        endYear: null,
      },
      {
        position: "Backend Engineer",
        company: "StartUp Labs",
        startYear: 2018,
        endYear: 2021,
      },
    ],
    education: [
      {
        degree: "B.Tech",
        field: "Computer Science",
        institution: "Tech University",
        graduationYear: 2017,
      },
    ],
    links: {
      linkedin: "https://linkedin.com/in/rahul",
      github: "https://github.com/rahul",
    },
  },
  {
    id: "cand_003",
    fullName: "Aarav Thapa",
    email: "aarav@example.com",
    country: "Nepal",
    city: "Pokhara",
    primaryRole: "UI/UX Designer",
    experienceLevel: "Junior",
    jobTypes: ["Full-time", "Internship"],
    locationPreference: "Onsite",
    experienceYears: 1,
    skills: [
      { name: "Figma", level: "Advanced" },
      { name: "Wireframing", level: "Intermediate" },
      { name: "Prototyping", level: "Intermediate" },
    ],
    workExperiences: [
      {
        position: "UI/UX Intern",
        company: "Design Studio",
        startYear: 2024,
        endYear: null,
      },
    ],
    education: [
      {
        degree: "BBA",
        field: "Business & Marketing",
        institution: "Pokhara College",
        graduationYear: 2023,
      },
    ],
    links: {
      linkedin: "https://linkedin.com/in/aarav",
      portfolio: "https://dribbble.com/aarav",
    },
  },
];