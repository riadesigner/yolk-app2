import PropTypes from 'prop-types';
import { useState } from 'react';

export default function ChatInput({ sendMessage }) {
  const [message, setMessage] = useState('');
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
      }}
    >
      <div className="field has-addons is-fluid">
        <p className="control">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input"
            type="text"
            placeholder="Введите текст ..."
          />
        </p>
        <p className="control">
          <button type="submit" className="button is-primary">
            Отправить
          </button>
        </p>
      </div>
    </form>
  );
}

ChatInput.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};
