
const mongoose = require('mongoose')
module.exports = async () => {
  
    const MONGO_URL =`mongodb://${process.env.MONGO_ROOT_USER}:${process.env.MONGO_ROOT_PASSWORD}@mongo:27017`;
    const MONGO_DB = process.env.DB_NAME;

    try{
        const db_hdlr = await mongoose.connect(MONGO_URL, {dbName:MONGO_DB});        
        console.log('DB CONNECTED');
        return db_hdlr;
    }catch(e){
        console.log(e, "error connect to mongo / mongoose");        
    }    
};