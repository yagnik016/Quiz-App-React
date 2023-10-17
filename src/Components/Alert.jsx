import  { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Alert = ({ type, message }) => {
  const alertClass = `alert alert-${type}`;
  const textColor = type === 'danger' ? 'red' : type === 'success' ? 'green' : 'black';
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 3000); // 3000 milliseconds (3 seconds)

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <div style={{ minHeight: visible ? 'auto' : '65px',marginTop: '55px',fontSize: '30px',fontWeight: 'bold' }}>
        {visible && (
          <div className={alertClass} role="alert">
            <p style={{ color: textColor }}>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'info', 'warning', 'danger']).isRequired,
  message: PropTypes.string.isRequired,
};

export default Alert;
