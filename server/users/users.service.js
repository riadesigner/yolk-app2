
const UsersModel = require('./users.model');

  
  exports.findById = function (id) {
    return new Promise(async (res,rej)=>{
      try{
        const user = await UsersModel.findById(id);
        res(user); 
      }catch(e){
        console.log(`cant find user by id${id}, err:${e}`)
        res(null);
      }
    })
  }

  exports.create = function (data) {  
      return new Promise(async (res,rej)=>{ 
        try{
          const newUser = await UsersModel.create(data);
          newUser.save();
          res(newUser);
        }catch(e){
          console.log(`cant create new user, err:${e}`)
          res(null);
        }        
      })    
  }  
  
  exports.findByEmail = function (email) {
    return new Promise(async (res,rej)=>{
      try{
        const user = await UsersModel.findOne({email:email});
        res(user); 
      }catch(e){
        console.log(`cant find user by id${email}, err:${e}`)
        res(null);
      }
    })
  }
