// All site content lives here. Edit this file to update the portfolio;
// the components only handle layout.

export const profile = {
  name: "Shougata Das",
  handle: "shougata",
  host: "darwin",
  role: "AI/ML Engineer",
  tagline: "Master of IT (AI) student at Charles Darwin University. I build machine learning systems end to end.",
  location: "Darwin, NT, Australia",
  email: "shougatad@gmail.com",
  github: "https://github.com/ShougataDas",
  linkedin: "https://www.linkedin.com/in/shougata-das-b858221b0/",
  // Paste the link to your new CV here. The CV buttons stay hidden while this is empty.
  cvUrl: "",
  siteUrl: "https://portfolio-shougata-das-1xqf.vercel.app",
  openTo: "Internships, graduate roles and research work in ML / AI engineering",
}

export const about = [
  "I'm studying a Master of Information Technology, specialising in Artificial Intelligence, at Charles Darwin University in Darwin. Before that I completed a BSc in Computer Science and Engineering at East Delta University in Chattogram, Bangladesh, and spent over a year teaching C++, Python and problem solving to more than 200 students at Programming Hero.",
  "I like building the whole thing: the data pipeline, the model, the API and the screen someone actually uses. Most of my recent work is for Northern Territory communities, such as a repair-triage tool that makes sure a tenant in a remote community waits no longer than a tenant in Darwin for the same fault.",
  "Competitive programming taught me to think carefully before I write code. I'm a Codeforces Specialist, competed at the ICPC Asia Dhaka Regional, and have solved more than 1,400 problems.",
]

export const skills: { group: string; items: string[] }[] = [
  { group: "languages", items: ["Python", "C++", "C", "TypeScript", "SQL", "Java (basic)"] },
  { group: "ml", items: ["PyTorch", "TensorFlow", "scikit-learn", "LightGBM", "OpenCV", "Pandas", "GeoPandas"] },
  {
    group: "ai",
    items: ["Deep learning", "Reinforcement learning", "Computer vision", "LLM apps (Gemini API)", "Fairness & explainability"],
  },
  { group: "web", items: ["FastAPI", "Next.js", "React", "React Native", "Django", "REST APIs", "MongoDB", "MySQL"] },
  { group: "tools", items: ["Git", "Linux", "Jupyter", "Streamlit", "QGIS", "Vercel", "Hugging Face"] },
]

export type ProjectStatus = "live" | "in-progress" | "research" | "course"

export type Project = {
  slug: string
  title: string
  status: ProjectStatus
  context?: string
  summary: string
  highlights: string[]
  stack: string[]
  links: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    slug: "fairtriage-nt",
    title: "FairTriage NT",
    status: "live",
    context: "CDU IT Code Fair · Trusted AI challenge",
    summary:
      "Fair, explainable triage of housing repairs for Northern Territory communities. Tenants describe a fault in their own words; the system works out what's wrong, how urgent it is and when someone can come, then explains why.",
    highlights: [
      "Reads plain, hurried or second-language English with the Gemini API and asks at most one clarifying question",
      "Fairness check: the same repair gets the same queue position in a remote community as in Darwin",
      "Plans remote trips, town runs and make-safe call-outs for crews, each with a map and cost estimate",
      "A person approves every decision; 623 automated tests",
    ],
    stack: ["Python", "FastAPI", "Gemini API", "Next.js", "MongoDB"],
    links: [
      { label: "live", href: "https://fairtriage-nt-web-one.vercel.app/" },
      { label: "code", href: "https://github.com/ShougataDas/Fairtriage-NT" },
    ],
  },
  {
    slug: "sharko",
    title: "Sharko Australia",
    status: "live",
    summary:
      "Predicts where sharks are likely to be around Australia for any place and any date, from satellite ocean data and 29,000+ real shark sightings.",
    highlights: [
      "Per-species likelihood for tiger, bull and great white sharks, with ranges for far-future dates",
      "Features from Copernicus Marine (sea temperature, fronts, chlorophyll, currents) and NOAA seafloor depth",
      "FastAPI backend on Hugging Face serves GeoJSON habitat maps to a React + TypeScript frontend",
    ],
    stack: ["Python", "LightGBM", "Random Forest", "FastAPI", "React", "TypeScript"],
    links: [
      { label: "live", href: "https://sharko-omega.vercel.app/" },
      { label: "code", href: "https://github.com/ShougataDas/Sharko-Australia" },
      { label: "original", href: "https://github.com/ShougataDas/Sharko" },
    ],
  },
  {
    slug: "remoteconnect-nt",
    title: "RemoteConnect NT",
    status: "in-progress",
    context: "CDU Data Innovation Challenge",
    summary: "Mapping internet connectivity gaps across 188 remote Northern Territory locations.",
    highlights: [
      "Brings location and connectivity data together to show which communities are under-served",
    ],
    stack: ["Python", "Geospatial analysis"],
    links: [],
  },
  {
    slug: "chess-encryption",
    title: "RL Chess Encryption",
    status: "research",
    context: "Preprint on Research Square",
    summary:
      "A data-encryption scheme driven by legal chess-move generation and board-state hashing, with an agent trained by deep Q-learning.",
    highlights: [
      "Custom Gym environment for the chess-based cipher",
      "DQN agent with a CNN board encoder",
      "Streamlit front end for encrypting and decrypting messages",
    ],
    stack: ["Python", "PyTorch", "TensorFlow", "DQN", "Streamlit"],
    links: [{ label: "code", href: "https://github.com/ShougataDas/Chess-based-Data-encryption-using-CNN-RL" }],
  },
  {
    slug: "smartfinbd",
    title: "SmartFinBD",
    status: "course",
    context: "Mobile App Development · East Delta University",
    summary:
      "A cross-platform investment mentor for people in Bangladesh: financial-health checks, personalised investment plans and a bilingual AI chatbot.",
    highlights: [
      "Chatbot answers questions in Bengali and English",
      "Risk assessment from age, income and goals drives plans across bonds, mutual funds, DPS and stocks",
      "I built the React Native front end; Moklasur Rahman built the backend",
    ],
    stack: ["React Native", "TypeScript", "Redux Toolkit"],
    links: [{ label: "code", href: "https://github.com/ShougataDas/SmartfinBD" }],
  },
]

export const experience = [
  {
    hash: "a3f9c21",
    role: "Senior Computer Science Instructor",
    org: "Programming Hero",
    period: "Oct 2023 – Jan 2025",
    location: "Remote",
    points: [
      "Taught C++, Python and problem solving to 200+ students",
      "Designed course material and ran live sessions with 95% positive feedback",
      "Wrote 10+ original problems and co-authored an algorithms e-book",
    ],
  },
  {
    hash: "7be04d8",
    role: "Coordinator & Executive Board Member",
    org: "East Delta University Computer Club",
    period: "2024 – 2025",
    location: "Chattogram, Bangladesh",
    points: [
      "Organised coding workshops, contests and guest speaker sessions",
      "Set up the club's competitive programming and development wings",
      "Problem setter and judge for on-site contests run by the club",
    ],
  },
]

export const education = [
  {
    degree: "Master of Information Technology (Artificial Intelligence)",
    school: "Charles Darwin University",
    location: "Darwin, Australia",
    status: "In progress",
    note: "",
  },
  {
    degree: "BSc in Computer Science and Engineering",
    school: "East Delta University",
    location: "Chattogram, Bangladesh",
    status: "Completed",
    note: "CGPA 3.74 / 4.00 · Outstanding Student Achievement Award",
  },
  {
    degree: "Higher Secondary Certificate",
    school: "Chittagong College",
    location: "Chattogram, Bangladesh",
    status: "2020",
    note: "GPA 5.00 / 5.00",
  },
  {
    degree: "Secondary School Certificate",
    school: "Chittagong Govt High School",
    location: "Chattogram, Bangladesh",
    status: "2018",
    note: "GPA 5.00 / 5.00",
  },
]

export const codeforcesHandle = "siuuu_on_code"

export const cpProfiles = [
  {
    name: "Codeforces",
    handle: codeforcesHandle,
    url: `https://codeforces.com/profile/${codeforcesHandle}`,
    rank: "Specialist",
    // Fallback only: the live value is fetched from the Codeforces API daily
    maxRating: 1529,
  },
  { name: "CodeChef", handle: "sogu7", url: "https://www.codechef.com/users/sogu7", rank: "4★", maxRating: 1804 },
  { name: "LeetCode", handle: "sogu7", url: "https://leetcode.com/u/sogu7/", rank: "", maxRating: 1649 },
]

export const cpResults = [
  { year: "2025", text: "Meta Hacker Cup: reached Round 2" },
  { year: "2025", text: "Champion, EDU Engineering Day Intra-University Contest" },
  { year: "2025", text: "53rd, UU Inter-University Programming Contest" },
  { year: "2024", text: "ICPC Asia Dhaka Regional: 62nd of 308 teams (top 20%)" },
]

export const cpExtra = {
  solved: "1,400+",
  judges: "Codeforces, CodeChef, LeetCode, LightOJ",
  icpcUrl: "https://icpc.global/ICPCID/ESYYJTO74SVN",
  solutionsUrl: "https://github.com/ShougataDas/Codeforces-Contest",
}

export const sections = [
  { id: "about", label: "about" },
  { id: "skills", label: "skills" },
  { id: "projects", label: "projects" },
  { id: "experience", label: "experience" },
  { id: "education", label: "education" },
  { id: "cp", label: "cp" },
  { id: "contact", label: "contact" },
] as const
