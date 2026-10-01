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
  kotlin,
  jetpackcompose,
  postgresql,
  gitlab,
  angular,
  flutter,
  springboot,
  sbi,
  veo,
  arsela,
  imset,
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
  { name: "tech.kotlin", icon: kotlin },
  { name: "tech.react", icon: reactjs },
  { name: "tech.angular", icon: angular },
  { name: "tech.flutter", icon: flutter },
  { name: "tech.compose", icon: jetpackcompose },
  { name: "tech.springboot", icon: springboot },
  { name: "tech.mongodb", icon: mongodb },
  { name: "tech.postgresql", icon: postgresql },
  { name: "tech.threejs", icon: threejs },
  { name: "tech.git", icon: git },
  { name: "tech.gitlab", icon: gitlab },
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
    date: "dates.arsela",
    technologies: ["tech.angular", "tech.react", "tech.java", "tech.springboot", "tech.postgresql", "tech.mongodb", "tech.docker", "tech.gitlab"],
    points: [
      "exp.arsela.points.0",
      "exp.arsela.points.1",
      "exp.arsela.points.2",
    ],
  },
  {
    title: "exp.imset.title",
    company_name: "IMSET",
    icon: imset,
    iconBg: "#151030",
    date: "dates.imset",
    technologies: ["tech.java", "tech.android"],
    points: ["exp.imset.points.0", "exp.imset.points.1", "exp.imset.points.2", "exp.imset.points.3"],
  },
  {
    title: "exp.qcmed.title",
    company_name: "QCmed",
    icon: qcmed,
    iconBg: "#E6DEDD",
    date: "dates.qcmed",
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
    date: "dates.sbi",
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
    date: "dates.veo",
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
    source_code_link: "https://github.com/Dhiakacem/Dk-3d-portfolio",
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
    date: "dates.ims",
    location: "edu.ims.location",
  },
  {
    school: "edu.issat.school",
    degree: "edu.issat.degree",
    date: "dates.issat",
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
  title: "Full-Stack Software Engineer | Angular & Spring Boot",
  location: "Tunis, Tunisia",
  phone: "+216 95 603 918",
  email: "dhiaa.kacem@gmail.com",
  github: "https://github.com/Dhiakacem",
  linkedin: "https://linkedin.com/in/dhia-kacem",
  summary: "Full-Stack Software Engineer with over two years of experience building business applications with Java, Spring Boot, Angular, and React. Experienced in REST APIs, access management, PostgreSQL, MongoDB, Docker, and GitLab CI/CD.",
};

const languages = [
  { name: "English", level: "Professional working proficiency", flag: "🇬🇧" },
  { name: "French", level: "Native", flag: "🇫🇷" },
  { name: "Arabic", level: "Native", flag: "🇸🇦" },
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
