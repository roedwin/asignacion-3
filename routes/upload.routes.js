const { Router } = require("express");
const { check } = require("express-validator");
const { loadFile } = require("../controllers/upload.controller");
const { validateFields } = require("../middleware/validate-fields");
const router = Router();

router.post("/", loadFile);

module.exports = router;
