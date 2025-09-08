
const OrdersModel = require('./orders.model');
const paginate = require('../utils/paginate')

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

// ----------------------
// search with pagination
// ----------------------
exports.findAll = function (opt={}) {      
    return new Promise(async (res,rej)=>{       
    
      console.log('opt = ', opt);

      // по умолчанию = сортировка по дате
      const sort = opt.sort || {createdAt:-1};
      const categories = opt.categories || [];

      const query = {}  

      if(categories.length>0){
        query.categories = { $in: categories }
      }

      if(opt.userInput){
        const regex = new RegExp(opt.userInput, 'i'); // 'i' - ignore case      
          query.$or = [
              { title: { $regex: regex } },
              { description: { $regex: regex } },
              { tags: { $in: [regex] } }
            ];          
      }
      
      try{ 
        
          const result = await paginate(OrdersModel, query, {
              page: opt.page,
              limit: opt.limit,
              sort: sort,
              populate: 'company',
              populate: 'contractor',
          });          
          res(result);

      }catch(e){
        console.log(`orders not found, err:${e}`);
        res({data:[],pagination:null});
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
        res(await OrdersModel.findById(id).populate('company').populate('contractor'));
      }catch(e){
        console.log(`not found order ${id}, err:${e}`)
        res(null);
      }
    })    
}  
exports.addRespond = function(orderId, userId){
  return new Promise(async (res,rej)=>{
      try{   
        
        const order = await OrdersModel.findById(orderId);

        if(order.responded.includes(userId)){          
          res(null);
        }

        const updatedOrder = await OrdersModel.findByIdAndUpdate(
            orderId,
            {
              responded: [...order.responded, userId],
            },
            { new: true }
        );
        res(updatedOrder);
      }catch(e){
        console.log(`cant update order, err:${e}`)
        res(null);
      }
  })
}

exports.setContractor = function(orderId, contractorId){
  return new Promise(async (res,rej)=>{
      try{   
        
        const order = await OrdersModel.findById(orderId);

        if(!order.responded.includes(contractorId)){
          console.log(`нельзя назначить исполнителем пользователя ${contractorId}, который не откликался на заказ ${orderId}` )
          res(null);
        }

        const updatedOrder = await OrdersModel.findByIdAndUpdate(
            orderId,
            {
              contractor: contractorId,
            },
            { new: true }
        );
        res(updatedOrder);
      }catch(e){
        console.log(`cant update order, err:${e}`)
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