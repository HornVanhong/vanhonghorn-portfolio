import Image from "next/image";
import { FaClock, FaBookOpen, FaNetworkWired, FaLinux, FaMobileAlt, FaShieldAlt } from "react-icons/fa";
import { useScrollReveal } from "../hooks/useScrollReveal";

const posts = [
  {
    title: "Understanding ARP, DNS, and DHCP",
    meta: "Cyberium Arena - Net Crafts",
    summary:
      "A practical breakdown of how core networking protocols map addresses, resolve domains, and assign IPs.",
    readingTime: "5 min read",
    topic: "Networking",
    icon: <FaNetworkWired aria-hidden="true" />,
    image: "/blog/photo_2026-08-13_23-47-12.jpg",
    imageAlt: "Networking and protocols architecture",
  },
  {
    title: "Linux Fundamentals: System Info Extractor",
    meta: "Cyberium Arena - Linux Projects",
    summary:
      "Bash scripting techniques for extracting IP data, CPU usage, memory stats, and active services.",
    readingTime: "4 min read",
    topic: "Linux",
    icon: <FaLinux aria-hidden="true" />,
    image: "/blog/photo_2026-08-13_23-47-10.jpg",
    imageAlt: "Linux system administration setup",
  },
  {
    title: "Building Mobile Apps with Flutter and React Native",
    meta: "Internship & Coursework",
    summary:
      "Lessons from cloning UI flows, integrating APIs, and building front-end features for banking apps.",
    readingTime: "6 min read",
    topic: "Mobile",
    icon: <FaMobileAlt aria-hidden="true" />,
    image: "/blog/photo_2026-08-13_23-47-13.jpg",
    imageAlt: "Mobile app development with Flutter",
  },
  {
    title: "Networking Labs with Cisco Academy",
    meta: "Coursework",
    summary:
      "Hands-on practice with network configuration, troubleshooting, and protocol analysis in lab environments.",
    readingTime: "3 min read",
    topic: "Labs",
    icon: <FaBookOpen aria-hidden="true" />,
    image: "/blog/photo_2026-08-13_23-47-14.jpg",
    imageAlt: "Cisco Networking Academy lab",
  },
  {
    title: "Defensive Security & Threat Monitoring",
    meta: "Cyber Security",
    summary:
      "Essential defensive security strategies, vulnerability assessments, and system log audits.",
    readingTime: "5 min read",
    topic: "Security",
    icon: <FaShieldAlt aria-hidden="true" />,
    image: "/blog/photo_2026-08-13_23-47-15.jpg",
    imageAlt: "Cyber security threat monitoring",
  },
];

export default function Blog() {
  const featured = posts[0];
  const secondary = posts.slice(1);
  const [revealRef, revealClass] = useScrollReveal();

  return (
    <section id="blog" ref={revealRef} className={`blog-page anim-fade ${revealClass}`}>
      <div className="blog-header anim-slide">
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

      <div className="blog-featured anim-slide" style={{ animationDelay: "0.1s" }}>
        <article className="blog-featured-card">
          <div className="blog-featured-image-wrap">
            <Image
              src={featured.image}
              alt={featured.imageAlt}
              width={1200}
              height={600}
              className="blog-featured-image"
              priority
            />
          </div>

          <div className="blog-featured-content">
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
          </div>
        </article>
      </div>

      <div className="blog-grid anim-slide" style={{ animationDelay: "0.2s" }}>
        {secondary.map((post) => (
          <article className="blog-card modern-blog-card" key={post.title}>
            <div className="blog-card-image-wrap">
              <Image
                src={post.image}
                alt={post.imageAlt}
                width={600}
                height={340}
                className="blog-card-image"
              />
            </div>

            <div className="blog-card-content">
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
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
