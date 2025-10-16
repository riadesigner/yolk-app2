import {
  AboutPage,
  AuthCallbackPage,
  ChatListPage,
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
  PortfolioItemPage,
  PortfolioPage,
  UserAgreePage,
  StartUpPage,
} from './pages';

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
  DesignerOrdersPage,
  OrderEditPage,
  OrderNewPage,
  RoleSelectionPage,
  AdminBillsPage,
  AdminBillToPrintPage,
} from './pages/private';
import Entry from './Entry.jsx';

const routes = [
  {
    element: <Entry />,
    errorElement: <ErrorPage />, // Обработка ошибок маршрутизации
    children: [
      { index: true, Component: HomePage }, // Главная страница
      { path: 'about', Component: AboutPage }, // /about
      { path: 'login', Component: LoginPage }, // /вход
      { path: 'faq', Component: FAQPage },
      { path: 'startup', Component: StartUpPage },
      { path: 'useragree', Component: UserAgreePage },
      {
        path: 'designers',
        children: [
          { index: true, Component: DesignersPage },
          {
            path: ':designerId',
            children: [
              {
                index: true,
                Component: DesignerInfoPublicPage,
              },
              {
                path: 'portfolio',
                children: [
                  {
                    index: true,
                    Component: PortfolioPage,
                  },
                  {
                    path: ':portfolioId',
                    Component: PortfolioItemPage,
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        path: 'companies',
        children: [
          { index: true, Component: CompaniesListPage },
          { path: ':companyId', Component: CompanyPublicPage },
        ],
      }, //
      //
      { path: 'chats/:chatId', Component: ChatPage }, //
      { path: 'role-selection', Component: RoleSelectionPage }, //

      { path: 'auth-callback', Component: AuthCallbackPage },
      {
        path: 'orders',
        children: [
          { index: true, Component: OrdersPage },
          { path: 'search/:userInput', Component: OrdersPage }, //
          { path: 'cat/:categoryId', Component: OrdersPage }, // заказы из определенной категории
          { path: ':id', Component: OrderPage },
        ],
      }, //

      // private pages
      {
        path: 'cp',
        children: [
          {
            path: 'designer',
            children: [
              { index: true, Component: DesignerAdminPage }, // /личный кабинет дизайнера
              {
                path: 'notifs',
                Component: DesignerAdminNotifsPage,
              }, // /все сообщения дизайнеру
              {
                path: 'info',
                children: [
                  {
                    index: true,
                    Component: DesignerInfoPage,
                  },
                  {
                    path: 'edit',
                    Component: DesignerInfoEditPage,
                  },
                ],
              },
              {
                path: 'portfolio',
                children: [
                  { index: true, Component: DesignerPortfolioPage },
                  {
                    path: ':portfolioId/edit',
                    Component: DesignerPortfolioEditPage,
                  }, // /редактирование портфолио дизайнера
                  {
                    path: 'add',
                    Component: DesignerPortfolioAddPage,
                  }, // /добавление проекта в портфолио дизайнера
                ],
              },
              {
                path: 'orders',
                Component: DesignerOrdersPage,
              }, // /портфолио дизайнера
            ],
          },
          {
            path: 'chats',
            Component: ChatListPage,
          },
          {
            path: 'company',
            children: [
              { index: true, Component: CompanyAdminPage }, // /личный кабинет компании
              {
                path: 'notifs',
                Component: CompanyAdminNotifsPage,
              }, // /все сообщения компании
              {
                path: 'info',
                children: [
                  {
                    index: true,
                    Component: CompanyInfoPage,
                  },
                  {
                    path: 'edit',
                    Component: CompanyInfoEditPage,
                  }, // /редактирование общей информации о компании
                ],
              }, // /общая информация о компании

              {
                path: 'card',
                children: [
                  {
                    index: true,
                    Component: CompanyCardPage, // /карточка компании (реквизиты)
                  },
                  {
                    path: 'edit',
                    Component: CompanyCardEditPage,
                  }, // /редактирование карточки компании
                ],
              },
              // /счет компании
              {
                path: 'bills',
                children: [
                  {
                    index: true,
                    Component: CompanyBillsPage,
                  },
                  {
                    path: ':billId',
                    Component: CompanyBillToPrintPage,
                  },
                ],
              }, // /счета компании
              {
                path: 'set-contractor/:contractorId/order/:orderId',
                Component: CompanySetContractorPage,
              }, // /назначение исполнителя для Заказа

              {
                path: ':companyId',
                children: [
                  {
                    path: 'order-new',
                    Component: OrderNewPage,
                  }, // /добавление заказа
                  {
                    path: 'order-edit/:orderId',
                    Component: OrderEditPage,
                  }, // /редактирование заказа
                ],
              },
            ],
          },
          {
            path: 'yolk-admin',
            children: [
              { index: true, Component: AdminPage }, // /личный кабинет администратора
              { path: 'notifs', Component: AdminNotifsPage }, // /все сообщения администратору
              { path: 'info', Component: AdminInfoPage }, // /сводная таблица (актуальные данные о проекте)
              { path: 'orders', Component: AdminOrdersPage }, // /данные о состоянии всех заказов на сайте
              {
                path: 'bills',
                children: [
                  {
                    index: true,
                    Component: AdminBillsPage,
                  },
                  {
                    path: ':billId',
                    Component: AdminBillToPrintPage,
                  },
                ],
              }, // /данные о состоянии всех заказов на сайте
              {
                path: 'companies',
                Component: AdminCompaniesPage,
              }, // /сводная таблица о компаниях на сайте
              {
                path: 'designers',
                Component: AdminDesignersPage,
              }, // /сводная таблица о дизайнерах на сайте
            ],
          },
        ],
      },

      // Ленивая загрузка (опционально)
      // {
      //   path: 'dashboard',
      //   lazy: () => import('./pages/Dashboard')
      // }
    ],
  },
];

export default routes;
