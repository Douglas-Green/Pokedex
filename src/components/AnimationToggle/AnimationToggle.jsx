/** @format */
import PropTypes from "prop-types";
import "./AnimationToggle.css";

const AnimationToggle = ({isAnimationOn, setIsAnimationOn}) => {
  const toggleAnimation = () => {
    console.log("Button clicked");
    setIsAnimationOn(!isAnimationOn);
  };

  return (
    <button
      className={`toggle-animation ${isAnimationOn ? "animate" : "paused"}`}
      onClick={toggleAnimation}
    >
      {isAnimationOn ? "Stop Animation" : "Start Animation"}
    </button>
  );
};

AnimationToggle.propTypes = {
  isAnimationOn: PropTypes.bool.isRequired,
  setIsAnimationOn: PropTypes.func.isRequired,
};

export default AnimationToggle;
