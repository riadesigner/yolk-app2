import { Link } from 'react-router-dom';
import styles from './MainPageCategories.module.css';
import { useEffect, useState } from 'react';
import api from '../../../utils/api.jsx';

export default function MainPageCategories() {
  const [cats, setCats] = useState([]);

  // console.log('cats', cats);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        if (response.data.success) {
          setCats(response.data.categories);
        }
      } catch (err) {
        console.error('Ошибка загрузки категорий', err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="container is-max-desktop">
      <div className="section ">
        <h1 className="title is-size-2 is-size-4-mobile ">Категории</h1>
        {cats && cats.length > 0 && (
          <section className={styles.cats}>
            <ul>
              {cats.map((cat) => {
                return (
                  <Link key={cat.id} to={`/orders/cat/${cat.id}`}>
                    <li>
                      <span>{cat.name}</span>
                    </li>
                  </Link>
                );
              })}
              <Link key={cats.length} to={`/orders`}>
                <li>
                  <span>Все категории</span>
                </li>
              </Link>
            </ul>
          </section>
        )}
      </div>
    </section>
  );
}
