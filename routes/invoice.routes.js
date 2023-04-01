const { Router } = require("express");
const { check } = require("express-validator");
const {
    getInvoice,
    getInvoiceById,
    createInvoice,
    updateInvoice,
    deleteInvoice,
} = require("../controllers/invoice.controller");
const {
  invoiceExistById,
  userByIdExist, 
} = require("../helpers/db-validators"); 
const { validateJWT, validateFields, isAdminRole } = require("../middleware");

const router = Router();

router.get("/", getInvoice);

router.get( 
  "/:id",
  [
    check("id", "is not a mongoID").isMongoId(),
    check("id").custom(invoiceExistById),
    validateFields,
  ],
  getInvoiceById
);


router.post(
  "/",
  [
    check("user", "user is mandatory").not().isEmpty(),
    check("user", "is not a mongoID").isMongoId(),
    check("user").custom(userByIdExist),
    validateJWT,
    validateFields,
  ],
  createInvoice
);


router.put( 
  [
    validateJWT,
    check("name", "name is mandatory").not().isEmpty(),
    check("id", "is not a mongoID").isMongoId(),
    check("id").custom(invoiceExistById),
    validateFields,
  ],
  updateInvoice
);


router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "is not a mongoID").isMongoId(),
    check("id").custom(invoiceExistById),
    validateFields,
  ],
  deleteInvoice
);

module.exports = router; 
