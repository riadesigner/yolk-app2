import Breadcrumb from '../../../components/Breadcrumb.jsx';
import { useFetchAdminBills } from '../../../hooks/useFetchAdminBills.js';
import { formatDateTime } from '../../../utils/dateUtilits.jsx';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';

const links = [
  { link: '/', title: 'Главная' },
  { link: '/cp/yolk-admin', title: 'Панель управления' },
  { link: '#', title: 'Счета', isActive: true },
];

const AdminBillsPage = () => {
  const { error, loading, bills, fetchSetBillPayed } = useFetchAdminBills();
  const [isPaided, setIsPaided] = useState(false);
  const [isFromYolk, setIsFromYolk] = useState(true);
  const navigate = useNavigate();

  const filteredBills = useMemo(
    () =>
      bills?.filter(
        (b) =>
          b.paid === isPaided &&
          b.direction === (isFromYolk ? 'FROM_YOLK' : 'TO_YOLK')
      ),
    [bills, isPaided, isFromYolk]
  );

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <section className="container is-max-desktop desktop-only">
        <div className="section">
          <Breadcrumb links={links} />
        </div>
      </section>

      <section className="container">
        <div className="section">
          <article>
            <div className={'columns'}>
              <div className="rows">
                <button
                  className={[
                    'button',
                    isFromYolk ? 'is-primary' : 'is-link',
                  ].join(' ')}
                  onClick={() => setIsFromYolk(true)}
                >
                  Исходящие
                </button>
                <button
                  className={[
                    'button',
                    !isFromYolk ? 'is-primary' : 'is-link',
                  ].join(' ')}
                  onClick={() => setIsFromYolk(false)}
                >
                  Входящие
                </button>
                <button
                  className={[
                    'button',
                    !isPaided ? 'is-primary' : 'is-link',
                  ].join(' ')}
                  onClick={() => setIsPaided(false)}
                >
                  Не оплаченные
                </button>
                <button
                  className={[
                    'button',
                    isPaided ? 'is-primary' : 'is-link',
                  ].join(' ')}
                  onClick={() => setIsPaided(true)}
                >
                  Оплаченные
                </button>
              </div>
              <div className="content mr-auto">
                {loading ? (
                  <>Загрузка...</>
                ) : filteredBills && filteredBills.length > 0 ? (
                  <div>
                    {filteredBills.map((b) => {
                      const fromDate = formatDateTime(b.createdAt);
                      return (
                        <div key={b.id}>
                          <button
                            className={`button ${b.paid ? 'is-primary' : 'is-link'} mb-3`}
                            onClick={() => {
                              navigate(`/cp/yolk-admin/bills/${b.id}`);
                            }}
                          >
                            <span>
                              Счет № {b.key} от {fromDate},{' '}
                              {b.paid ? (
                                <span>Оплачен</span>
                              ) : (
                                <span>Не оплачен</span>
                              )}
                            </span>
                          </button>
                          {!b.paid && (
                            <button
                              className="button is-primary ml-2"
                              onClick={() => fetchSetBillPayed(b.id)}
                            >
                              Отметить оплаченным
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <>Пока счетов нет</>
                )}
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default AdminBillsPage;
