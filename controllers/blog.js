const { findByIdAndUpdate } = require("../model/User");
const blogModel = require("../model/blog");
const userModel = require("../model/User")
const mongoose = require("mongoose");

module.exports.getAllBlogs = async (req, res) => {
  try {
    const blog = await blogModel.find();

    if (!blog) {
      return res.status(404).send({ message: "Blog Was Not Found" });
    }

    return res.status(200).send(blog);
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

module.exports.getByIdBlogs = async (req, res) => {
    try {
        const _id = req.params.id;
        const getBlogs = await blogModel.findById(_id)

        if(!getBlogs) {
            return res.status(404).send({message: "Couldn't Find The Blog By Its ID"})
        }

        return res.status(200).send(getBlogs)
    } catch (e) {
        return res.status(500).send({error:"e.message"})
    }
}

module.exports.saveBlogs = async (req, res) => {
    try {
      const { title, description, image, user } = req.body;
  
      const existingUser = await userModel.findById(user); // Use userModel instead of user
  
      if (!existingUser) {
        return res.status(404).send({ message: "Existing User Not Found" });
      }
  
      const blog = await blogModel.create({ title, description, image, user });
  
      const session = await mongoose.startSession();
      session.startTransaction();
  
      await blog.save({ session });
      existingUser.blogs.push(blog._id); // Push the blog's _id
      await existingUser.save({ session });
      await session.commitTransaction(); // Correct spelling
  
      return res.status(200).send({ message: "Blog saved successfully" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  };

module.exports.updateBlogs = async (req, res) => {
  try {
    const id = req.params.id;
    const updateFields = req.body;

    const dataBlog = await blogModel
      .findByIdAndUpdate(
        id,
        updateFields,
        { new: true } // This ensures that the updated document is returned
      )
      .exec();

    if (!dataBlog) {
      return res
        .status(404)
        .send({ message: "Some error occurred during updation" });
    }

    return res.status(200).send({ message: "Updated Successfully" });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

module.exports.deleteBlog = async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await blogModel.findByIdAndDelete(_id).populate('user');
         await blog.user.blogs.pull(blog)
         await blog.user.save()
        if (!data) {
            return res.status(404).send({ message: "Couldn't Find The Data" });
        } 

        return res.status(200).send({ data, message: "Deleted Successfully" });
    } catch (e) {
        return res.status(500).send({ error: e.message });
    }
};

const getByUserId = async (req,res) => {
    const userId = req.params.id;
    try {
       userBlogs = await User.findById(userId).populate("blogs");
    } catch (e) {
        return res.status(500).send({error:e.message})
    }
    if(!userblogs) {
        return res.status(404).send({message:"No Blog FOund"})
    }
    return res.status(200).send({blogs:userBlogs})
}