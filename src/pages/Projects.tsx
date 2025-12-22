import {
  FaCode,
  FaLinux,
  FaMobileAlt,
  FaNetworkWired,
  FaReact,
} from "react-icons/fa";
import pdf1 from "../Project/TCI-2510-CAMBODIA-II.s6.xe101.pdf";
import pdf2 from "../Project/TCI-2510-CAMBODIA-II.s6.xe103.pdf";

export default function Projects() {
  return (
    <section className="projects-page">
      <h1 className="projects-title">Projects</h1>
      <div className="projects-grid">
        {/* Flutter Course */}
        <div className="project-card">
          <FaMobileAlt size={28} color="#00d1ff" style={{ marginBottom: 4 }} />
          <h2>Flutter 3 Course Projects</h2>
          <p className="project-meta">
            Instinct Institute Alumni — Dec 2022 – May 2023
          </p>
          <ul>
            <li>Read and Write Data in Localhost</li>
            <li>Consume and display data from APIs</li>
            <li>Clone UI of Cellcard App</li>
          </ul>
        </div>
        {/* Internship */}
        <div className="project-card">
          <FaReact size={28} color="#7c5cff" style={{ marginBottom: 4 }} />
          <h2>Digital Banking Front-End Features</h2>
          <p className="project-meta">Internship — Dec 2023 – Dec 2024</p>
          <ul>
            <li>
              Developed new components with React Native following UX/UI designs
            </li>
            <li>Fixed front-end issues and improved app stability</li>
            <li>Collaborated via Git, Bitbucket, and Jira</li>
            <li>Applied TypeScript, SASS, and styled-components</li>
          </ul>
        </div>
        {/* Cisco Networking */}
        <div className="project-card">
          <FaNetworkWired
            size={28}
            color="#00d1ff"
            style={{ marginBottom: 4 }}
          />
          <h2>Cisco Networking Academy Labs</h2>
          <p className="project-meta">Coursework</p>
          <ul>
            <li>Hands-on practice with network configuration</li>
            <li>Troubleshooting and protocol analysis</li>
            <li>Service configuration exercises</li>
          </ul>
        </div>
        {/* Cyberium Arena — Net Crafts */}
        <div className="project-card">
          <FaCode size={28} color="#7c5cff" style={{ marginBottom: 4 }} />
          <h2>Cyberium Arena — Net Crafts</h2>
          <p className="project-meta">Networking & Security Simulation</p>
          <ul>
            <li>
              Mapped the network (IP, MAC, Router internal/external IPs,
              DNS/DHCP)
            </li>
            <li>Identified ISP and connection type (Ethernet/Wireless)</li>
            <li>Used Shodan & WHOIS to analyze public IP ownership</li>
            <li>Sniffed traffic and identified protocols (ARP, DNS, DHCP)</li>
            <li>Explained protocol usage and port numbers</li>
            <li>Designed a network diagram with devices and IPs</li>
          </ul>
        </div>
        {/* Cyberium Arena — Linux Fundamentals */}
        <div className="project-card">
          <FaLinux size={28} color="#00d1ff" style={{ marginBottom: 4 }} />
          <h2>Cyberium Arena — Linux Fundamentals</h2>
          <p className="project-meta">System Info Extractor</p>
          <ul>
            <li>Identified public and private IP addresses</li>
            <li>Displayed masked MAC address for security</li>
            <li>Monitored top 5 CPU processes</li>
            <li>Displayed memory usage statistics (total, used, available)</li>
            <li>Listed active system services with status</li>
            <li>Located top 10 largest files in /home</li>
          </ul>
        </div>
      </div>
      {/* PDF Project Files */}
      <div className="projects-grid">
        <div className="project-card pdf-card">
          <a
            href={pdf1}
            target="_blank"
            rel="noopener noreferrer"
            className="pdf-link"
          >
            <span role="img" aria-label="PDF" className="pdf-icon">
              📄
            </span>
            <span className="pdf-filename">
              TCI-2510-CAMBODIA-II.s6.xe101.pdf
            </span>
          </a>
          <a href={pdf1} download className="pdf-download-btn">
            Download
          </a>
        </div>
        <div className="project-card pdf-card">
          <a
            href={pdf2}
            target="_blank"
            rel="noopener noreferrer"
            className="pdf-link"
          >
            <span role="img" aria-label="PDF" className="pdf-icon">
              📄
            </span>
            <span className="pdf-filename">
              TCI-2510-CAMBODIA-II.s6.xe103.pdf
            </span>
          </a>
          <a href={pdf2} download className="pdf-download-btn">
            Download
          </a>
        </div>
      </div>
    </section>
  );
}
