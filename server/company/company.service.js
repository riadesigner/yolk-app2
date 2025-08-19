
const CompanyModel = require('./company.model');

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
