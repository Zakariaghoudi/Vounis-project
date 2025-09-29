const express = require("express");
const userRouter = express.Router();

// get all users
userRouter.get('/', async (req, res) => {
  try {
    const result = await User.find();
    res.status(200).send({ users: result, message: 'users found' });
  } catch (error) {
    console.log(error);
  }
});

// // get a user by id
// userRouter.get('/:id', async (req, res) => {
//     try {
//     const result = await User.findById(req.params.id);  
//     res.status(200).send({ user: result, message: 'user found' });
//         } catch (error) {
//     console.log(error);
//   }
// });


// update a user
userRouter.put('/:id', async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.params.id, req.body); 
    res.status(200).send({ user: result, message: 'user updated' });
  } catch (error) {
    console.log(error);
  }
});

//delete a user
userRouter.delete('/:id', async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    res.status(200).send({ user: result, message: 'user deleted' });
  } catch (error) {
    console.log(error);
  }
});

module.exports = userRouter; 