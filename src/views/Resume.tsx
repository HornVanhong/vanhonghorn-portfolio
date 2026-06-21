import Experience from "./Experience";
import Education from "./Education";
import Certificates from "./Certificates";

export default function Resume() {
  return (
    <div id="resume" className="resume-view">
      <Experience />
      <Education />
      <Certificates />
    </div>
  );
}
