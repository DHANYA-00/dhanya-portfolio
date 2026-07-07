export interface Project {
  id: number;
  name: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  demoUrl: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: 1,
    name: "Food Wars",
    description:
      "A real-time multiplayer game where players guess dish ingredients within a time limit, competing live with others.",
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "Socket.IO"],
    githubUrl: "https://github.com/DHANYA-00/Food-Wars",
    demoUrl: "https://foodwars2vs2.netlify.app/",
    image: "/images/foodanimation.mp4",
  },
  {
    id: 2,
    name: "SmartNews",
    description:
      "An AI-powered news app offering real-time categorized news, AI summarization, an in-app SmartBot, and interactive quizzes for students.",
    techStack: ["Flutter", "News API", "Firebase", "GroqAPI"],
    githubUrl: "https://github.com/DHANYA-00/Smart-News.git",
    demoUrl: "#",
    image: "/images/newspaper.png",
  },
];