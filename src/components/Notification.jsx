//Notification.jsx
import PropTypes from 'prop-types';
import Button from './Button';
import '../styles/Notification.css';

const Notification = ({ message, onClose }) => {
  return (
    <div className="notification">
      <span>{message}</span>
      <Button onClick={onClose} type="secondary">Close</Button>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Notification;
