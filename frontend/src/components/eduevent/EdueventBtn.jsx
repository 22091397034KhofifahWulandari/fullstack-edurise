import PropTypes from "prop-types";

const EdueventButton = ({
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-poppins font-bold rounded-lg transition-colors duration-200 focus:outline-none';
  
  const variants = {
    primary: 'bg-[#3375cc] text-white hover:bg-[#2a5ea3]',
    secondary: 'bg-[#2e69b8] text-[#fcf6ee] hover:bg-[#255091]',
  };
  
  const sizes = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };
  
  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <button 
      onClick={onClick} 
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

EdueventButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
};

export default EdueventButton;
