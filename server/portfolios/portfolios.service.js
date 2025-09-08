
const PortfoliosModel = require('./portfolios.model');
const paginate = require('../utils/paginate')

exports.create = function (portfolioCreateDto = {}) {  
    return new Promise(async (res,rej)=>{ 
      try{
        res(await PortfoliosModel.create(portfolioCreateDto));
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
        
          const result = await paginate(PortfoliosModel, query, {
              page: opt.page,
              limit: opt.limit,
              sort: sort,
              populate: 'company',
              populate: 'contractor',
          });          
          res(result);

      }catch(e){
        console.log(`portfolio not found, err:${e}`);
        res({data:[],pagination:null});
      }        
    })
} 

exports.find = function (opt = {}) {  
    return new Promise(async (res,rej)=>{ 
      try{
        res(await PortfoliosModel.find(opt));
      }catch(e){
        console.log(`not found portfolio for user ${opt.userId}, err:${e}`)
        res(null);
      }        
    })    
}  

exports.findById = function (id) {  
    return new Promise(async (res,rej)=>{ 
      try{
        res(await PortfoliosModel.findById(id).populate('company').populate('contractor'));
      }catch(e){
        console.log(`not found portfolio ${id}, err:${e}`)
        res(null);
      }
    })    
}  

exports.update = function (id, portfolioUpdateDto = {}) {  
    return new Promise(async (res,rej)=>{             
      try{                
        const updatedPortfolio = await PortfoliosModel.findByIdAndUpdate(
            id,
            portfolioUpdateDto,
            { new: true }
        );
        res(updatedPortfolio);
      }catch(e){
        console.log(`cant update portfolio, err:${e}`)
        res(null);
      } 
    })    
}  

