import Breadcrumb from '../../components/Breadcrumb.jsx';
import ChatInput from './components/ChatInput.jsx';
import ChatPreview from './components/ChatPreview.jsx';

import styles from './ChatPage.module.css';

export default function ChatPage() {
  const user = {
    id: '2',
    avatar: '/photo.jpg',
    name: 'Дмитрий',
    surname: 'Печкорин',
    role: 'designer',
  };

  const me = {
    id: '1',
    avatar: '/photo.jpg',
    name: 'Евгений',
    surname: 'Половинкин',
    role: 'company',
  };

  const userName = `${user.name} ${user.surname}`;
  const userAvatar = user.avatar ?? '/no-image.jpg';
  // console.log('userAvatar', userAvatar);

  const links = [
    { link: '/', title: 'Главная' },
    { link: '/chats/123', title: 'Чат с дизайнером', isActive: true },
  ];

  // const designer = {
  //   id: '123',
  //   name: 'Дмитрий',
  //   surname: 'Печкорин',
  //   city: 'Владивосток',
  //   portfolios: [
  //     {
  //       id: '1234',
  //       title: 'Название проекта 1',
  //       images: ['/portf/p-1.jpg', '/portf/p-2.jpg', '/portf/p-3.jpg'],
  //     },
  //     {
  //       id: '1235',
  //       title: 'Название проекта 2',
  //       images: ['/portf/p-1.jpg', '/portf/p-2.jpg', '/portf/p-3.jpg'],
  //     },
  //   ],
  //   avatar: '/photo.jpg',
  // };

  const messages = [
    {
      id: '1',
      idUser: '1',
      datetime: '10-09-2025 10:01:00',
      message:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitatio',
      status: 'viewed',
    },
    {
      id: '2',
      idUser: '2',
      datetime: '10-09-2025 10:02:00',
      message: 'Cconsectetur adipisicing elit. Exercitatio',
      status: 'viewed',
    },
    {
      id: '3',
      idUser: '2',
      datetime: '10-09-2025 10:03:00',
      message: 'Dolor sit amet consectetur',
      status: 'viewed',
    },
    {
      id: '4',
      idUser: '1',
      datetime: '10-09-2025 10:03:00',
      message: 'ok',
      status: 'pushed',
    },
    {
      id: '5',
      idUser: '1',
      datetime: '10-09-2025 10:01:00',
      message:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitatio',
      status: 'viewed',
    },
    {
      id: '6',
      idUser: '2',
      datetime: '10-09-2025 10:02:00',
      message: 'Cconsectetur adipisicing elit. Exercitatio',
      status: 'viewed',
    },
    {
      id: '7',
      idUser: '2',
      datetime: '10-09-2025 10:03:00',
      message: 'Dolor sit amet consectetur',
      status: 'viewed',
    },
    {
      id: '8',
      idUser: '1',
      datetime: '10-09-2025 10:03:00',
      message: 'ok',
      status: 'pushed',
    },
    {
      id: '9',
      idUser: '1',
      datetime: '10-09-2025 10:01:00',
      message:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitatio',
      status: 'viewed',
    },
    {
      id: '10',
      idUser: '2',
      datetime: '10-09-2025 10:02:00',
      message: 'Cconsectetur adipisicing elit. Exercitatio',
      status: 'viewed',
    },
    {
      id: '11',
      idUser: '2',
      datetime: '10-09-2025 10:03:00',
      message: 'Dolor sit amet consectetur',
      status: 'viewed',
    },
    {
      id: '12',
      idUser: '1',
      datetime: '10-09-2025 10:03:00',
      message: 'ok',
      status: 'pushed',
    },
    {
      id: '13',
      idUser: '1',
      datetime: '10-09-2025 10:01:00',
      message:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitatio',
      status: 'viewed',
    },
    {
      id: '14',
      idUser: '2',
      datetime: '10-09-2025 10:02:00',
      message: 'Cconsectetur adipisicing elit. Exercitatio',
      status: 'viewed',
    },
    {
      id: '15',
      idUser: '2',
      datetime: '10-09-2025 10:03:00',
      message: 'Dolor sit amet consectetur',
      status: 'viewed',
    },
    {
      id: '16',
      idUser: '1',
      datetime: '10-09-2025 10:03:00',
      message: 'ok',
      status: 'pushed',
    },
    {
      id: '17',
      idUser: '1',
      datetime: '10-09-2025 10:01:00',
      message:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitatio',
      status: 'viewed',
    },
    {
      id: '18',
      idUser: '2',
      datetime: '10-09-2025 10:02:00',
      message: 'Cconsectetur adipisicing elit. Exercitatio',
      status: 'viewed',
    },
    {
      id: '19',
      idUser: '2',
      datetime: '10-09-2025 10:03:00',
      message: 'Dolor sit amet consectetur',
      status: 'viewed',
    },
    {
      id: '20',
      idUser: '1',
      datetime: '10-09-2025 10:03:00',
      message: 'ok',
      status: 'pushed',
    },
  ];

  return (
    <>
      <section className="container desktop-only is-max-desktop">
        <div className="section">
          <Breadcrumb links={links} />
        </div>
      </section>

      <section className="container is-max-desktop">
        <div className="section">
          <article>
            <div className={styles.chatPage}>
              <div className={styles.part1}>
                <div className="has-text-centered">
                  <div
                    className={styles.avatar}
                    style={{
                      background: `gold url(${userAvatar}) no-repeat center/cover`,
                    }}
                  ></div>
                  <h2 className="title is-size-5">{userName}</h2>
                </div>
              </div>
              <div className={styles.part2}>
                <div className={styles.chatMessages}>
                  {messages.map((i) => {
                    return i.idUser === me.id ? (
                      <div key={i.id} className={styles.msgTo}>
                        <span>{i.message}</span>
                      </div>
                    ) : (
                      <div key={i.id} className={styles.msgFrom}>
                        <span>{i.message}</span>
                      </div>
                    );
                  })}
                </div>
                <div className={styles.chatInput}>
                  <ChatInput />
                </div>
              </div>
              <div className={styles.part3}>
                <h2 className="title is-size-6">Прошлые чаты</h2>
                <div>
                  <ChatPreview chatId="1" user={user} lastMessage="ок" />
                  <ChatPreview
                    chatId="2"
                    user={user}
                    lastMessage="Да. так и есть..."
                  />
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
