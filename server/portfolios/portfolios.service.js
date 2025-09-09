
const PortfoliosModel = require('./portfolios.model');
const paginate = require('../utils/paginate')

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

