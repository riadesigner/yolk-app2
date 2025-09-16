
const BillsModel = require('./bills.model');
const AppError = require('../middleware/AppError')

exports.create = async function (billCreateDto = {}) {  
  try{
    return await BillsModel.create(billCreateDto)
  }catch(err){
    throw new AppError(err, 500);
  }   
}  

exports.count = async function (opt = {}) {  
  try{
    return await BillsModel.countDocuments(opt)
  }catch(err){
    console.log('BillsService err:', err);
    return 0;
  }   
}  

exports.find = async function (opt = {}) {  
  try{
    return await BillsModel.find(opt)
  }catch(err){
    console.log('BillsService err:', err);
    return [];
  }   
}  

exports.findByReceiverId = async function (receiverId) {  
    try{ 
      const opt = {receiver:receiverId}
      const sort= {createdAt:-1}      
      const bills = await BillsModel.find(opt).sort(sort);
      return bills;
    }catch(err){
      return [];
    }
} 


exports.findById = async function (id) {  
    try{ 
      return await BillsModel.findById(id);
    }catch(err){
      return null;
    }    
} 



