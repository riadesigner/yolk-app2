import { useParams } from 'react-router-dom';

import Breadcrumb from '../../components/Breadcrumb.jsx';
import CompanyGallery from './components/CompanyGallery.jsx';
import CompanyAboutHeader from './components/CompanyAboutHeader.jsx';
import CompanyAboutOrders from './components/CompanyAboutOrders.jsx';
import useFetchCompany from '../../hooks/useFetchCompany.js';

export default function CompanyPublicPage() {
  const params = useParams();
  const { companyId } = params;

  // console.log('param companyId = ', companyId);

  const links = [
    { link: '/', title: 'Главная' },
    { link: '/companies', title: 'Все компании' },
    { link: '#', title: 'О компании', isActive: true },
  ];

  const { company, gallery, orders } = useFetchCompany({ companyId });

  return (
    <>
      <section className="container is-max-desktop desktop-only">
        <div className="section">
          <Breadcrumb links={links} />
        </div>
      </section>
      <article>
        {company && (
          <CompanyAboutHeader
            company={company}
            orders={orders}
            privateMode={false}
          />
        )}

        <section className="container">
          <div className="section">
            <h2>Кто мы</h2>
            <p>{company && company.description}</p>
          </div>
          <div className="section">
            <CompanyGallery gallery={gallery} />
          </div>
        </section>

        <br />

        <section className="container">
          <div className="section">
            <CompanyAboutOrders orders={orders} />
          </div>
        </section>

        <br />
        <br />
      </article>
    </>
  );
}
