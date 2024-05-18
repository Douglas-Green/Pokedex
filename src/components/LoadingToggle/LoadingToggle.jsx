/** @format */

import PropTypes from "prop-types";
import Loader from "../Loader";
import "./LoadingToggle.css";

const LoadingToggle = ({loading, hideLoading, setHideLoading}) => {
  if (loading && !hideLoading) {
    return (
      <div className="loading-container">
        <Loader />
        <button onClick={() => setHideLoading(true)}>Hide Me!</button>
      </div>
    );
  }

  return null;
};

LoadingToggle.propTypes = {
  loading: PropTypes.bool.isRequired,
  hideLoading: PropTypes.bool.isRequired,
  setHideLoading: PropTypes.func.isRequired,
};

export default LoadingToggle;
