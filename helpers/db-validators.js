const Role = require("../models/role");
const User = require("../models/user");

const isAValidRole = async (role = "") => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist)
    throw new Error(`Role: ${role} is not registered in Database`);
};

const emailExist = async (email = "") => {
  const emailExist = await User.findOne({ email });
  if (emailExist) throw new Error(`Email already exist in DB`);
};

const userByIdExist = async (id) => {
  const userExist = await User.findById(id);
  if (!userExist) throw new Error(`the Id does not exist`);
};

module.exports = { isAValidRole, emailExist, userByIdExist };
