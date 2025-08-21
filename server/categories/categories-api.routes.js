const express = require('express')
const CategoriesService = require('../categories/categories.service')
const { asyncHandler, sendSuccess, sendError } = require('../middleware/utils');

const router = express.Router();

router.get('/categories',    
    asyncHandler(async (req, res) => {         
        try{
            const cats = await CategoriesService.findAll();
            sendSuccess(res, { categories: cats.map((cat)=>cat.toJSON()) })
        }catch(e){
            return sendError(res, `Categories not found`, 404);
        }
    })
);


module.exports = router;