import styles from './BillToPrint.module.css';
import { formatDate } from '../../utils/dateUtilits.jsx';
import PropTypes from 'prop-types';

const YolkRequisites = () => (
  <>
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
  </>
);

const BillToPrint = ({ bill }) => {
  const platformCommission = +import.meta.env.VITE_PLATFORM_COMMISSION;
  const billPrice = (
    bill?.amount ??
    (bill.direction === 'TO_YOLK'
      ? (bill?.order?.price ?? 0) * (1 - platformCommission / 100)
      : (bill?.order?.price ?? 0))
  ).toLocaleString();

  return (
    <div className={styles.bill}>
      <h2 className={['title is-size-6', styles.billPartTitle].join(' ')}>
        Получатель
      </h2>
      <div className={['columns', styles.billRequisites].join(' ')}>
        {bill.direction === 'FROM_YOLK' ? (
          <YolkRequisites />
        ) : (
          <p>{bill.order.contractor.userInfo.requisites}</p>
        )}
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
        <p className={[styles.billTitle, 'title', 'is-size-5'].join(' ')}>
          от {formatDate(bill.updatedAt)}
        </p>
      </div>
      <div className={['columns', styles.billRow].join(' ')}>
        <h2 className={['title is-size-6', styles.billPartTitle].join(' ')}>
          ПОСТАВЩИК (ИСПОЛНИТЕЛЬ)
        </h2>
        <h2>{bill?.order?.contractor?.name ?? ''}</h2>
      </div>
      <div
        className={[
          bill.direction === 'FROM_YOLK' ? 'columns' : '',
          styles.billRow,
          styles.billRequisites,
        ].join(' ')}
      >
        <h2 className={['title is-size-6', styles.billPartTitle].join(' ')}>
          ПОКУПАТЕЛЬ (ЗАКАЗЧИК)
        </h2>
        {bill.direction === 'FROM_YOLK' ? (
          <p
            dangerouslySetInnerHTML={{
              __html: `${bill.receiver.userCompany.details.fullName},<br>
                   ИНН ${bill.receiver.userCompany.details.codeINN}, 
                    КПП ${bill.receiver.userCompany.details.codeKPP}, 
                     ${bill.receiver.userCompany.details.legalType === 'ООО' ? 'ОГРН' : 'ОГРНИП'} ${bill.receiver.userCompany.details.codeOGRN}<br>
                     Адрес ${bill.receiver.userCompany.details.fullAddress}`,
            }}
          />
        ) : (
          <div className={'columns'}>
            <YolkRequisites />
          </div>
        )}
      </div>
      <div className={['columns', styles.billRow].join(' ')}>
        <h2 className={['title is-size-6', styles.billPartTitle].join(' ')}>
          КОММЕНТАРИЙ
        </h2>
        <h2 className={['title is-size-6', styles.billPartTitle].join(' ')}>
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
              <td>{billPrice}</td>
              <td>без НДС</td>
              <td>0</td>
              <td>{billPrice}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr className={styles.billDelimiter} />
      <div className={styles.billTotal}>
        <div className="columns">
          <h2 className={['title is-size-6', styles.billPartTitle].join(' ')}>
            Итого:
          </h2>
          <h2 className={['title is-size-6', styles.billPartTitle].join(' ')}>
            {billPrice}
          </h2>
        </div>
        <div className="columns">
          <h2 className={['title is-size-6', styles.billPartTitle].join(' ')}>
            НДС:
          </h2>
          <p className={'is-size-6'}>не облагается</p>
        </div>
        <div className="columns">
          <h2 className={['title is-size-6', styles.billPartTitle].join(' ')}>
            Всего к оплате:
          </h2>
          <h2 className={['title is-size-6', styles.billPartTitle].join(' ')}>
            {billPrice}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default BillToPrint;

BillToPrint.propTypes = {
  bill: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    direction: PropTypes.oneOf(['TO_YOLK', 'FROM_YOLK']).isRequired,
    updatedAt: PropTypes.string.isRequired,
    paid: PropTypes.bool,
    amount: PropTypes.number.isRequired,
    receiver: PropTypes.shape({
      userCompany: PropTypes.shape({
        details: PropTypes.shape({
          fullName: PropTypes.string.isRequired,
          codeINN: PropTypes.string.isRequired,
          codeKPP: PropTypes.string.isRequired,
          legalType: PropTypes.string.isRequired,
          codeOGRN: PropTypes.string.isRequired,
          fullAddress: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }),
    order: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string.isRequired,
      price: PropTypes.number,
      contractor: PropTypes.shape({
        name: PropTypes.string,
        userInfo: PropTypes.shape({
          requisites: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,
};
