import Breadcrumb from '../../components/Breadcrumb.jsx';
import { getPayloads } from '../../utils/payloads.jsx';
import { useFetchUserChatList } from '../../hooks/useFetchUserChatList.js';
import ChatsList from '../../components/ChatsList.jsx';

const ChatListPage = () => {
  const pl = getPayloads();

  const { role } = pl;

  const links = [
    { link: '/', title: 'Главная' },
    {
      link: `/cp/${role}`,
      title: 'Панель управления',
    },
    { link: '#', title: 'Список чатов', isActive: true },
  ];

  const { chats } = useFetchUserChatList();

  return (
    <>
      <section className="container is-max-desktop desktop-only">
        <div className="section">
          <Breadcrumb links={links} />
        </div>
      </section>
      <section className="container">
        <div className="section">
          <ChatsList chats={chats} />
        </div>
      </section>
    </>
  );
};

export default ChatListPage;
