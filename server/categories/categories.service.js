
const AppError = require('../middleware/AppError');
const CategoriesModel = require('./categories.model');

exports.create = async function (categoryCreateDto) {  
    try{ 
      return await CategoriesModel.create(categoryCreateDto)      
    }catch(err){      
      throw new AppError(err, 500);
    }    
} 

exports.findAll = async function () {  
    try{ 
      const categories = await CategoriesModel
        .find({})
        .sort({ name: 1 }) // сортировка по имени
        .limit(10)          
      return categories;
    }catch(err){      
      return [];
    }    
} 

