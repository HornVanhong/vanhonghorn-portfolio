export default function Blog() {
  return (
    <section className="blog-page">
      <h1 className="blog-title">Blog</h1>
      <p className="blog-intro">
        Sharing my latest posts, tutorials, and thoughts on technology,
        security, and development.
      </p>

      <div className="blog-grid">
        {/* Post 1 */}
        <article className="blog-card">
          <h2>🔐 Understanding ARP, DNS, and DHCP</h2>
          <p className="blog-meta">Cyberium Arena — Net Crafts</p>
          <p>
            A deep dive into how ARP maps IP to MAC, DNS resolves domains, and
            DHCP assigns IPs.
          </p>
        </article>
        {/* Post 2 */}
        <article className="blog-card">
          <h2>🐧 Linux Fundamentals: System Info Extractor</h2>
          <p className="blog-meta">Cyberium Arena — Linux Projects</p>
          <p>
            Exploring Bash scripts to extract public/private IPs, CPU usage,
            memory stats, and active services.
          </p>
        </article>
        {/* Post 3 */}
        <article className="blog-card">
          <h2>📱 Building Mobile Apps with Flutter & React Native</h2>
          <p className="blog-meta">Internship & Coursework</p>
          <p>
            Lessons learned from cloning UI, integrating APIs, and developing
            banking app features.
          </p>
        </article>
        {/* Post 4 */}
        <article className="blog-card">
          <h2>🌐 Networking Labs with Cisco Academy</h2>
          <p className="blog-meta">Coursework</p>
          <p>
            Hands-on practice with network configuration, troubleshooting, and
            protocol analysis.
          </p>
        </article>
      </div>
    </section>
  );
}
