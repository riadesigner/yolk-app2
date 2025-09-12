
const BillsModel = require('./company.model');
const paginate = require('../utils/paginate')
const AppError = require('../middleware/AppError')

exports.create = async function (billCreateDto = {}) {  
  try{
    return await BillsModel.create(billCreateDto)
  }catch(err){
    throw new AppError(err, 500);
  }   
}  

exports.update = async function (id, billUpdateDto = {}) {          
    try{        

      billUpdateDto.updatedAt = Date.now();

      const updatedBill = await BillsModel.findByIdAndUpdate(
          id,
          billUpdateDto,            
          { new: true }
      );
      return updatedBill;
    }catch(err){
        throw new AppError(err, 500);
    }        
}  


exports.findById = function (id) {  
    return new Promise(async (res,rej)=>{ 
      try{ 
        const company = await CompanyModel.findById(id);
        res(company);
      }catch(e){
        console.log(`not found company with id ${id}, err:${e}`);
        res(null);
      }        
    })    
} 

// ----------------------
// search with pagination
// ----------------------
exports.findAll = function (opt={}) {      
    return new Promise(async (res,rej)=>{       
    
      // по умолчанию = сортировка по дате
      const sort = opt.sort || {createdAt:-1};      
      const query = {}  

      if(opt.userInput){
        const regex = new RegExp(opt.userInput, 'i'); // 'i' - ignore case      
          query.$or = [
              { name: { $regex: regex } },
              { description: { $regex: regex } },
            ];          
      }
      
      try{ 
        
          const result = await paginate(CompanyModel, query, {
              page: opt.page || 1,
              limit: opt.limit || 10,
              sort: sort,
          });          
          res(result);

      }catch(e){
        console.log(`companies not found, err:${e}`);
        res({data:[],pagination:null});
      }        
    })
} 


exports.deleteFromGallery = function(id, imageKey){
    return new Promise(async (res,rej)=>{ 
      try{ 
        const company = await CompanyModel.findById(id);
        const newGallery = (company.gallery || []).filter((i)=>i.key!==imageKey)
        
        const updatedCompany = await CompanyModel.findByIdAndUpdate(
            id,
            {gallery : newGallery},            
            { new: true }
        );
        res(updatedCompany);

      }catch(e){
        console.log(`can not update company with id ${id}, err:${e}`);
        res(null);
      }        
    })  
}
