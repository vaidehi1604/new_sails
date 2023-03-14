module.exports = {


  friendlyName: 'Verify token',


  description: '',


  inputs: {
token:{
  type:'string',
  required:true
}
  },


  exits: {

    success: {
      description: 'All done.',
    },
    error:{
      description: 'Invalid token.',
    }

  },


  fn: async function (inputs,exits) {
    try{
   const {token}=inputs;
   const decode=await Jwt.verify(token,process.env.JWT_KEY);
   const user=await Users.findOne({email:decode.email})
   if(token===user.token){
    return exits.success(decode);
   }
   else{
    return exits.error(error);

   }

    }catch(error){
      return exits.error(error);
    }
  }


};

