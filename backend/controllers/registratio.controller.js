const Registration = require("../model/registrationUser");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dbdtk77uc",
  api_key: "863992813938763",
  api_secret: "CN6B_iWE_BXmRbeAX7tAXMJVFYc",
  secure: true,
});

const forRegisterUser = async (req, res) => {
  const { name, vat, quantity, price_net, price_gross } = req.body;
  //   const imageFile = req.files.img.path;
  //   console.log(req.img);
  //   cloudinary.uploader.upload(imageFile, async function (error, result) {
  //     if (error) {
  //     } else {
  const newUser = new Registration({
    name,
    vat,
    quantity,
    price_net,
    price_gross,
  });
  await newUser.save();
  res.status(201).json(newUser);
  // }
  //   });
};

const gettingUserInfo = async (req, res) => {
  try {
    const allUsers = await Registration.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  forRegisterUser,
  gettingUserInfo,
};
