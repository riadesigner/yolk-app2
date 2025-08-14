
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

exports.update = function (userInfo = {}) {  
    return new Promise(async (res,rej)=>{ 
      
      const id = userInfo.id;    
      const userInfoUpdateDto = {
        ...userInfo,
        updatedAt:Date.now(),
      }

      try{
        // { new: true } возвращает обновленный документ, а не старый
        const updatedUserInfo = await UserInfoModel.findByIdAndUpdate(
            id,
            userInfoUpdateDto,
            { new: true }
        );
        res(updatedUserInfo);
      }catch(e){
        console.log(`cant update userInfo, err:${e}`)
        res(null);
      }        
    })    
}  

