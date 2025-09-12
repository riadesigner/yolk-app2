const express = require('express')
// const UsersService = require('../users/users.service')
// const CompanyService = require('./company.service')
// const passport = require('passport');
const { asyncHandler, sendSuccess, sendError } = require('../middleware/utils');
const AppError = require('../middleware/AppError')

const router = express.Router();


router.get('/bills/to/company/:receiverId',    
    asyncHandler(async (req, res) => {         
        let { receiverId  } =  req.params;
        // try{
        //     const company = await CompanyService.findById(companyId);
        //     sendSuccess(res, { 
        //         company: company.toJSON() 
        //     })
        // }catch(e){
        //     throw new AppError(`Company with id ${companyId} not found`, 404)            
        // }
        return 'ok';
    })
);

router.get('/bills/from/designer/:senderId',    
    asyncHandler(async (req, res) => {         
        let { senderId  } =  req.params;
        // try{
        //     const company = await CompanyService.findById(companyId);
        //     sendSuccess(res, { 
        //         company: company.toJSON() 
        //     })
        // }catch(e){
        //     throw new AppError(`Company with id ${companyId} not found`, 404)            
        // }
        return 'ok';
    })
);

router.get('/bills/:id',    
    asyncHandler(async (req, res) => {         
        // let { companyId  } =  req.params;
        // try{
        //     const company = await CompanyService.findById(companyId);
        //     sendSuccess(res, { 
        //         company: company.toJSON() 
        //     })
        // }catch(e){
        //     throw new AppError(`Company with id ${companyId} not found`, 404)            
        // }
        return 'ok';
    })
);



module.exports = router;