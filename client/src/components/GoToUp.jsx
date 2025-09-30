import styles from './GoToUp.module.css';

const GoToUp = () => {
  const goToUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={[styles.goToUp, 'button'].join(' ')}
      onClick={goToUp}
    ></button>
  );
};

export default GoToUp;
