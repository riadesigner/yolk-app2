
const OrdersModel = require('./orders.model');

exports.create = function (companyId, orderCreateDto = {}) {  
    return new Promise(async (res,rej)=>{ 
      try{
        res(await OrdersModel.create(orderCreateDto));
      }catch(e){
        console.log(`cant create new userinfo, err:${e}`)
        res(null);
      }        
    })    
}  

exports.update = function (id, orderUpdateDto = {}) {  
    return new Promise(async (res,rej)=>{             

      try{        
        const updatedOrder = await OrdersModel.findByIdAndUpdate(
            id,
            orderUpdateDto,
            { new: true }
        );
        res(updatedOrder);
      }catch(e){
        console.log(`cant update order, err:${e}`)
        res(null);
      } 
    })    
}  

