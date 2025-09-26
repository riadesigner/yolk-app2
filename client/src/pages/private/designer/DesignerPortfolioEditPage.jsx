import { Link } from 'react-router-dom';
import { useState } from 'react';

import Field from '../../../components/Field.jsx';
import ImageUploaderPortfolio from '../../designer/components/ImageUploaderPortfolio.jsx';
import Breadcrumb from '../../../components/Breadcrumb.jsx';
import styles from './DesignerPortfolioEditPage.module.css';
import ErrorMessage from '../../../components/ErrorMessage.jsx';

import useFetchDesignerPortfolioEdit from '../../../hooks/useFetchDesignerPortfolioEdit.js';

export default function DesignerPortfolioEditPage() {
  const [errorMessage, setErrorMessage] = useState('');

  const {
    portfolioItem,
    title,
    setTitle,
    description,
    setDescription,
    images,
    setImages,
    hdlSavePortfolio,
  } = useFetchDesignerPortfolioEdit(setErrorMessage);

  const links = [
    { link: '/', title: 'Главная' },
    { link: '/cp/designer', title: 'Панель управления' },
    { link: '/cp/designer/portfolio', title: 'Портфолио' },
    { link: '#', title: 'Редактирование', isActive: true },
  ];

  return (
    <>
      <section className="container is-max-desktop desktop-only">
        <div className="section">
          <Breadcrumb links={links} />
        </div>
      </section>

      <article>
        <section className="container">
          <div className="section ">
            <div className="level mb-5">
              <div className="level-item">
                <h2 className="mb-0 is-size-3">Редактирование портфолио</h2>
              </div>
              <div className="level-item is-right">
                <Link to="/cp/designer/info/edit">
                  <button className="button is-link is-small">
                    <span className="fa-solid fa-share-from-square">
                      <i></i>
                    </span>
                    <span>Смотреть на сайте</span>
                  </button>
                </Link>
              </div>
            </div>

            <div className="block ">
              <div className="box">
                <h2>Проект</h2>
                <Field
                  label="Название проекта"
                  sublabel="(до 100 символов)"
                  value={title}
                  onChange={setTitle}
                />
                <Field
                  label="Краткое описание проекта"
                  sublabel="(до 1500 символов)"
                  type="textarea"
                  value={description}
                  onChange={setDescription}
                />
              </div>
            </div>

            {portfolioItem && (
              <div className="block mb-6">
                <h2 className="subtitle is-size-7">
                  <strong>Галерея изображений</strong>
                </h2>
                <div className={styles.images}>
                  {images.length > 0 &&
                    images.map((image) => (
                      <div
                        key={image.key}
                        className="box"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <ImageUploaderPortfolio
                          portfolioId={portfolioItem.id}
                          setImages={setImages}
                          image={image}
                        />
                      </div>
                    ))}

                  {
                    <div
                      key={images.length}
                      className="box"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <ImageUploaderPortfolio
                        portfolioId={portfolioItem.id}
                        setImages={setImages}
                      />
                    </div>
                  }
                </div>
              </div>
            )}

            <div className="block has-text-right">
              <button
                className="button is-primary is-medium is-regular-mobile"
                onClick={hdlSavePortfolio}
              >
                Сохранить
              </button>
            </div>

            {errorMessage && <ErrorMessage message={errorMessage} />}
          </div>
        </section>
      </article>
    </>
  );
}
