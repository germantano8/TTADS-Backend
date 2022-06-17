const { User } = require("../models/index");

const userController = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find();

      return res.status(200).send({
        success: true,
        users: users,
      });
    } catch {
      return res.status(500).send({
        success: false,
        message: "Error getting users",
      });
    }
  },

  getUser: async (req, res) => {
    try {
      let userId = req.params.id;
      const user = await User.findById(userId);

      if (user) {
        return res.status(200).send({
          success: true,
          user: user,
        });
      } else {
        return res.status(400).send({
          success: false,
          message: "User not found",
        });
      }
    } catch {
      return res.status(500).send({
        success: false,
        message: "Error getting user",
      });
    }
  },

  createUser: async (req, res) => {
    try {
      const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
        email: req.body.email,
        username: req.body.username,
        imageUrl: req.body.imageUrl,
        password: req.body.password,
        role: req.body.role,
      });

      await user.save();
      return res.status(200).send({
        success: true,
        user: user,
      });
    } catch {
      return res.status(500).send({
        success: false,
        message: "Error creating user",
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      let userId = req.params.id;

      const user = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      // new:true returns the updated user and not the old one

      if (user) {
        return res.status(200).send({
          success: true,
          message: "User updated successfully",
        });
      } else {
        return res.status(400).send({
          success: false,
          message: "User not found",
        });
      }
    } catch {
      return res.status(500).send({
        success: false,
        message: "Error updating user",
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;

      let userResponse = await User.findByIdAndRemove(userId);

      if (userResponse) {
        return res.status(200).send({
          success: true,
          message: "User deleted successfully",
        });
      } else {
        return res.status(400).send({
          success: false,
          message: "User not found",
        });
      }
    } catch {
      return res.status(500).send({
        success: false,
        message: "Error deleting user",
      });
    }
  },

  addMainLocation: async (req, res) => {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send({ success: false, message: "User not found" });
    }
    user.mainLocation = req.body.locationId;
    let locations = user.locations;
    if (locations.indexOf(req.body.locationId) == -1) {
      locations.push(req.body.locationId);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, user, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(500).send({
        success: false,
        message: "Error trying to add location",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  },
};

module.exports = userController;
