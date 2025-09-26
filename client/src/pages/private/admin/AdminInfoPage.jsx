import Breadcrumb from '../../../components/Breadcrumb.jsx';
// import CompanyGallery from '../../components/CompanyGallery';
// import CompanyAboutHeader from '../../components/CompanyAboutHeader';
// import CompanyAboutOrders from '../../components/CompanyAboutOrders';
// import TextWithBreaks from '../../components/TextWithBreaks';

export default function CompanyInfoPage() {
  // const navigate = useNavigate();
  // const [company, setCompany] = useState(null);
  // const [gallery, setGallery] = useState(null);

  const links = [
    { link: '/', title: 'Главная' },
    { link: '/cp/yolk-admin', title: 'Панель управления' },
    { link: '#', title: 'Сводная таблица', isActive: true },
  ];

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     // try {
  //     //     const response = await api.get('/users/me');
  //     //     console.log('response', response);
  //     //     if(response.data.success){
  //     //         const user = response.data.user;
  //     //         const company = user.userCompany;
  //     //         console.log('user', user);
  //     //         if(company){
  //     //             setCompany(company);
  //     //             setGallery(company.gallery)
  //     //         }
  //     //     }
  //     // } catch (err) {
  //     //     console.error('Ошибка загрузки анкеты', err);
  //     //     // navigate('/login');
  //     //     navigate('/');
  //     // }
  //   };
  //
  //   // fetchUser();
  // }, []);

  return (
    <>
      <section className="container is-max-desktop desktop-only">
        <div className="section">
          <Breadcrumb links={links} />
        </div>
      </section>
      <article>
        <section className="container">
          <div className="section">
            <h2>Сводная таблица</h2>
            <p>Страница в разработке</p>
          </div>
        </section>
      </article>
    </>
  );
}
