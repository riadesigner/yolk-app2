
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

exports.update = function (id, userInfoUpdateDto = {}) {  
    return new Promise(async (res,rej)=>{ 

      const {updatedAt, createdAt, ...data } = userInfoUpdateDto;

      try{        
        const userInfoUpdated = await UserInfoModel.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );
        res(userInfoUpdated);
      }catch(e){
        console.log(`cant update userInfo ${id}, err:${e}`)
        res(null);
      }        
    })    
}  

