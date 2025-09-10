
const PortfoliosModel = require('./portfolios.model');
const paginate = require('../utils/paginate')
const AppError = require('../middleware/AppError')

exports.create = function (portfolioCreateDto = {}) {  
    return new Promise(async (res,rej)=>{ 

      const userId = portfolioCreateDto.designer;

      if(!userId){
        console.log(`designer (userId) is required`)
        res(null);
      }

      console.log(`пробуем сохранить проект`,portfolioCreateDto )

      try{
        const newPortfolio = await PortfoliosModel.create(portfolioCreateDto);
        res(newPortfolio);
      }catch(e){
        console.log(`cant create portfolio fo userId ${userId}, err:${e}`)
        res(null);
      }        
    })    
}  

exports.findByUserId = function (userId) {  
    return new Promise(async (res,rej)=>{ 
      try{
        res(await PortfoliosModel.find({designer:userId}));
      }catch(e){
        console.log(`not found portfolio by designer ${userId}, err:${e}`)
        res([]);
      }
    })    
} 


exports.findById = function (portfolioId) {  
    return new Promise(async (res,rej)=>{ 
      try{
        const p = await PortfoliosModel
          .findById(portfolioId)
          .populate('designer');
        res(p);
      }catch(e){
        console.log(`not found portfolio with id ${portfolioId}, err:${e}`)
        res(null);
      }
    })    
} 



exports.deleteById = async function(portfolioId) {      
    try {
      const result = await PortfoliosModel.findByIdAndDelete(portfolioId);      
      if (!result) { throw new AppError('Портфолио не найдено', 404) }            
      return result;
    } catch (err) {      
      throw new AppError(err, 500)      
    }
}



// exports.update = function (id, portfolioUpdateDto = {}) {  
//     return new Promise(async (res,rej)=>{             
//       try{                
//         const updatedPortfolio = await PortfoliosModel.findByIdAndUpdate(
//             id,
//             portfolioUpdateDto,
//             { new: true }
//         );
//         res(updatedPortfolio);
//       }catch(e){
//         console.log(`cant update portfolio, err:${e}`)
//         res(null);
//       } 
//     })    
// }  

