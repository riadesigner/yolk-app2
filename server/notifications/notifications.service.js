
const NotificationsModel = require('./notifications.model');

exports.findByUserId = function (userId) {  
    return new Promise(async (res,rej)=>{ 
      try{ 
        const notifs = await NotificationsModel
          .find({receiver:userId})
          .sort({ createdAt: -1 })
          .limit(10)
        res(notifs);
      }catch(e){
        console.log(`notifs not found, err:${e}`);
        res([]);
      }        
    })    
} 


// Найти все непрочитанные уведомления
// const unreadNotifications = await Notifications.find({ readAt: null });

// Найти все прочитанные уведомления
// const readNotifications = await Notifications.find({ readAt: { $ne: null } });

// Пометить как прочитанное
// await Notifications.findByIdAndUpdate(id, { readAt: new Date() });