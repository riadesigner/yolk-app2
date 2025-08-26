
const OrdersModel = require('./orders.model');

exports.create = function (orderCreateDto = {}) {  
    return new Promise(async (res,rej)=>{ 
      try{
        res(await OrdersModel.create(orderCreateDto));
      }catch(e){
        console.log(`cant create new userinfo, err:${e}`)
        res(null);
      }        
    })    
}  

exports.findAll = function () {  
    return new Promise(async (res,rej)=>{       
      try{ 
          const orders = await OrdersModel
            .find({}).populate('company')
            .sort({ name: 1 }) // сортировка по имени
            .limit(10)
          res(orders);
      }catch(e){
        console.log(`orders not found, err:${e}`);
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
        res(await OrdersModel.findById(id).populate('company'));
      }catch(e){
        console.log(`not found order ${id}, err:${e}`)
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


exports.deleteFromFiles = function(id, fileKey){
    return new Promise(async (res,rej)=>{ 
      try{ 
        const order = await OrdersModel.findById(id);
        const newFiles = (order.files || []).filter((i)=>i.key!==fileKey)
        
        const updatedOrder = await OrdersModel.findByIdAndUpdate(
            id,
            {files : newFiles},            
            { new: true }
        );
        res(updatedOrder);

      }catch(e){
        console.log(`can not update order with id ${id}, err:${e}`);
        res(null);
      }        
    })  
}