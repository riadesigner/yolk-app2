import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const DesignerOrderItem = ({ orderId, title }) => {
  return (
    <Link
      to={`/orders/${orderId}`}
      className="button is-fluid is-medium is-regular-mobile is-primary mb-3 is-left"
    >
      <span>
        {title}
        <br />
        <span className="is-size-7">[ {orderId} ]</span>
      </span>
    </Link>
  );
};

DesignerOrderItem.propTypes = {
  orderId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default DesignerOrderItem;
