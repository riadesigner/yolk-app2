import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getPayloads } from '../utils/payloads.jsx';

function ChatItem({ chat }) {
  const pl = getPayloads();
  const { id: userId } = pl;

  return (
    <Link
      key={chat.id}
      to={`/chats/${chat.id}`}
      className="button is-fluid is-medium is-regular-mobile is-primary mb-3 is-left"
    >
      <span>
        Чат с {chat.users.filter((us) => userId !== us.id)[0]?.name ?? ''}
        <br />
      </span>
    </Link>
  );
}

ChatItem.propTypes = {
  chat: PropTypes.shape({
    id: PropTypes.string,
    users: PropTypes.arrayOf(PropTypes.object),
  }),
};

const ChatsList = ({ chats }) => {
  if (!chats?.length) {
    return <p>У вас нет чатов</p>;
  }

  return (
    <div>
      {chats?.map((chat) => {
        return <ChatItem key={chat.id} chat={chat} />;
      })}
    </div>
  );
};

export default ChatsList;

ChatsList.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.object),
  userId: PropTypes.string,
};
