import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  mongodb,
  git,
  figma,
  docker,
  threejs,
  angular,
  flutter,
  springboot,
  sbi,
  veo,
  arsela,
  qcmed,
  hgh,
  archivefy,
  mobiles,
  java,
  QcmedProjects,
  noz,
  portfolio,
} from "../assets";

const navLinks = [
  { id: "about", title: "nav.about" },
  { id: "experience", title: "nav.experience" },
  { id: "projects", title: "nav.projects" },
  { id: "contact", title: "nav.contact" },
];

// services: use translation keys for titles
const services = [
  { title: "service.fullstack", icon: backend },
  { title: "service.frontend", icon: web },
  { title: "service.mobile", icon: mobile },
  { title: "service.backend", icon: creator },
];

// technologies: use keys for names (icons stay)
const technologies = [
  { name: "tech.html", icon: html },
  { name: "tech.css", icon: css },
  { name: "tech.javascript", icon: javascript },
  { name: "tech.typescript", icon: typescript },
  { name: "tech.java", icon: java },
  { name: "tech.react", icon: reactjs },
  { name: "tech.angular", icon: angular },
  { name: "tech.flutter", icon: flutter },
  { name: "tech.springboot", icon: springboot },
  { name: "tech.mongodb", icon: mongodb },
  { name: "tech.threejs", icon: threejs },
  { name: "tech.git", icon: git },
  { name: "tech.figma", icon: figma },
  { name: "tech.docker", icon: docker },
];

// experiences: replace title and points & technologies entries with translation keys
const experiences = [
  {
    title: "exp.arsela.title",
    company_name: "Arsela Technologies",
    icon: arsela,
    iconBg: "#f7f7f7ff",
    date: "January 2025 - Present",
    technologies: ["tech.angular", "tech.springboot", "tech.docker", "tech.git", "tech.ngzorro", "tech.echarts", "tech.microservices"],
    points: [
      "exp.arsela.points.0",
      "exp.arsela.points.1",
      "exp.arsela.points.2",
      "exp.arsela.points.3",
      "exp.arsela.points.4",
    ],
  },
  {
    title: "exp.qcmed.title",
    company_name: "QCmed",
    icon: qcmed,
    iconBg: "#E6DEDD",
    date: "June 2024 - March 2025",
    technologies: ["tech.angular", "tech.nestjs", "tech.flutter", "tech.dart", "tech.mongodb"],
    points: [
      "exp.qcmed.points.0",
      "exp.qcmed.points.1",
      "exp.qcmed.points.2",
      "exp.qcmed.points.3",
      "exp.qcmed.points.4",
    ],
  },
  {
    title: "exp.sbi.title",
    company_name: "Sierra Bravo Intelligence",
    icon: sbi,
    iconBg: "#E6DEDD",
    date: "January 2024 - June 2024",
    technologies: ["tech.angular", "tech.springboot", "tech.ngzorro", "tech.echarts", "tech.docker", "tech.gitlab"],
    points: [
      "exp.sbi.points.0",
      "exp.sbi.points.1",
      "exp.sbi.points.2",
      "exp.sbi.points.3",
      "exp.sbi.points.4",
    ],
  },
  {
    title: "exp.veo.title",
    company_name: "Veo Worldwide Service",
    icon: veo,
    iconBg: "#E6DEDD",
    date: "June 2023 - August 2023",
    technologies: ["tech.react", "tech.javascript", "tech.symfony", "tech.restapi", "tech.gitlab"],
    points: [
      "exp.veo.points.0",
      "exp.veo.points.1",
      "exp.veo.points.2",
      "exp.veo.points.3",
    ],
  },
];

// projects: use keys for name/title/description/category/features/tags
const projects = [
  {
    name: "project.abronubes_web.name",
    title: "project.abronubes_web.title",
    description: "project.abronubes_web.description",
    image: hgh,
    technologies: ["tech.angular", "tech.springboot", "tech.docker", "tech.kubernetes", "tech.ngzorro", "tech.echarts"],
    category: "project.category.arsela",
    features: ["project.abronubes_web.features.0", "project.abronubes_web.features.1"],
    tags: [
      { name: "tag.angular", color: "blue-text-gradient" },
      { name: "tag.springboot", color: "green-text-gradient" },
      { name: "tag.docker", color: "pink-text-gradient" },
    ],
    source_code_link: "https://github.com/Dhiakacem",
    showGithub: false,
  },
  {
    name: "project.abronubes_mobile.name",
    title: "project.abronubes_mobile.title",
    description: "project.abronubes_mobile.description",
    image: mobiles,
    technologies: ["tech.flutter", "tech.dart", "tech.restapi", "tech.websocket"],
    category: "project.category.mobile",
    features: ["project.abronubes_mobile.features.0", "project.abronubes_mobile.features.1", "project.abronubes_mobile.features.2"],
    tags: [
      { name: "tag.flutter", color: "blue-text-gradient" },
      { name: "tag.dart", color: "green-text-gradient" },
    ],
    source_code_link: "https://github.com/Dhiakacem",
    showGithub: false,
  },
  {
    name: "project.archivefy.name",
    title: "project.archivefy.title",
    description: "project.archivefy.description",
    image: archivefy,
    technologies: ["tech.angular", "tech.springboot", "tech.mongodb", "tech.microservices"],
    category: "project.category.web",
    features: ["project.archivefy.features.0", "project.archivefy.features.1", "project.archivefy.features.2"],
    tags: [
      { name: "tag.angular", color: "blue-text-gradient" },
      { name: "tag.springboot", color: "green-text-gradient" },
      { name: "tag.mongodb", color: "pink-text-gradient" },
    ],
    source_code_link: "https://github.com/Dhiakacem",
    showGithub: false,
  },
  {
    name: "project.qcmed_quiz.name",
    title: "project.qcmed_quiz.title",
    description: "project.qcmed_quiz.description",
    image: QcmedProjects, // Make sure to import this image
    technologies: ["tech.flutter", "tech.dart", "tech.nestjs", "tech.mongodb"],
    category: "project.category.mobile",
    features: ["project.qcmed_quiz.features.0", "project.qcmed_quiz.features.1", "project.qcmed_quiz.features.2"],
    tags: [
      { name: "tag.flutter", color: "blue-text-gradient" },
      { name: "tag.dart", color: "green-text-gradient" },
      { name: "tag.nestjs", color: "pink-text-gradient" },
    ],
    source_code_link: "https://github.com/Dhiakacem",
  },
  {
    name: "project.portfolio_site.name",
    title: "project.portfolio_site.title",
    description: "project.portfolio_site.description",
    image: portfolio,
    technologies: ["tech.react", "tech.tailwind", "tech.threejs"],
    category: "project.category.web",
    features: [
      "project.portfolio_site.features.0",
      "project.portfolio_site.features.1",
      "project.portfolio_site.features.2",
    ],
    tags: [
      { name: "tag.react", color: "blue-text-gradient" },
      { name: "tag.tailwind", color: "green-text-gradient" },
      { name: "tag.threejs", color: "pink-text-gradient" },
    ],
    source_code_link: "https://github.com/Dhiakacem/3d-developer-portfolio",
  },
  {
    name: "project.veo_carpool.name",
    title: "project.veo_carpool.title",
    description: "project.veo_carpool.description",
    image: noz, // Make sure to import this image
    technologies: ["tech.react", "tech.javascript", "tech.symfony", "tech.restapi"],
    category: "project.category.web",
    features: ["project.veo_carpool.features.0", "project.veo_carpool.features.1", "project.veo_carpool.features.2"],
    tags: [
      { name: "tag.react", color: "blue-text-gradient" },
      { name: "tag.javascript", color: "green-text-gradient" },
      { name: "tag.symfony", color: "pink-text-gradient" },
    ],
    source_code_link: "https://github.com/Dhiakacem",
  },
  
];

// replace certifications and education to use translation keys
const education = [
  {
    school: "edu.ims.school",
    degree: "edu.ims.degree",
    date: "September 2021 - June 2024",
    location: "edu.ims.location",
  },
  {
    school: "edu.issat.school",
    degree: "edu.issat.degree",
    date: "September 2018 - June 2021",
    location: "edu.issat.location",
  },
];

const certifications = [
  { name: "cert.jetbrains", issued: "2024", icon: "🏆" },
  { name: "cert.flutter_dart", issued: "2024", icon: "📱" },
];

const skills = {
  languages: ["Java", "TypeScript", "JavaScript", "Python", "SQL"],
  frontend: ["Angular", "React", "Flutter", "Tailwind CSS", "Responsive Design"],
  backend: ["Spring Boot", "NestJS", "REST API", "Microservices", "GraphQL"],
  databases: ["MongoDB", "MySQL", "SQLServer", "PostgreSQL"],
  devops: ["Docker", "Kubernetes", "GitLab CI/CD", "Git", "Jira"],
};

const profile = {
  name: "Dhia Kacem",
  title: "Full-Stack Developer | Angular & Spring Boot",
  location: "Sousse, Tunisia",
  phone: "+216 58 099 900",
  email: "dhiaa.kacem@gmail.com",
  github: "https://github.com/Dhiakacem",
  linkedin: "https://linkedin.com/in/dhia-kacem",
  summary: "Full-Stack Developer specialized in Angular and Spring Boot with 2+ years of experience. Expertise in microservices, real-time dashboards, CI/CD pipelines, and Flutter mobile development.",
};

const languages = [
  { name: "English", level: "Fluent", flag: "🇬🇧" },
  { name: "French", level: "Native", flag: "🇫🇷" },
  { name: "Arabic", level: "Fluent", flag: "🇸🇦" },
];

// add CV download links (place PDF files in public/cv/)
const cv = {
  en: "/cv/CV_DhiaKacem_EN.pdf",
  fr: "/cv/CV_DhiaKacem_FR.pdf",
};

export {
  navLinks,
  services,
  technologies,
  experiences,
  projects,
  education,
  certifications,
  skills,
  profile,
  languages,
  cv,
};
