import { useParams } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrumb.jsx';
import OrderEditForm from './components/OrderEditForm.jsx';
import ErrorMessage from '../../../components/ErrorMessage.jsx';
import useFetchOrder from '../../../hooks/useFetchOrder.js';
import { useState } from 'react';

export default function OrderEditPage() {
  const links = [
    { link: '/', title: 'Главная' },
    { link: '/cp/company', title: 'Панель управления' },
    { link: '#', title: 'Добавление заказа', isActive: true },
  ];

  const { companyId } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    cats,
    setCats,
    title,
    setTitle,
    description,
    setDescription,
    tags,
    setTags,
    price,
    setPrice,
    dateTo,
    setDateTo,
    hdlSaveOrder,
  } = useFetchOrder({
    orderId: null,
    companyId,
    errorMessage,
    setErrorMessage,
  });

  const options = {
    title,
    setTitle,
    description,
    setDescription,
    cats,
    setCats,
    tags,
    setTags,
    price,
    setPrice,
    dateTo,
    setDateTo,
  };

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
            <h2 className="is-size-3 is-size-4-mobile mb-5">Новый заказ</h2>

            <OrderEditForm options={options} />
          </div>
        </section>

        <section className="container">
          <div className="section ">
            <div className="block">
              <div className="box">
                <h3>Дополнительные файлы:</h3>
                <p>
                  После сохранения заказа, вы сможете добавить к нему
                  дополнительные файлы, при необходимости.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container">
          <div className="section has-text-right">
            <button
              className="button is-primary is-medium is-regular-mobile"
              onClick={(e) => hdlSaveOrder(e)}
            >
              Сохранить
            </button>
          </div>
        </section>

        {errorMessage && <ErrorMessage message={errorMessage} />}
      </article>
    </>
  );
}
