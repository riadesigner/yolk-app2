
const NotificationsModel = require('./notifications.model');
const UsersService = require('../users/users.service');
const CompanyService = require('../company/company.service');


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

exports.sendAboutNewRespond = function (userId, orderId, companyId) {  
    return new Promise(async (res,rej)=>{ 
      try{ 

          const user = await UsersService.findById(userId); // designer
          const company = await CompanyService.findById(companyId);

          // сообщение заказчику
          const notifToCompany = {
              title: `Дизайнер ${user.name} откликнулся на заказ ${orderId}`,
              readAt: '',            
              links: [
                  {
                      name: 'утвердить как исполнителя',
                      url: `/orders/new-contractor/${userId}`,
                      bright: true
                  },
                  {
                      name: 'заказ',
                      url: `/orders/${orderId}`
                  },
                  {
                      name: 'дизайнер',
                      url: `/designers/${userId}`
                  }
              ],
              receiver: `${company.userId}` //  заказчик
          }        
          // сообщение дизайнеру
          const notifToDesigner = {
              title: `${user.name}, вы откликнулись на заказ ${orderId}`,
              readAt: '',
              links: [
                  {
                      name: 'заказ',
                      url: `/orders/${orderId}`
                  },
              ],
              receiver: `${userId}` // дизайнер
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


// Найти все непрочитанные уведомления
// const unreadNotifications = await Notifications.find({ readAt: null });

// Найти все прочитанные уведомления
// const readNotifications = await Notifications.find({ readAt: { $ne: null } });

// Пометить как прочитанное
// await Notifications.findByIdAndUpdate(id, { readAt: new Date() });