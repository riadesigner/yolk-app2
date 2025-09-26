import Breadcrumb from '../../../components/Breadcrumb.jsx';
import CompanyGallery from '../../company/components/CompanyGallery.jsx';
import CompanyAboutHeader from '../../company/components/CompanyAboutHeader.jsx';
import CompanyAboutOrders from '../../company/components/CompanyAboutOrders.jsx';

import useFetchCompanyAdminInfo from '../../../hooks/useFetchCompanyAdminInfo.js';

export default function CompanyInfoPage() {
  const links = [
    { link: '/', title: 'Главная' },
    { link: '/cp/company', title: 'Панель управления' },
    { link: '#', title: 'О компании', isActive: true },
  ];

  const { company, gallery, orders } = useFetchCompanyAdminInfo();

  return (
    <>
      <section className="container is-max-desktop desktop-only">
        <div className="section">
          <Breadcrumb links={links} />
        </div>
      </section>
      <article>
        <CompanyAboutHeader company={company} orders={orders} privateMode />

        <section className="container">
          <div className="section">
            <h2>Кто мы</h2>

            <p style={{ whiteSpace: 'pre-line' }}>
              {company && company.description}
            </p>
          </div>

          <div className="section">
            {gallery ? (
              <CompanyGallery gallery={gallery} />
            ) : (
              <>Галерея не заполнена</>
            )}
          </div>
        </section>

        <br />

        <section className="container">
          <div className="section">
            <CompanyAboutOrders orders={orders} />
          </div>
        </section>
      </article>
    </>
  );
}
