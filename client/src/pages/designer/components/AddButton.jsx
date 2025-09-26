import PropTypes from 'prop-types';

export default function AddButton({ label, onClick }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <button
        onClick={(e) => onClick(e)}
        className="button is-primary is-large"
      >
        {label}
      </button>
    </div>
  );
}

AddButton.propTypes = {
  label: PropTypes.node,
  onClick: PropTypes.func,
};
