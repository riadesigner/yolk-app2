import Breadcrumb from '../../components/Breadcrumb';
import ChatInput from './components/ChatInput';
import LoadMoreMessages from './components/LoadMoreMessages';
import styles from './ChatPage.module.css';
import { useFetchChats } from '../../hooks/useFetchChats.js';

const links = [
  { link: '/', title: 'Главная' },
  { link: '/chats/123', title: 'Чат с дизайнером', isActive: true },
];

export default function ChatPage() {
  const {
    messages,
    other,
    sendMessage,
    loadMoreMessages,
    isLoadingMore,
    hasMoreMessages,
    loadMoreError,
    isLoading,
  } = useFetchChats();

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
                      background: `gold url(${other?.avatar ?? ''}) no-repeat center/cover`,
                    }}
                  />
                  <h2 className="title is-size-5">{other?.name ?? ''}</h2>
                </div>
              </div>
              <div className={styles.part2}>
                <div className={styles.chatMessages}>
                  <div className={styles.chatWrapper}>
                    {isLoading && messages.length === 0 ? (
                      <div className={styles.noMessages}>
                        <p>Загрузка сообщений...</p>
                      </div>
                    ) : messages.length === 0 ? (
                      <div className={styles.noMessages}>
                        <p>Нет сообщений</p>
                      </div>
                    ) : (
                      <>
                        {hasMoreMessages && (
                          <LoadMoreMessages
                            onLoadMore={loadMoreMessages}
                            isLoading={isLoadingMore}
                            hasMore={hasMoreMessages}
                            error={loadMoreError}
                          />
                        )}
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={
                              message.sender === other?.id
                                ? styles.msgTo
                                : styles.msgFrom
                            }
                          >
                            <span>{message.text}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
                <div className={styles.chatInput}>
                  <ChatInput sendMessage={sendMessage} />
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
