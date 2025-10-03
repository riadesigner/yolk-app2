import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

export default function LoadMoreMessages({
  onLoadMore,
  isLoading,
  hasMore,
  error,
}) {
  const [isObserverActive, setIsObserverActive] = useState(false);
  const loadMoreRef = useRef(null);

  // Активируем observer после монтирования
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsObserverActive(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isObserverActive || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
          onLoadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px', // Увеличиваем margin для более раннего срабатывания
      }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [onLoadMore, isLoading, hasMore, isObserverActive]);

  if (!hasMore) {
    return null;
  }

  return (
    <div
      ref={loadMoreRef}
      className="has-text-centered"
      style={{
        padding: '1rem',
        minHeight: '40px',
      }}
    >
      {error ? (
        <div className="has-text-danger">
          <small>Ошибка загрузки сообщений</small>
          <button
            className="button is-small is-light ml-2"
            onClick={onLoadMore}
            disabled={isLoading}
          >
            Повторить
          </button>
        </div>
      ) : isLoading ? (
        <div className="is-flex is-justify-content-center is-align-items-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Загрузка...</span>
          </div>
          <span className="ml-2">Загрузка сообщений...</span>
        </div>
      ) : (
        <div className="has-text-grey">
          <small>Загрузка предыдущих сообщений...</small>
        </div>
      )}
    </div>
  );
}

LoadMoreMessages.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  error: PropTypes.string,
};
