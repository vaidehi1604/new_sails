/**
 * FollowingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  userFollowing: async (req, res) => {
    const lang = req.getLocale();
    try {
       //get current user
      const id = req.userData.id;
      //follow user id
      const newUser = req.query.newUser;
    //find following
    const followings=await Following.findOne({
        newUser:newUser,following:true
    })
  
    if(followings){
        if(newUser==followings.newUser){
        const newFollow=await Following.updateOne({id:followings.id},{following:false})
      return res.status(200).json({
        message: sails.__("userunfollow", lang),
      });
    }
    else{
      const follow = await Following.create({
        newUser:newUser,
        following:true,
        owner: id,
      }).fetch();
      console.log(follow);
      return res.status(201).json({
        message: sails.__("following", lang),
        follower:follow
      });
    }
}else{
    const follow = await Following.create({
        newUser:newUser,
        following:true,
        owner: id,
      }).fetch();
      console.log(follow);
      return res.status(201).json({
        message: sails.__("following", lang),
        follower:follow
      });
}
    } catch (error) {
      return res.status(500).json({
        error: error,
        message: sails.__("notFollowing", lang),
      });
    }
  },
};
