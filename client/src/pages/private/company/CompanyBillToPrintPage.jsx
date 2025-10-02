import Breadcrumb from '../../../components/Breadcrumb.jsx';
import useFetchBillToPrintPage from '../../../hooks/useFetchBillToPrintPage.js';
import { formatDate } from '../../../utils/dateUtilits.jsx';
import styles from './CompanyBillToPrintPage.module.css';

export default function CompanyBillToPrintPage() {
  const links = [
    { link: '/', title: 'Главная' },
    { link: '/cp/company', title: 'Панель управления' },
    { link: '/cp/company/bills', title: 'Счета компании' },
    { link: '#', title: 'Счет', isActive: true },
  ];

  const { nowLoading, bill } = useFetchBillToPrintPage();

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
            {nowLoading ? (
              <>Загрузка...</>
            ) : bill ? (
              <div className={styles.bill}>
                <h2
                  className={['title is-size-6', styles.billPartTitle].join(
                    ' '
                  )}
                >
                  Получатель
                </h2>
                <div className={['columns', styles.billRequisites].join(' ')}>
                  <ul>
                    <li>ООО «ЙОЛК»</li>
                    <li>ИНН: 2502079255 КПП 250201001</li>
                    <li>ОГРН: 1242500028770</li>
                    <li>Банк: Дальневосточный банк Сбербанк (ПАО)</li>
                  </ul>
                  <ul>
                    <li>БИК: 040813608</li>
                    <li>р/с № 40702810250000047899</li>
                    <li>к/с № 30101810600000000608</li>
                  </ul>
                  <ul>
                    <li>E-mail: yolk.ru@yandex.ru</li>
                    <li>Тел. сот.: +7 964 430-77-00</li>
                    <li>Генеральный директор </li>
                    <li>Масенкова Д.В.</li>
                  </ul>
                </div>
                <div className="title-wrapper columns">
                  <h1
                    className={[
                      styles.billTitle,
                      'title',
                      'is-size-4',
                      'is-size-5-mobile',
                    ].join(' ')}
                  >
                    СЧЕТ НА ОПЛАТУ № {bill.id}
                  </h1>
                  <p
                    className={[styles.billTitle, 'title', 'is-size-5'].join(
                      ' '
                    )}
                  >
                    от {formatDate(bill.updatedAt)}
                  </p>
                </div>
                <div className={['columns', styles.billRow].join(' ')}>
                  <h2
                    className={['title is-size-6', styles.billPartTitle].join(
                      ' '
                    )}
                  >
                    ПОСТАВЩИК (ИСПОЛНИТЕЛЬ)
                  </h2>
                  <h2>{bill?.order?.contractor?.name ?? ''}</h2>
                </div>
                <div className={['columns', styles.billRow].join(' ')}>
                  <h2
                    className={['title is-size-6', styles.billPartTitle].join(
                      ' '
                    )}
                  >
                    ПОКУПАТЕЛЬ (ЗАКАЗЧИК)
                  </h2>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: `${bill.receiver.userCompany.details.fullName},<br>
                   ИНН ${bill.receiver.userCompany.details.codeINN}, 
                    КПП ${bill.receiver.userCompany.details.codeKPP}, 
                     ${bill.receiver.userCompany.details.legalType === 'ООО' ? 'ОГРН' : 'ОГРНИП'} ${bill.receiver.userCompany.details.codeOGRN}<br>
                     Адрес ${bill.receiver.userCompany.details.fullAddress}`,
                    }}
                  />
                </div>
                <div className={['columns', styles.billRow].join(' ')}>
                  <h2
                    className={['title is-size-6', styles.billPartTitle].join(
                      ' '
                    )}
                  >
                    КОММЕНТАРИЙ
                  </h2>
                  <h2
                    className={['title is-size-6', styles.billPartTitle].join(
                      ' '
                    )}
                  >
                    Счет выставлен на оплату Заказа № {bill?.order?.id ?? ''}
                  </h2>
                </div>
                <div className={styles.billTableWrapper}>
                  <table border={1} className={styles.billTable}>
                    <thead>
                      <tr>
                        <th rowSpan={2}>№</th>
                        <th rowSpan={2}>Товары (работы/услуги)</th>
                        <th rowSpan={2}>Кол-во</th>
                        <th rowSpan={2}>Ед.</th>
                        <th rowSpan={2}>Цена, ₽</th>
                        <th colSpan={2}>НДС</th>
                        <th rowSpan={2}>Сумма, ₽</th>
                      </tr>
                      <tr>
                        <th>Ставка, %</th>
                        <th>Сумма, ₽</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>{bill.order.title}</td>
                        <td>1</td>
                        <td>1</td>
                        <td>{bill.order.price.toLocaleString()}</td>
                        <td>без НДС</td>
                        <td>0</td>
                        <td>{bill.order.price.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <hr className={styles.billDelimiter} />
                <div className={styles.billTotal}>
                  <div className="columns">
                    <h2
                      className={['title is-size-6', styles.billPartTitle].join(
                        ' '
                      )}
                    >
                      Итого:
                    </h2>
                    <h2
                      className={['title is-size-6', styles.billPartTitle].join(
                        ' '
                      )}
                    >
                      {bill.order.price.toLocaleString()}
                    </h2>
                  </div>
                  <div className="columns">
                    <h2
                      className={['title is-size-6', styles.billPartTitle].join(
                        ' '
                      )}
                    >
                      НДС:
                    </h2>
                    <p className={'is-size-6'}>не облагается</p>
                  </div>
                  <div className="columns">
                    <h2
                      className={['title is-size-6', styles.billPartTitle].join(
                        ' '
                      )}
                    >
                      Всего к оплате:
                    </h2>
                    <h2
                      className={['title is-size-6', styles.billPartTitle].join(
                        ' '
                      )}
                    >
                      {bill.order.price.toLocaleString()}
                    </h2>
                  </div>
                </div>
              </div>
            ) : (
              <>Счет не найден</>
            )}
          </article>
        </div>
      </section>
    </>
  );
}
