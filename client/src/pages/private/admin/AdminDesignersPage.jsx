import AdminDesignerPreview from './components/AdminDesignerPreview.jsx';
import Pagination from '../../../components/Pagination.jsx';

import Breadcrumb from '../../../components/Breadcrumb.jsx';
import { useFetchAdminUsers } from '../../../hooks/useFetchAdminUsers.js';

export default function AdminDesignersPage() {
  const links = [
    { link: '/', title: 'Главная' },
    { link: '/cp/yolk-admin', title: 'Панель управления' },
    { link: '#', title: 'Все дизайнеры', isActive: true },
  ];

  const { users } = useFetchAdminUsers('designer');

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
            <h2>Все дизайнеры</h2>
            <div>
              {users &&
                users.length > 0 &&
                users.map((designer) => {
                  return (
                    <AdminDesignerPreview
                      key={designer.id}
                      designer={{
                        id: designer.id,
                        name: designer.name,
                        email: designer.email,
                        specialization: designer.userInfo.specialization,
                        ordersAmount:
                          designer.contracts?.filter(
                            (contract) =>
                              contract.status === 'DONE' ||
                              contract.status === 'ARCHIVED'
                          ).length ?? 0,
                      }}
                    />
                  );
                })}
            </div>
            <div className="block mt-6">
              {/*<Pagination currentPage={1} paginationParams={{totalPages}}/>*/}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
