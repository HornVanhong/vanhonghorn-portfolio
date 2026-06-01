import { FaClock, FaBookOpen, FaNetworkWired, FaLinux, FaMobileAlt } from "react-icons/fa";

const posts = [
  {
    title: "Understanding ARP, DNS, and DHCP",
    meta: "Cyberium Arena - Net Crafts",
    summary:
      "A practical breakdown of how core networking protocols map addresses, resolve domains, and assign IPs.",
    readingTime: "5 min read",
    topic: "Networking",
    icon: <FaNetworkWired aria-hidden="true" />,
  },
  {
    title: "Linux Fundamentals: System Info Extractor",
    meta: "Cyberium Arena - Linux Projects",
    summary:
      "Bash scripting techniques for extracting IP data, CPU usage, memory stats, and active services.",
    readingTime: "4 min read",
    topic: "Linux",
    icon: <FaLinux aria-hidden="true" />,
  },
  {
    title: "Building Mobile Apps with Flutter and React Native",
    meta: "Internship & Coursework",
    summary:
      "Lessons from cloning UI flows, integrating APIs, and building front-end features for banking apps.",
    readingTime: "6 min read",
    topic: "Mobile",
    icon: <FaMobileAlt aria-hidden="true" />,
  },
  {
    title: "Networking Labs with Cisco Academy",
    meta: "Coursework",
    summary:
      "Hands-on practice with network configuration, troubleshooting, and protocol analysis in lab environments.",
    readingTime: "3 min read",
    topic: "Labs",
    icon: <FaBookOpen aria-hidden="true" />,
  },
];

export default function Blog() {
  const featured = posts[0];
  const secondary = posts.slice(1);

  return (
    <section className="blog-page">
      <div className="blog-header">
        <span className="blog-kicker">
          <FaBookOpen aria-hidden="true" />
          Notes and Writing
        </span>
        <h1 className="blog-title">Blog</h1>
        <p className="blog-intro">
          Short technical notes, project write-ups, and lessons from security,
          networking, and development work.
        </p>
      </div>

      <div className="blog-featured">
        <article className="blog-featured-card">
          <div className="blog-featured-top">
            <span className="blog-topic-pill">{featured.topic}</span>
            <span className="blog-reading-time">
              <FaClock aria-hidden="true" />
              {featured.readingTime}
            </span>
          </div>
          <div className="blog-featured-body">
            <div className="blog-featured-icon">{featured.icon}</div>
            <div>
              <p className="blog-meta">{featured.meta}</p>
              <h2>{featured.title}</h2>
              <p>{featured.summary}</p>
            </div>
          </div>
        </article>
      </div>

      <div className="blog-grid">
        {secondary.map((post) => (
          <article className="blog-card modern-blog-card" key={post.title}>
            <div className="blog-card-top">
              <span className="blog-card-icon">{post.icon}</span>
              <span className="blog-topic-pill">{post.topic}</span>
            </div>
            <p className="blog-meta">{post.meta}</p>
            <h2>{post.title}</h2>
            <p className="blog-summary">{post.summary}</p>
            <div className="blog-card-footer">
              <span className="blog-reading-time">
                <FaClock aria-hidden="true" />
                {post.readingTime}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
