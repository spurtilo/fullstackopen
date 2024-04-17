import PropTypes from "prop-types";

const Heading = ({ text, headingType }) => {
  const HeadingTag = headingType;

  return <HeadingTag>{text}</HeadingTag>;
};

Heading.propTypes = {
  text: PropTypes.string.isRequired,
  headingType: PropTypes.string,
};

Heading.defaultProps = {
  headingType: "h1",
};

export default Heading;
