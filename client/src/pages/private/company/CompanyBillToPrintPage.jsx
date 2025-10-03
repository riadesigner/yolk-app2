import Breadcrumb from '../../../components/Breadcrumb.jsx';
import useFetchBillToPrintPage from '../../../hooks/useFetchBillToPrintPage.js';
import BillToPrint from '../../../components/BillToPrint/index.jsx';

export default function CompanyBillToPrintPage() {
  const links = [
    { link: '/', title: 'Главная' },
    { link: '/cp/company', title: 'Панель управления' },
    { link: '/cp/company/bills', title: 'Счета компании' },
    { link: '#', title: 'Счет', isActive: true },
  ];

  const { nowLoading, bill } = useFetchBillToPrintPage();

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
              <BillToPrint bill={bill} />
            ) : (
              <>Счет не найден</>
            )}
          </article>
        </div>
      </section>
    </>
  );
}
