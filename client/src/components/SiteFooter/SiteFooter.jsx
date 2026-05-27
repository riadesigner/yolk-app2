import { Link, NavLink } from 'react-router-dom';
import styles from './SiteFooter.module.css';

import imgFooterLogo from '../../i/yolk-logo.png';

export default function SiteFooter() {
  return (
    <>
      <section className="container is-max-desktop mt-6 yo-footer">
        <div className="section ">
          <div className="level">
            <div className="level-item is-left">
              <Link to="/">
                <img
                  className="yo-footer-logo"
                  src={imgFooterLogo}
                  alt=""
                  style={{
                    height: '22px',
                  }}
                />
              </Link>
            </div>
            <hr className="mobile-only" />
            <div className="level-item is-right yo-footer-menu">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? 'level-item nav-link is-active'
                    : 'level-item nav-link'
                }
              >
                О нас
              </NavLink>

              <NavLink
                to="/faq"
                className={({ isActive }) =>
                  isActive
                    ? 'level-item nav-link is-active'
                    : 'level-item nav-link'
                }
              >
                FAQ
              </NavLink>

              <NavLink
                to="/startup"
                className={({ isActive }) =>
                  isActive
                    ? 'level-item nav-link is-active'
                    : 'level-item nav-link'
                }
              >
                Страница стартапа
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      <div>
        <section className='container'>
          <hr />
            <div               
              className={[
                styles.footerLogos,
                'columns',
                'section',
              ].join(' ')}              
              >
              <div><img src="./innovation.png" alt="" width='100px' height='auto' /></div>
              <div><a target="_blank" href="https://univertechpred.ru/"><img src="./platforma.jpg" alt="" width='100px' height='auto' /></a></div>
              <div className="is-size-7">Проект создан при поддержке Федерального государственного бюджетного учреждения «Фонд содействия развитию малых форм предприятий в научно-технической сфере в рамках программы «Студенческий стартап» федерального проекта «Платформа университетского технологического предпринимательства».</div>
            </div>
        </section>          
      </div>
      <div className="site-footer mt-5" />
    </>
  );
}
