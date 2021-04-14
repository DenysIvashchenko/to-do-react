import PropTypes from "prop-types";
import Button from "./Button";

function Header({ title }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button color="green" text="Add" />
    </header>
  );
}
// 1.06 минута видео
Header.defaultProps = {
  title: "Tracker",
};
Header.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Header;
