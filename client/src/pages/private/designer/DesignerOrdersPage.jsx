import DesignerOrderItem from './components/DesignerOrderItem.jsx';
import Breadcrumb from '../../../components/Breadcrumb.jsx';
import useFetchDesignerAdmin from '../../../hooks/useFetchDesignerAdmin.js';

const DesignerOrdersPage = () => {
  const links = [
    { link: '/', title: 'Главная' },
    { link: '/cp/designer', title: 'Панель управления' },
    { link: '#', title: 'Мои заказы', isActive: true },
  ];

  const { user } = useFetchDesignerAdmin();
  return (
    <>
      <section className="container is-max-desktop desktop-only">
        <div className="section">
          <Breadcrumb links={links} />
        </div>
      </section>
      <section className="container">
        <div className="section mt-0">
          <div className="banner is-primary">
            <div className="banner-body">
              <h1 className="sub-title is-size-5-mobile mb-0">
                Добро, пожаловать <nobr>{user && user.name}!</nobr>
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="section">
          <article>
            <div className="columns">
              <div className="column is-6">
                <h2 className="title is-size-5-mobile">Заказы</h2>
                <div className="block mb-6 mb-5-mobile">
                  {user?.contracts &&
                    user?.contracts?.length > 0 &&
                    // user?.contracts?.map(
                    user?.contracts?.slice(0, 4).map((order) => {
                      return (
                        <DesignerOrderItem
                          key={order.id}
                          orderId={order.id}
                          title={order.title}
                          clientName="mb-4"
                        />
                      );
                    })}
                  {!user?.contracts ||
                    (user?.contracts.length === 0 && <>Заказов пока нет</>)}
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default DesignerOrdersPage;
