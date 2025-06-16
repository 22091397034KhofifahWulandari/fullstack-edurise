import PropTypes from "prop-types";

const Button = ({
  children,
  onClick,
  className = "",
  disabled = false,
  type = "button",
  ...props
}) => {
  const baseClasses =
    "font-poppins transition-colors duration-200 focus:outline-none";
  const buttonClasses = `${baseClasses} ${className} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

export default Button;
