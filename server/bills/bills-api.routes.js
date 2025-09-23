const express = require('express')
const BillsService = require('../bills/bills.service')

// const CompaniesService = require('./companies.service')
// const passport = require('passport');
const { asyncHandler, sendSuccess, sendError } = require('../middleware/utils');
const AppError = require('../middleware/AppError')

const router = express.Router();


router.get('/bills/to/company/:receiverId',    
    asyncHandler(async (req, res) => {         
        let { receiverId  } =  req.params;
        try{
            const bills = await BillsService.findByReceiverId(receiverId);
            sendSuccess(res, { 
                bills: bills.map(b=>b.toJSON()), 
            })
        }catch(e){
            sendSuccess(res, { 
                bills: [], 
            })
        }        
    })
);

router.get('/bills/from/designer/:senderId',    
    asyncHandler(async (req, res) => {         
        let { senderId  } =  req.params;
        // try{
        //     const company = await CompaniesService.findById(companyId);
        //     sendSuccess(res, { 
        //         company: company.toJSON() 
        //     })
        // }catch(e){
        //     throw new AppError(`Company with id ${companyId} not found`, 404)            
        // }
        return 'ok';
    })
);

router.get('/bills/:billId',    
    asyncHandler(async (req, res) => {         
        let { billId  } =  req.params;
        try{
            const bill = await BillsService.findById(billId);
            sendSuccess(res, { 
                bill: bill.toJSON() 
            })
        }catch(e){
            throw new AppError(`Bill with id ${billId} not found`, 404)            
        }
    })
);



module.exports = router;