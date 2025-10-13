import AdminCompanyPreview from './components/AdminCompanyPreview.jsx';
import Pagination from '../../../components/Pagination.jsx';

import Breadcrumb from '../../../components/Breadcrumb.jsx';
import { useFetchAdminUsers } from '../../../hooks/useFetchAdminUsers.js';

export default function CompanyInfoPage() {
  const links = [
    { link: '/', title: 'Главная' },
    { link: '/cp/yolk-admin', title: 'Панель управления' },
    { link: '#', title: 'Все компании', isActive: true },
  ];

  const { users: companies } = useFetchAdminUsers('company');

  return (
    <>
      <section className="container is-max-desktop desktop-only">
        <div className="section">
          <Breadcrumb links={links} />
        </div>
      </section>
      <article>
        <section className="container">
          <div className="section">
            <h2>Все компании</h2>
            <div>
              {companies &&
                companies.length > 0 &&
                companies.map((company) => {
                  return (
                    <AdminCompanyPreview
                      company={{
                        name: company.name,
                        id: company.userCompany.id,
                        city: company.userCompany.city,
                        companyName: company.userCompany.name,
                        ordersAmount: company.userCompany.orders.length,
                      }}
                      key={company.name}
                    />
                  );
                })}
            </div>
            {/*<div className="block mt-6">*/}
            {/*  <Pagination />*/}
            {/*</div>*/}
          </div>
        </section>
      </article>
    </>
  );
}
