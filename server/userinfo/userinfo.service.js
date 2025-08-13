
const UserInfoModel = require('./userinfo.model');

exports.create = function (userinfoCreateDto = {}) {  
    return new Promise(async (res,rej)=>{ 
      try{
        res(await UserInfoModel.create(userinfoCreateDto));
      }catch(e){
        console.log(`cant create new userinfo, err:${e}`)
        res(null);
      }        
    })    
}  
