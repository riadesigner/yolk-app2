
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

exports.find = function (opt = {}) {  
    return new Promise(async (res,rej)=>{ 
      try{
        res(await OrdersModel.find(opt));
      }catch(e){
        console.log(`not found orders for company ${opt.companyId}, err:${e}`)
        res(null);
      }        
    })    
}  

exports.findById = function (id) {  
    return new Promise(async (res,rej)=>{ 
      try{
        res(await OrdersModel.findById(id));
      }catch(e){
        console.log(`not found order ${id}, err:${e}`)
        res(null);
      }
    })    
}  

exports.update = function (id, orderUpdateDto = {}) {  
    return new Promise(async (res,rej)=>{             

      try{        
        console.log(`обновляем заказ ${id}, данные:`, orderUpdateDto);
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

