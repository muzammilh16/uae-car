import React from "react";
import PropTypes from "prop-types";

const CustomLabel = ({ label, required }) => {
  return (
    <span>
      {label}
      {required && <span style={{ color: "red" }}> *</span>}
    </span>
  );
};

CustomLabel.propTypes = {
  label: PropTypes.string.isRequired, // The label text
  required: PropTypes.bool, // Whether the field is required
};

export default CustomLabel;
