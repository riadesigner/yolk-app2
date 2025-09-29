import PropTypes from 'prop-types';
import InboxMessage from '../components/InboxMessage';
import { Link } from 'react-router-dom';

export default function NotifsLast({ nowLoading, notifications, linkToAll }) {
  return (
    <div className="column is-6">
      <h2 className="is-size-5-mobile">Сообщения</h2>
      {nowLoading ? (
        <div>Загрузка...</div>
      ) : (
        <div className="inbox-messages" id="inbox-messages">
          {notifications && notifications.length > 0 ? (
            notifications.map((msg) => {
              return <InboxMessage key={msg.id} messageData={msg} />;
            })
          ) : (
            <p className="block has-text-centered">Сообщений нет</p>
          )}
          <p className="has-text-centered">
            <Link to={linkToAll}>Показать все сообщения</Link>
          </p>
        </div>
      )}
    </div>
  );
}

NotifsLast.propTypes = {
  nowLoading: PropTypes.bool.isRequired,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    })
  ).isRequired,
  linkToAll: PropTypes.string.isRequired,
};

NotifsLast.defaultProps = {
  nowLoading: false,
  notifications: [],
  linkToAll: '',
};
