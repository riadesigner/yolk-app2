import {
  AboutPage,
  AuthCallbackPage,
  ChatPage,
  CompaniesListPage,
  CompanyPublicPage,
  DesignerInfoPublicPage,
  DesignersPage,
  ErrorPage,
  FAQPage,
  HomePage,
  LoginPage,
  OrderPage,
  OrdersPage,
  PortfolioPage,
  PrivacyPage,
  StartUpPage,
} from './pages/index.js';

// --------------------
//    PRIVATE PAGES
// --------------------
import {
  AdminCompaniesPage,
  AdminDesignersPage,
  AdminInfoPage,
  AdminNotifsPage,
  AdminOrdersPage,
  AdminPage,
  CompanyAdminNotifsPage,
  CompanyAdminPage,
  CompanyBillsPage,
  CompanyBillToPrintPage,
  CompanyCardEditPage,
  CompanyCardPage,
  CompanyInfoEditPage,
  CompanyInfoPage,
  CompanySetContractorPage,
  DesignerAdminNotifsPage,
  DesignerAdminPage,
  DesignerInfoEditPage,
  DesignerInfoPage,
  DesignerPortfolioAddPage,
  DesignerPortfolioEditPage,
  DesignerPortfolioPage,
  OrderEditPage,
  OrderNewPage,
  RoleSelectionPage,
} from './pages/private/index.js';
import Entry from './Entry.jsx';

const routes = [
  {
    path: '/',
    element: <Entry />,
    errorElement: <ErrorPage />, // Обработка ошибок маршрутизации
    children: [
      { index: true, element: <HomePage /> }, // Главная страница
      { path: 'about', element: <AboutPage /> }, // /about
      { path: 'login', element: <LoginPage /> }, // /вход
      { path: 'faq', element: <FAQPage /> },
      { path: 'startup', element: <StartUpPage /> },
      { path: 'useragree', element: <PrivacyPage /> },
      {
        path: 'designers',
        children: [
          { index: true, element: <DesignersPage /> },
          {
            path: ':designerId/portfolio',
            element: <PortfolioPage />,
          },
          {
            path: ':designerId',
            element: <DesignerInfoPublicPage />,
          },
        ],
      },

      {
        path: 'companies',
        children: [
          { index: true, element: <CompaniesListPage /> },
          { path: ':companyId', element: <CompanyPublicPage /> },
        ],
      }, //
      //
      { path: 'chats/:chatId', element: <ChatPage /> }, //
      { path: 'role-selection', element: <RoleSelectionPage /> }, //

      { path: 'auth-callback', element: <AuthCallbackPage /> },
      {
        path: 'orders',
        children: [
          { index: true, element: <OrdersPage /> },
          { path: 'search/:userInput', element: <OrdersPage /> }, //
          { path: 'cat/:categoryId', element: <OrdersPage /> }, // заказы из определенной категории
          { path: ':id', element: <OrderPage /> },
        ],
      }, //

      // private pages

      { path: 'cp/designer', element: <DesignerAdminPage /> }, // /личный кабинет дизайнера
      { path: 'cp/designer/notifs', element: <DesignerAdminNotifsPage /> }, // /все сообщения дизайнеру
      { path: 'cp/designer/info', element: <DesignerInfoPage /> }, // /анкета дизайнера
      { path: 'cp/designer/info/edit', element: <DesignerInfoEditPage /> }, // /редактирование анкеты дизайнера
      {
        path: 'cp/designer/portfolio/:portfolioId/edit',
        element: <DesignerPortfolioEditPage />,
      }, // /редактирование портфолио дизайнера
      {
        path: 'cp/designer/portfolio/add',
        element: <DesignerPortfolioAddPage />,
      }, // /добавление проекта в портфолио дизайнера
      { path: 'cp/designer/portfolio', element: <DesignerPortfolioPage /> }, // /портфолио дизайнера

      { path: 'cp/company', element: <CompanyAdminPage /> }, // /личный кабинет компании
      { path: 'cp/company/notifs', element: <CompanyAdminNotifsPage /> }, // /все сообщения компании
      { path: 'cp/company/info', element: <CompanyInfoPage /> }, // /общая информация о компании
      { path: 'cp/company/info/edit', element: <CompanyInfoEditPage /> }, // /редактирование общей информации о компании
      { path: 'cp/company/card', element: <CompanyCardPage /> }, // /карточка компании (реквизиты)
      { path: 'cp/company/card/edit', element: <CompanyCardEditPage /> }, // /редактирование карточки компании
      {
        path: 'cp/company/bills/:billId',
        element: <CompanyBillToPrintPage />,
      }, // /счет компании
      { path: 'cp/company/bills', element: <CompanyBillsPage /> }, // /счета компании
      {
        path: 'cp/company/set-contractor/:contractorId/order/:orderId',
        element: <CompanySetContractorPage />,
      }, // /назначение исполнителя для Заказа

      { path: 'cp/company/:companyId/order-new', element: <OrderNewPage /> }, // /добавление заказа
      {
        path: 'cp/company/:companyId/order-edit/:orderId',
        element: <OrderEditPage />,
      }, // /редактирование заказа

      { path: 'cp/yolk-admin', element: <AdminPage /> }, // /личный кабинет администратора
      { path: 'cp/yolk-admin/notifs', element: <AdminNotifsPage /> }, // /все сообщения администратору
      { path: 'cp/yolk-admin/info', element: <AdminInfoPage /> }, // /сводная таблица (актуальные данные о проекте)
      { path: 'cp/yolk-admin/orders', element: <AdminOrdersPage /> }, // /данные о состоянии всех заказов на сайте
      { path: 'cp/yolk-admin/companies', element: <AdminCompaniesPage /> }, // /сводная таблица о компаниях на сайте
      { path: 'cp/yolk-admin/designers', element: <AdminDesignersPage /> }, // /сводная таблица о дизайнерах на сайте

      // Ленивая загрузка (опционально)
      // {
      //   path: 'dashboard',
      //   lazy: () => import('./pages/Dashboard')
      // }
    ],
  },
];

export default routes;
