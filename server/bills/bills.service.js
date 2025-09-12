
const BillsModel = require('./bills.model');
const AppError = require('../middleware/AppError')

// exports.create = async function (billCreateDto = {}) {  
//   try{
//     return await BillsModel.create(billCreateDto)
//   }catch(err){
//     throw new AppError(err, 500);
//   }   
// }  

// exports.update = async function (id, billUpdateDto = {}) {          
//     try{        

//       billUpdateDto.updatedAt = Date.now();

//       const updatedBill = await BillsModel.findByIdAndUpdate(
//           id,
//           billUpdateDto,            
//           { new: true }
//       );
//       return updatedBill;
//     }catch(err){
//         throw new AppError(err, 500);
//     }        
// }  


exports.findByReceiverId = async function (receiverId) {  
    try{ 
      const bills = await BillsModel.find({receiver:receiverId});
      return bills;
    }catch(err){
      return [];
    }
} 


// exports.findById = function (id) {  
//     return new Promise(async (res,rej)=>{ 
//       try{ 
//         const company = await CompanyModel.findById(id);
//         res(company);
//       }catch(e){
//         console.log(`not found company with id ${id}, err:${e}`);
//         res(null);
//       }        
//     })    
// } 



