import { Link, useParams } from 'react-router-dom';
import Progressbar from '../../components/ProgressBar.jsx';
import Breadcrumb from '../../components/Breadcrumb.jsx';
import useFetchDesignerInfoPublicPage from '../../hooks/useFetchDesignerInfoPublicPage.js';

export default function DesignerInfoPublicPage() {
  const { designerId } = useParams();

  const { designer, schools, avatar, specialization } =
    useFetchDesignerInfoPublicPage({ designerId });

  const links = [
    { link: '/', title: 'Главная' },
    { link: '/designers', title: ' Все дизайнеры' },
    { link: '#', title: designer ? designer.name : `&nbsp;`, isActive: true },
  ];

  return (
    <>
      <section className="container is-max-desktop desktop-only">
        <div className="section">
          <Breadcrumb links={links} />
        </div>
      </section>

      <section className="container">
        <div className="section ">
          <h1 className="title">{designer ? designer.name : <>&nbsp;</>}</h1>

          <div className="level is-4 is-3-mobile mb-4">
            <p className="subtitle">Анкета</p>
            <p className="subtitle">
              <Link to={`/designers/${designerId}/portfolio`}>Портфолио</Link>
            </p>
          </div>

          {/* <div className="level mb-5">
                <div className="level-item">
                    <h2 className="mb-0 is-size-3">
                        { designer && designer.name }                            
                    </h2>
                </div>
                <div className="level-item is-right">
                    <p className='mb-0'>Статус: <span className='subtitle is-primary'>Новенький</span></p>
                </div>
            </div> */}

          <div className="columns">
            <div className="column is-3">
              {avatar ? (
                <img
                  src={avatar}
                  alt=""
                  className="is-max-3-mobile"
                  style={{
                    width: '80%',
                    borderRadius: '8px',
                  }}
                />
              ) : (
                <></>
              )}
            </div>
            <div className="column is-9">
              <p className="">Дизайнер</p>
              <p className="is-size-7 mb-0 subtitle">
                <strong>Образование</strong>
              </p>
              <div className="mt-2 mb-2" style={{ lineHeight: 1.4 }}>
                {schools && schools.length > 0 && schools[0].title ? (
                  schools.map((s) => {
                    return (
                      <div className="" key={s.id}>
                        {s.title} ({s.speciality}), {s.year}, {s.city}
                      </div>
                    );
                  })
                ) : (
                  <>Не указано</>
                )}
              </div>
              <p className="is-size-7 mb-0 subtitle">
                <strong>Специализация</strong>
              </p>
              <p className="mt-1" style={{ lineHeight: 1.4 }}>
                {specialization ? <>{specialization}</> : <>Не указано</>}
              </p>
              <p className="is-size-7 mb-2 is-primary">
                <strong>Статистика</strong>
              </p>
              <div className="is-size-7">
                <span style={{ marginRight: '10px' }} className="is-primary">
                  <i className="fa-regular fa-face-smile"></i>
                </span>
                <span>Завершенных заказов: 0</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="section">
          <h2>Навыки</h2>

          <div className="block">
            <div className="columns ">
              <div className="column is-5">
                <h2 className="is-size-6 subtitle">Soft skills</h2>
                {designer?.userInfo?.softSkills &&
                designer.userInfo.softSkills.length > 0 &&
                designer.userInfo.softSkills[0].title !== '' ? (
                  designer.userInfo.softSkills.map((s, i) => {
                    return (
                      <Progressbar key={i} title={s.title} value={s.percent} />
                    );
                  })
                ) : (
                  <>Не указано</>
                )}
              </div>
              <div className="column is-5">
                <h2 className="is-size-6 subtitle">Hard skills</h2>
                {designer?.userInfo?.hardSkills &&
                designer.userInfo.hardSkills.length > 0 &&
                designer.userInfo.hardSkills[0].title !== '' ? (
                  designer.userInfo.hardSkills.map((s, i) => {
                    return (
                      <Progressbar key={i} title={s.title} value={s.percent} />
                    );
                  })
                ) : (
                  <>Не указано</>
                )}
              </div>
              <div className="column  desktop-only"></div>
            </div>
          </div>
        </div>
      </section>

      <br />
      <br />
    </>
  );
}
