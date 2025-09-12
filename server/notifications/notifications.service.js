
const NotificationsModel = require('./notifications.model');
const UsersService = require('../users/users.service');
const OrdersService = require('../orders/orders.service');


exports.findByUserId = function (userId) {  
    return new Promise(async (res,rej)=>{ 
      try{ 
        const notifs = await NotificationsModel
          .find({receiver:userId})
          .sort({ createdAt: -1 })
          .limit(10)

          console.log('notifs', notifs)
        res(notifs);
      }catch(e){
        console.log(`notifs not found, err:${e}`);
        res([]);
      }        
    })    
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
                      name: 'заказ',
                      url: `/orders/${orderId}`
                  },
                  {
                      name: 'дизайнер',
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
                      name: 'заказ',
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
exports.sendAboutCheckTheBill = async function ({customerId, contractorId, orderId}) {  
  const customer = await UsersService.findById(customerId); // заказчик
  const contractor = await UsersService.findById(contractorId); // исполнитель  
  const order = await OrdersService.findById(orderId); // заказ
  

  return true;
}

exports.sendAboutNewContractor = function ({customerId, contractorId, orderId}) {  
    return new Promise(async (res,rej)=>{ 
      try{ 

          const customer = await UsersService.findById(customerId); // заказчик
          const contractor = await UsersService.findById(contractorId); // исполнитель

          // сообщение заказчику
          const notifToCustomer = {
              title: [
                `${customer.name}, вы назначили Исполнителя для заказа ${orderId} `,
                `Переведите на Счет Закза предоплату, чтобы Дизайнер смог начать работу. `,
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
                      url: `/designers/${userId}`
                  },
                  {
                      name: 'Чат с исполнителем',
                      url: `/chats/${orderId}`
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
                      name: 'заказ',
                      url: `/orders/${orderId}`
                  },
                  {
                      name: 'чат с Заказчиком',
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