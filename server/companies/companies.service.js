
const CompanyModel = require('./companies.model');
const paginate = require('../utils/paginate')

exports.create = function (companyCreateDto = {}) {  
    return new Promise(async (res,rej)=>{ 
      try{
        res(await CompanyModel.create(companyCreateDto));
      }catch(e){
        console.log(`cant create new userinfo, err:${e}`)
        res(null);
      }        
    })    
}  

exports.update = function (id, companyUpdateDto = {}) {  
    return new Promise(async (res,rej)=>{       
      
      companyUpdateDto.updatedAt = Date.now();
      
      try{        
        const updatedCompany = await CompanyModel.findByIdAndUpdate(
            id,
            companyUpdateDto,            
            { new: true }
        );
        res(updatedCompany);
      }catch(e){
        console.log(`cant update company, err:${e}`)
        res(null);
      }        
    })    
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
