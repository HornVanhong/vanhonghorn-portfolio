import {
  FaCode,
  FaExternalLinkAlt,
  FaFilePdf,
  FaLaptopCode,
  FaLinux,
  FaMobileAlt,
  FaNetworkWired,
  FaPython,
  FaReact,
} from "react-icons/fa";
import { useScrollReveal } from "../hooks/useScrollReveal";

const pdf1 = "/Project/TCI-2510-CAMBODIA-II.s6.xe101.pdf";
const pdf2 = "/Project/TCI-2510-CAMBODIA-II.s6.xe103.pdf";
const pdf3 = "/Project/TCI-2510-CAMBODIA-II.s6.xe105.pdf";

const projectCards = [
  {
    icon: <FaMobileAlt aria-hidden="true" />,
    title: "Flutter 3 Course Projects",
    meta: "Instinct Institute Alumni — Dec 2022 to May 2023",
    summary: "Hands-on app work focused on UI cloning, local storage, and API usage.",
    tags: ["Flutter", "Mobile UI", "Local Storage", "REST APIs"],
    points: [
      "Read and write data in localhost",
      "Consume and display data from APIs",
      "Clone UI of Cellcard App",
    ],
  },
  {
    icon: <FaReact aria-hidden="true" />,
    title: "Digital Banking Front-End Features",
    meta: "Internship — Dec 2023 to Dec 2024",
    summary: "Built and improved React Native features inside a real product workflow.",
    tags: ["React Native", "TypeScript", "SASS", "styled-components"],
    points: [
      "Developed new components following UX/UI designs",
      "Fixed front-end issues and improved app stability",
      "Collaborated via Git, Bitbucket, and Jira",
      "Applied TypeScript and component styling systems",
    ],
  },
  {
    icon: <FaNetworkWired aria-hidden="true" />,
    title: "Cisco Networking Academy Labs",
    meta: "Coursework",
    summary: "Network configuration practice with troubleshooting and service setup.",
    tags: ["Cisco", "Networking", "Protocols"],
    points: [
      "Hands-on practice with network configuration",
      "Troubleshooting and protocol analysis",
      "Service configuration exercises",
    ],
  },
  {
    icon: <FaCode aria-hidden="true" />,
    title: "Cyberium Arena - Net Crafts",
    meta: "Networking & Security Simulation",
    summary: "Mapped a simulated network and analyzed routing, ownership, and traffic.",
    tags: ["Shodan", "WHOIS", "ARP", "DNS", "DHCP"],
    points: [
      "Mapped the network: IP, MAC, router IPs, DNS and DHCP",
      "Identified ISP and connection type",
      "Used Shodan and WHOIS to analyze IP ownership",
      "Sniffed traffic and identified protocols",
    ],
  },
  {
    icon: <FaLinux aria-hidden="true" />,
    title: "Cyberium Arena - Linux Fundamentals",
    meta: "System Info Extractor",
    summary: "Command-line analysis for system information, processes, and storage.",
    tags: ["Linux", "Bash", "System Info", "Monitoring"],
    points: [
      "Identified public and private IP addresses",
      "Displayed masked MAC address for security",
      "Monitored CPU processes and memory usage",
      "Listed active system services and large files",
    ],
  },
  {
    icon: <FaPython aria-hidden="true" />,
    title: "Cyberium Arena - Python Fundamentals",
    meta: "Auth.log Analyzer",
    summary: "Parsed auth logs to extract account activity and command history.",
    tags: ["Python", "Linux", "Log Analysis", "Security"],
    points: [
      "Parsed /var/log/auth.log to extract command usage",
      "Detected new and deleted users",
      "Tracked password change activity",
      "Generated alerts for failed sudo attempts",
    ],
  },
];

const pdfFiles = [
  {
    href: pdf1,
    title: "TCI-2510-CAMBODIA-II.s6.xe101.pdf",
    description: "PDF deliverable for the first project document.",
  },
  {
    href: pdf2,
    title: "TCI-2510-CAMBODIA-II.s6.xe103.pdf",
    description: "PDF deliverable for the second project document.",
  },
  {
    href: pdf3,
    title: "TCI-2510-CAMBODIA-II.s6.xe105.pdf",
    description: "PDF deliverable for the third project document.",
  },
];

export default function Projects() {
  const [revealRef, revealClass] = useScrollReveal();

  return (
    <section id="projects" ref={revealRef} className={`projects-page anim-fade ${revealClass}`}>
      <div className="projects-header anim-slide">
        <span className="projects-kicker">
          <FaLaptopCode aria-hidden="true" />
          Selected Work
        </span>
        <h1 className="projects-title">Projects</h1>
        <p className="projects-intro">
          A mix of academic work, internship delivery, networking labs, and
          security-focused exercises.
        </p>
      </div>

      <div className="projects-overview anim-slide" aria-label="Projects summary" style={{ animationDelay: "0.1s" }}>
        <div>
          <strong>6</strong>
          <span>Featured Projects</span>
        </div>
        <div>
          <strong>3</strong>
          <span>PDF Deliverables</span>
        </div>
        <div>
          <strong>Work</strong>
          <span>Internship & Coursework</span>
        </div>
      </div>

      <div className="projects-grid anim-slide" style={{ animationDelay: "0.2s" }}>
        {projectCards.map((project) => (
          <article className="project-card" key={project.title}>
            <div className="project-card-top">
              <span className="project-icon">{project.icon}</span>
              <span className="project-badge">Project</span>
            </div>
            <h2>{project.title}</h2>
            <p className="project-meta">{project.meta}</p>
            <p className="project-summary">{project.summary}</p>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <ul>
              {project.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="projects-footer anim-slide" style={{ animationDelay: "0.3s" }}>
        <div className="projects-footer-copy">
          <span className="projects-footer-label">Documents</span>
          <h2>Project Files</h2>
          <p>
            Reference PDFs for supporting coursework and project documentation.
          </p>
        </div>

        <div className="pdf-grid">
          {pdfFiles.map((file) => (
            <article className="modern-pdf-card" key={file.href}>
              <div className="pdf-card-top">
                <span className="pdf-file-icon">
                  <FaFilePdf aria-hidden="true" />
                </span>
                <span className="pdf-card-label">PDF File</span>
              </div>
              <h3>{file.title}</h3>
              <p className="project-summary">{file.description}</p>
              <div className="pdf-actions">
                <a
                  href={file.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pdf-link"
                >
                  <FaExternalLinkAlt aria-hidden="true" />
                  Open
                </a>
                <a href={file.href} download className="pdf-download-btn">
                  Download
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
