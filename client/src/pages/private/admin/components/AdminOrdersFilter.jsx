import PropTypes from 'prop-types';

export default function OrdersFilter({
  setFilter,
  currentFilter,
  ordersCount,
}) {
  return (
    <>
      <div className="block">
        <h2 className="subtitle is-size-6 mb-4">Категории</h2>
        <button
          className={[
            'button is-fluid mb-4 is-left',
            currentFilter === 'PUBLISHED' ? 'is-link' : '',
          ].join(' ')}
          onClick={() => setFilter('PUBLISHED')}
        >
          <span>Вакантные ({ordersCount['PUBLISHED'] ?? 0})</span>
          <span>
            <i className="fa-solid fa-arrow-right" />
          </span>
        </button>
        <button
          className={[
            'button is-fluid mb-4 is-left',
            currentFilter === 'HAS_CONTRACTOR' ? 'is-link' : '',
          ].join(' ')}
          onClick={() => setFilter('HAS_CONTRACTOR')}
        >
          <span>Есть исполнитель ({ordersCount['HAS_CONTRACTOR'] ?? 0})</span>
          <span>
            <i className="fa-solid fa-arrow-right" />
          </span>
        </button>
        <button
          className={[
            'button is-fluid mb-4 is-left',
            currentFilter === 'DEPOSIT_PAID' ? 'is-link' : '',
          ].join(' ')}
          onClick={() => setFilter('DEPOSIT_PAID')}
        >
          <span>Оплачен ({ordersCount['DEPOSIT_PAID'] ?? 0})</span>
          <span>
            <i className="fa-solid fa-arrow-right" />
          </span>
        </button>
        <button
          className={[
            'button is-fluid mb-4 is-left',
            currentFilter === 'DONE' ? 'is-link' : '',
          ].join(' ')}
          onClick={() => setFilter('DONE')}
        >
          <span>Выполнен ({ordersCount['DONE'] ?? 0})</span>
          <span>
            <i className="fa-solid fa-arrow-right" />
          </span>
        </button>
        <button
          className={[
            'button is-fluid mb-4 is-left',
            currentFilter === 'ARCHIVED' ? 'is-link' : '',
          ].join(' ')}
          onClick={() => setFilter('ARCHIVED')}
        >
          <span>В архиве ({ordersCount['ARCHIVED'] ?? 0})</span>
          <span>
            <i className="fa-solid fa-arrow-right" />
          </span>
        </button>
      </div>

      <div className="block">
        <h2 className="subtitle is-size-6 mb-4">Статистика</h2>
        <div>данные в работе</div>
      </div>
    </>
  );
}

OrdersFilter.propTypes = {
  setFilter: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
  ordersCount: PropTypes.object.isRequired,
};
