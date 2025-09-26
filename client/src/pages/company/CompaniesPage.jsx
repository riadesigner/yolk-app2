import Breadcrumb from '../../components/Breadcrumb.jsx';
import Pagination from '../../components/Pagination.jsx';
import CompanyPreview from './components/CompanyPreview.jsx';
import styles from './CompanyPage.module.css';

import useFetchCompanies from '../../hooks/useFetchCompanies.js';

export default function Companies() {
  const links = [
    { link: '/', title: 'Главная' },
    { link: '#', title: ' Все компании', isActive: true },
  ];

  const { companies, paginationParams, currentPage, setCurrentPage } =
    useFetchCompanies();

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
            <div className={styles.companies}>
              {companies.map((company) => {
                return <CompanyPreview key={company.id} company={company} />;
              })}
            </div>
            <div className="block mt-6">
              <Pagination
                paginationParams={paginationParams}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
