const CategoriesService = require('../categories/categories.service');

module.exports = async () => {
    const addCategories = async ()=>{
        const arr = ['Веб дизайн', '3D графика', 'Motion дизайн', 'Графический дизайн' ];
        for(const catName of arr){
            await CategoriesService.create({ name:catName});
        }        
    }
    const cats = await CategoriesService.findAll();
    (!cats || cats.length === 0) && addCategories();
}