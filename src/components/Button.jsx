import PropTypes from 'prop-types';
import '../styles/Button.css';

function Button({ children, onClick, type = 'primary', disabled = false }) {
  const className = type === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary']),
  disabled: PropTypes.bool,
};

export default Button;
