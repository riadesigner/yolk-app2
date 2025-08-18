
const UsersModel = require('./users.model');
const userInfoService = require('../userinfo/userinfo.service')

  
  exports.findById = function (id) {
    return new Promise(async (res,rej)=>{
      try{
        const user = await UsersModel.findById(id);
        res(user); 
      }catch(e){
        console.log(`cant find user by id ${id}, err: ${e.message || e}`)
        res(null);
      }
    })
  }

  exports.update = function (id, userUpdateDto) {
    return new Promise(async (res,rej)=>{

      try{        

        const updatedUser = await UsersModel.findByIdAndUpdate(
            id,
            userUpdateDto,
            { new: true }
        );                

        // обновляем расширенную информацию
        if(userUpdateDto.userInfo){

          const { createdAt, updatedAt, id:userInfoId, ...userInfoUpdateDto } = userData;
          const updatedUserInfo = await userInfoService.update(userInfoId, userInfoUpdateDto);  
          if(!updatedUserInfo){
            rej("не удалось сохранить расширенную информацию о пользователе")
          }          
        }

        await updatedUser.populate('userInfo');
        console.log('updatedUser ========= ', updatedUser)
        res(updatedUser);

      }catch(e){
        console.log(`cant find user by id ${userId}, err: ${e.message || e}`)
        res(null);
      }
    })
  }  

  exports.create = function (userData, infoData = {}) {  
      return new Promise(async (res,rej)=>{ 
        
        try{

          // 1. Создаём userInfo
          const newUserInfo = await userInfoService.create(infoData);     
          // 2. Создаём user с привязкой к userInfo._id
          const newUser = await UsersModel.create({
            ...userData,
            userInfo: newUserInfo._id
          });               
          res(newUser);

        }catch(e){
          console.log(`cant create new user, err: ${e}`)
          res(null);
        }
      })    
  }  
  
  exports.findByEmail = function (email, fullMode) {
    return new Promise(async (res,rej)=>{
      try{
        const user = await UsersModel.findOne({email:email});
        if(fullMode){          
          await user.populate('userInfo');
          user.role==='company' && await user.populate('userCompany');
        }
        res(user);
      }catch(e){
        console.log(`cant find user by id ${email}, err:${e.message || e}`)
        res(null);
      }
    })
  }
