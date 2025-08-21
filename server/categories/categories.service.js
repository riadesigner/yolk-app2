
const CategoriesModel = require('./categories.model');

exports.findAll = function () {  
    return new Promise(async (res,rej)=>{ 
      try{ 
        const categories = await CategoriesModel
          .find({})
          .sort({ name: 1 }) // сортировка по имени
          .limit(10)          
        res(categories);
      }catch(e){
        console.log(`categories not found, err:${e}`);
        res(null);
      }        
    })    
} 

