import { Link, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb.jsx';
import { useFetchPortfolioItem } from '../../hooks/useFetchPortfolioItem.js';
import styles from './PotfolioItemPage.module.css';
import { useEffect } from 'react';
import GoToUp from '../../components/GoToUp.jsx';

const PortfolioItemPage = () => {
  const { portfolioId } = useParams();
  const navigate = useNavigate();
  const {
    loading,
    error,
    data: { designer, ...portfolio },
  } = useFetchPortfolioItem(portfolioId);

  useEffect(() => {
    if (!portfolioId) {
      navigate('/');
    }
  }, [navigate, portfolioId]);

  const links = [
    { link: '/', title: 'Главная' },
    { link: '/designers', title: ' Все дизайнеры' },
    {
      link: `#`,
      title: designer?.name,
      isActive: true,
    },
  ];

  if (loading) {
    return (
      <section className="container">
        <div className="section">Loading...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container">
        <div className="section">Error...</div>
      </section>
    );
  }

  return (
    <>
      <section className="container is-max-desktop desktop-only">
        <div className="section">
          <Breadcrumb links={links} />
        </div>
      </section>
      <section className="container">
        <div className="section">
          <h1 className="title">{designer?.name ?? '&:nbsp;'}</h1>

          <div className="level is-4 is-3-mobile mb-4">
            <p className="subtitle">
              <Link to={designer ? `/designers/${designer.id}` : ''}>
                Анкета
              </Link>
            </p>
            <p className="subtitle">Портфолио</p>
          </div>
          <article className={styles.portfolioItem}>
            <div className="wrapper">
              <h2 className={styles.portfolioItemTitle}>{portfolio.title}</h2>
              <p>{portfolio.description}</p>
              <div className={styles.portfolioItemImages}>
                {portfolio.images &&
                  portfolio.images.map((image) => (
                    <img
                      className={styles.portfolioItemImage}
                      src={image.url}
                      alt={portfolio.title}
                      key={image.key}
                    />
                  ))}
              </div>
            </div>
            <GoToUp />
          </article>
        </div>
      </section>
    </>
  );
};

export default PortfolioItemPage;
