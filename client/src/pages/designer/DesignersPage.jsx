import Breadcrumb from '../../components/Breadcrumb.jsx';
import DesignerPreview from './components/DesignerPreview.jsx';
import useFetchDesignersPage from '../../hooks/useFetchDesignersPage.js';
import styles from './DesignersPage.module.css';

export default function Designer() {
  const links = [
    { link: '/', title: 'Главная' },
    { link: '#', title: ' Все дизайнеры', isActive: true },
  ];

  const { designers } = useFetchDesignersPage();

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
            <div className={styles.items}>
              {designers &&
                designers.length > 0 &&
                designers.map((d) => {
                  return <DesignerPreview key={d.id} designer={d} />;
                })}
            </div>
            <div className="block mt-6">{/* <Pagination /> */}</div>
          </article>
        </div>
      </section>
    </>
  );
}
