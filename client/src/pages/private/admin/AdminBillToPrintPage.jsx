import useFetchBillToPrintPage from '../../../hooks/useFetchBillToPrintPage.js';
import BillToPrint from '../../../components/BillToPrint/index.jsx';
import Breadcrumb from '../../../components/Breadcrumb.jsx';

const links = [
  { link: '/', title: 'Главная' },
  { link: '/cp/yolk-admin', title: 'Панель управления' },
  { link: '#', title: 'Счета', isActive: true },
];

const AdminBillToPrintPage = () => {
  const { bill, nowLoading, fetchBillSetPayed } = useFetchBillToPrintPage();

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
            {nowLoading ? (
              <>Загрузка...</>
            ) : bill ? (
              <>
                <BillToPrint bill={bill} />
                {!bill.paid && (
                  <div className="columns mt-5">
                    <button
                      className="button is-primary ml-auto"
                      onClick={fetchBillSetPayed}
                    >
                      Отметить оплаченным
                    </button>
                  </div>
                )}
              </>
            ) : (
              'Счет не найден'
            )}
          </article>
        </div>
      </section>
    </>
  );
};

export default AdminBillToPrintPage;
