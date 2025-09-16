
const NotificationsModel = require('./notifications.model');
const UsersService = require('../users/users.service');
const BillsService = require('../bills/bills.service')
const AppError = require('../middleware/AppError');
const paginate = require('../utils/paginate')
const formatDateTime = require('../utils/dateUtilits')

exports.findByUserId = async function (userId, opt={}) {    
    try{ 

      const limit = opt && opt.limit || 100;
      const page = opt && opt.page || 1;

      const query = {receiver:userId};
      const sort = { createdAt: -1 };
        
      const result = await paginate(NotificationsModel, query, {
          page: page,
          limit: limit,
          sort: sort,
      }); 

      return result;

    }catch(err){
      throw new AppError(err, 500);
    }
} 

exports.sendAboutNewRespond = function ({designerId, orderId, customerId}) {  
    return new Promise(async (res,rej)=>{ 
      try{ 

          const designer = await UsersService.findById(designerId);
          
          // сообщение заказчику
          const notifToCompany = {
              title: `Дизайнер ${designer.name} откликнулся на заказ ${orderId}`,
              readAt: '',            
              links: [
                  {
                      name: 'утвердить как исполнителя',
                      url: `/cp/company/set-contractor/${designerId}/order/${orderId}`,                      
                      bright: true
                  },
                  {
                      name: 'Заказ',
                      url: `/orders/${orderId}`
                  },
                  {
                      name: 'Дизайнер',
                      url: `/designers/${designerId}`
                  }
              ],
              receiver: `${customerId}` //  заказчик
          }        
          // сообщение дизайнеру
          const notifToDesigner = {
              title: `${designer.name}, вы откликнулись на заказ ${orderId}`,
              readAt: '',
              links: [
                  {
                      name: 'Заказ',
                      url: `/orders/${orderId}`
                  },
              ],
              receiver: `${designerId}` 
          }

          const newNotifsToCompany = await NotificationsModel.create(notifToCompany)
          const newNotifsToDesigner = await NotificationsModel.create(notifToDesigner)          
          
          if(!newNotifsToCompany || !newNotifsToDesigner) { 
            res(false) 
          }else{
            res(true);
          }

      }catch(e){
        console.log(`cant send notification, err:${e}`);
        res(false);
      }        
    })    
} 

exports.sendAboutCheckTheBill = async function ({customerId, contractorId, orderId, billId}) {  

  try{

      const chatId = '1';
      const customer = await UsersService.findById(customerId); // заказчик
      const contractor = await UsersService.findById(contractorId); // исполнитель        
      const theBill = await BillsService.findById(billId); // счет        
      // const date = formatDateTime(theBill.createdAt);
      const date = theBill.createdAt;

      // сообщение заказчику о создании счета для перевода Авансового платежа по Заказу
      const notifToCustomer_1 = {
          title: [
            `Создан Счет № ${theBill.key} от ${date} для перевода авансового платежа по Заказу ${orderId}. `,
            `Проведите платеж, чтобы Дизайнер смог начать работу. `,
          ].join(''),
          readAt: '',
          links: [
              {
                  name: `Счет № ${theBill.key}`,
                  url: `/cp/company/bills/${billId}`,
                  bright: true,
                  
              },    
          ],
          receiver: `${customer.id}`
      }   

      const newNotifsToCompany_1 = await NotificationsModel.create(notifToCustomer_1)
      return !newNotifsToCompany_1 ? false : true;

  }catch(err){
    throw new AppError(err, 500);
  }
}

exports.sendAboutNewContractor = function ({customerId, contractorId, orderId}) {  
    return new Promise(async (res,rej)=>{ 
      try{ 

          const customer = await UsersService.findById(customerId); // заказчик
          const contractor = await UsersService.findById(contractorId); // исполнитель

          // сообщение заказчику
          const notifToCustomer = {
              title: [
                `${customer.name}, вы назначили Исполнителя для заказа ${orderId} \n`,
                `Теперь Вам доступен Чат с Дизайнером, где вы можете обсудить детали Заказа.`
              ].join(''),
              readAt: '',
              links: [
                  {
                      name: 'Заказ',
                      url: `/orders/${orderId}`
                  },
                  {
                      name: 'Исполнитель',
                      url: `/designers/${contractorId}`
                  },
                  {
                      name: 'Чат с исполнителем',
                      url: `/chats/${orderId}`,
                      bright: true,
                  },    
              ],
              receiver: `${customer.id}`
          }        
          // сообщение исполнителю
          const notifToContractor = {
              title: [
                `${contractor.name}, вам подтвердили запрос на выполнение заказа ${orderId}. `,
                `Вы назначены Исполнителем. `,
                `Дожитесь, когда Заказчик переведет Предоплату на Счет Заказа `,
                `Вам доступен Чат для общения с Заказчиком `,
              ].join(''),
              readAt: '',
              links: [
                  {
                      name: 'Заказ',
                      url: `/orders/${orderId}`
                  },
                  {
                      name: 'Чат с Заказчиком',
                      url: `/chats/${orderId}`,
                      bright: true
                  },
              ],
              receiver: `${contractor.id}`
          }

          const newNotifToCustomer = await NotificationsModel.create(notifToCustomer)
          const newNotifToContractor = await NotificationsModel.create(notifToContractor)          
          
          if(!newNotifToCustomer || !newNotifToContractor) { 
            res(false) 
          }else{
            res(true);
          }

      }catch(e){
        console.log(`cant send notification, err:${e}`);
        res(false);
      }        
    })    
} 

// Найти все непрочитанные уведомления
// const unreadNotifications = await Notifications.find({ readAt: null });

// Найти все прочитанные уведомления
// const readNotifications = await Notifications.find({ readAt: { $ne: null } });

// Пометить как прочитанное
// await Notifications.findByIdAndUpdate(id, { readAt: new Date() });