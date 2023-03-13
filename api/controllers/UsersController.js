/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      req
        .file("image")
        .upload({ maxBytes: 10000000 }, async (err, uploadedFiles) => {
          if (err) {
            return res.status(500).json({
              message: "post not uploaded",
              error: err,
            });
          } else {
            let imageFd = "";
            console.log(uploadedFiles);

            if (uploadedFiles.length > 0) {
              imageFd = await uploadedFiles[0].fd;
            }

            try {
              const users = await Users.create({
                username,
                email,
                password,
                image: imageFd,
              }).fetch();
              return res.status(201).json({
                message: "data stored",
              });
            } catch (error) {
              return res
                .status(201)
                .json({ message: "data not stored", error: error + "hello" });
            }
          }
        });
    } catch (error) {
      return res.json({ message: "hello", error: error + "hello" });
    }
  },
  updatepws:async(req,res)=>{
    try {
      const {id}=req.params;
      const user=await Users.findOne(id);
      if(id===user.id){
       const updated=await Users.updateOne({id:id}).set(req.body);
        return res.status(200).json({
          message:"data successfully updated!!"
          ,updated:updated
        })
      }
      else{
        return res.status(404).json({
          message:"data not updated!!"
        })
      }
    } catch (error) {
      return res.status(500).json({
        error:error+"err",
        message:"data not updated!!"
      })
    }
  }
};
