const path = require("path");
const { v4: uuidv4 } = require("uuid");

const { response } = require("express");

const loadFile = (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({
      msg: "No files were uploaded.",
    });
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const { file } = req.files;

  const cutedFileName = file.name.split(".");
  const extension = cutedFileName[cutedFileName.length - 1];

  const allowedExtentions = ["png", "jpg", "jpeg", "gif"];
  if (!allowedExtentions.includes(extension))
    return res.status(400).json({
      msg: `The extension ${extension}, is not allowed. Allowed extensions: ${allowedExtentions}`,
    });

  const tempFileName = uuidv4() + "." + extension;

  const uploadPath = path.join(__dirname, "../uploads/", tempFileName);

  // Use the mv() method to place the file somewhere on your server
  file.mv(uploadPath, function (err) {
    if (err) return res.status(500).json({ err });

    res.send(`File uploaded!: ${uploadPath}`);
  });
};

module.exports = {
  loadFile,
};
