import { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

function IntroAnimation({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          onFinish();
          return 100;
        }
        return prevProgress + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="intro-animation d-flex align-items-center justify-content-center flex-column mt-custom ms-2 mt-5">
      <img
        className="popup-animation w-custom"
        src="/public/WeatherAppLogo2.png"
        alt="logo"
      />
      <ProgressBar
        className="mt-1 popup-animation"
        animated
        now={progress}
        variant="dark"
        style={{ width: "200px", height: "6px" }}
      />
    </div>
  );
}

export default IntroAnimation;
