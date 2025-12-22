export default function Projects() {
  return (
    <section className="projects-page">
      <h1 className="projects-title">Projects</h1>

      <div className="timeline">
        {/* Flutter Course */}
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
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
        </div>
        {/* Internship */}
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h2>Digital Banking Front-End Features</h2>
            <p className="project-meta">Internship — Dec 2023 – Dec 2024</p>
            <ul>
              <li>
                Developed new components with React Native following UX/UI
                designs
              </li>
              <li>Fixed front-end issues and improved app stability</li>
              <li>Collaborated via Git, Bitbucket, and Jira</li>
              <li>Applied TypeScript, SASS, and styled-components</li>
            </ul>
          </div>
        </div>
        {/* Cisco Networking */}
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h2>Cisco Networking Academy Labs</h2>
            <p className="project-meta">Coursework</p>
            <ul>
              <li>Hands-on practice with network configuration</li>
              <li>Troubleshooting and protocol analysis</li>
              <li>Service configuration exercises</li>
            </ul>
          </div>
        </div>
        {/* Cyberium Arena — Net Crafts */}
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
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
        </div>
        {/* Cyberium Arena — Linux Fundamentals */}
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h2>Cyberium Arena — Linux Fundamentals</h2>
            <p className="project-meta">System Info Extractor</p>
            <ul>
              <li>Identified public and private IP addresses</li>
              <li>Displayed masked MAC address for security</li>
              <li>Monitored top 5 CPU processes</li>
              <li>
                Displayed memory usage statistics (total, used, available)
              </li>
              <li>Listed active system services with status</li>
              <li>Located top 10 largest files in /home</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
