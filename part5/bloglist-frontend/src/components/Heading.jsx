const Heading = ({ text, headingType }) => {
  const HeadingTag = headingType || "h1";

  return <HeadingTag>{text}</HeadingTag>;
};

export default Heading;
