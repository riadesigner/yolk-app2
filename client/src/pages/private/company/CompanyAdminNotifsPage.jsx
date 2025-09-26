import Breadcrumb from '../../../components/Breadcrumb.jsx';
import NotifsList from '../../../components/NotifsList.jsx';

export default function CompanyAdminNotifsPage() {
  const links = [
    { link: '/', title: 'Главная' },
    { link: '/cp/company', title: 'Панель управления' },
    { link: '#', title: 'Все сообщения', isActive: true },
  ];

  return (
    <>
      <section className="container is-max-desktop desktop-only">
        <div className="section">
          <Breadcrumb links={links} />
        </div>
      </section>

      <NotifsList />
    </>
  );
}
