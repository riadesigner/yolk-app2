import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx'

import Home from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import StartUpPage from './pages/StartUpPage.jsx'
import FAQPage from './pages/FAQPage.jsx'
import UserAgreePage from './pages/UserAgreePage.jsx'
import DesignerInfoPublicPage from './pages/DesignerInfoPublicPage.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import OrderPage from './pages/OrderPage.jsx'
import PortfolioPage from './pages/PortfolioPage.jsx';
import CompanyPublicPage from './pages/CompanyPublicPage.jsx';
import DesignersPage from './pages/DesignersPage.jsx';
import CompaniesPage from './pages/CompaniesPage.jsx';
import ChatPage from './pages/ChatPage.jsx';

import AuthCallback from './pages/AuthCallback.jsx';
import RoleSelectionPage from './pages/private/RoleSelectionPage.jsx';
import DesignerAdminPage from './pages/private/DesignerAdminPage.jsx'
import DesignerInfoPage from './pages/private/DesignerInfoPage.jsx'
import DesignerInfoEditPage from './pages/private/DesignerInfoEditPage.jsx'
import CompanyAdminPage from './pages/private/CompanyAdminPage.jsx'
import CompanySetContractorPage from './pages/private/CompanySetContractorPage.jsx'
import CompanyInfoPage from './pages/private/CompanyInfoPage.jsx'
import CompanyInfoEditPage from './pages/private/CompanyInfoEditPage.jsx'
import CompanyCardPage from './pages/private/CompanyCardPage.jsx'
import CompanyCardEditPage from './pages/private/CompanyCardEditPage.jsx'
import OrderEditPage from './pages/private/OrderEditPage.jsx'
import OrderNewPage from './pages/private/OrderNewPage.jsx'

import AdminPage from './pages/private/AdminPage.jsx'
import AdminInfoPage from './pages/private/AdminInfoPage.jsx'
import AdminOrdersPage from './pages/private/AdminOrdersPage.jsx'
import AdminCompaniesPage from './pages/private/AdminCompaniesPage.jsx'
import AdminDesignersPage from './pages/private/AdminDesignersPage.jsx'

import { AuthProvider } from './providers/AuthProvider.jsx';

import ErrorPage from './pages/ErrorPage.jsx'

// Создаем роутер с включенным флагом будущего v7
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />, // Обработка ошибок маршрутизации
    children: [
      { index: true, element: <Home /> },         // Главная страница
      { path: 'about', element: <AboutPage /> },     // /about
      { path: 'login', element: <LoginPage /> }, // /вход
      { path: 'faq', element: <FAQPage /> }, // 
      { path: 'startup', element: <StartUpPage /> }, // 
      { path: 'useragree', element: <UserAgreePage /> }, // 
      { path: 'designers', element: <DesignersPage /> }, // 
      { path: 'designers/:designerId/portfolio', element: <PortfolioPage /> }, //       
      { path: 'designers/:designerId', element: <DesignerInfoPublicPage /> }, // 
      { path: 'companies/:companyId', element: <CompanyPublicPage /> }, // 
      { path: 'companies', element: <CompaniesPage /> }, // 
      { path: 'chats/123', element: <ChatPage /> }, //       
      { path: 'role-selection', element: <RoleSelectionPage /> }, //       

      { path: 'auth-callback', element: <AuthCallback /> }, //             

      { path: 'orders', element: <OrdersPage /> }, // 
      { path: 'orders/:id', element: <OrderPage /> }, //       
      { path: 'orders/search/:userInput', element: <OrdersPage /> }, //       

      // private pages      

      { path: 'cp/designer', element: <DesignerAdminPage /> }, // /личный кабинет менеджера
      { path: 'cp/designer/info', element: <DesignerInfoPage /> }, // /анкета дизайнера      
      { path: 'cp/designer/info/edit', element: <DesignerInfoEditPage /> }, // /редактирование анкеты дизайнера      

      { path: 'cp/company', element: <CompanyAdminPage /> }, // /личный кабинет компании
      { path: 'cp/company/info', element: <CompanyInfoPage /> }, // /общая информация о компании      
      { path: 'cp/company/info/edit', element: <CompanyInfoEditPage /> }, // /редактирование общей информации о компании      
      { path: 'cp/company/card', element: <CompanyCardPage /> }, // /карточка компании (реквизиты)      
      { path: 'cp/company/card/edit', element: <CompanyCardEditPage /> }, // /редактирование карточки компании 
      { path: 'cp/company/set-contractor/:contractorId/order/:orderId', element: <CompanySetContractorPage /> }, // /назначение исполнителя для Заказа      
            
      { path: 'cp/company/:companyId/order-new', element: <OrderNewPage /> }, // /добавление заказа       
      { path: 'cp/company/:companyId/order-edit/:orderId', element: <OrderEditPage /> }, // /редактирование заказа

      { path: 'cp/yolk-admin', element: <AdminPage /> }, // /личный кабинет администратора
      { path: 'cp/yolk-admin/info', element: <AdminInfoPage /> }, // /сводная таблица (актуальные данные о проекте)      
      { path: 'cp/yolk-admin/orders', element: <AdminOrdersPage /> }, // /данные о состоянии всех заказов на сайте      
      { path: 'cp/yolk-admin/companies', element: <AdminCompaniesPage /> }, // /сводная таблица о компаниях на сайте      
      { path: 'cp/yolk-admin/designers', element: <AdminDesignersPage /> }, // /сводная таблица о дизайнерах на сайте
      

      // Ленивая загрузка (опционально)
      // { 
      //   path: 'dashboard', 
      //   lazy: () => import('./pages/Dashboard') 
      // }
    ]
  }
], {
  future: {
    v7_startTransition: true, // Включаем флаг для v7
    // v7_fetcherPersist: true, // Дополнительный флаг для персистентности
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
