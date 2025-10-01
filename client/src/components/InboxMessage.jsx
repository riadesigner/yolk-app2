import styles from './InboxMessage.module.css';
import { formatDateTime } from '../utils/dateUtilits';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function InboxMessage({ messageData }) {
  const navigate = useNavigate();

  const date = formatDateTime(messageData.createdAt);
  const hdlClick = (e, url) => {
    e.preventDefault();
    navigate(url);
  };

  return (
    <div className={styles.message} id={messageData.id}>
      <div className={styles.messageBell}>
        <i className={`fa-regular fa-bell is-primary`} />
      </div>
      <h3>{messageData.title}</h3>
      <small>{date}</small>
      <div className={styles.messageLinks}>
        {messageData.links &&
          messageData.links.length > 0 &&
          messageData.links.map((link, index) => {
            return (
              <button
                key={index}
                className={`button ml-2 mt-2 is-small ${link.bright ? 'is-link' : 'is-primary'}`}
                onClick={(e) => hdlClick(e, link.url)}
              >
                {link.name}
              </button>
            );
          })}
      </div>
    </div>
  );
}

InboxMessage.propTypes = {
  messageData: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        bright: PropTypes.bool,
      })
    ),
  }).isRequired,
};
