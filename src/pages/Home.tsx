import profileImg from "../assets/vanhong.jpg";
export default function Home() {
  return (
    <section className="hero">
      <div className="hero-left">
        <p className="hero-intro">Hello, It's Me</p>
        <h1 className="hero-title">VanhongHorn</h1>
        <h2 className="hero-role">
          And I'm a <span className="accent-text">Cyber</span> Security Student
        </h2>
        <p className="hero-desc">
          I'm studying Cyber Security — focused on network security, ethical
          hacking, and securing web applications while learning practical
          defensive techniques and tools.
        </p>

        <div className="hero-ctas">
          <button className="btn cta">More About Me</button>
        </div>

        <div className="social-icons">
          <span className="social">●</span>
          <span className="social">●</span>
          <span className="social">●</span>
          <span className="social">●</span>
        </div>
      </div>

      <div className="hero-right">
        <div className="profile-ring">
          <img src={profileImg} alt="Profile" className="profile-photo" />
          <div className="ring-gradient" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
