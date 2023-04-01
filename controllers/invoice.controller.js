const { response, request } = require("express");
const { Invoice } = require("../models");

const getInvoice = async (req, res = response) => { ///Busqueda
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };
  const [invoice] = await Promise.all([
    Invoice.find(query)
      .populate("user", "name")
     // .populate("category", "name"),
      .skip(from)
      .limit(limit),
    Invoice.countDocuments(query),
  ]);

  res.status(200).json({
   // total,
    invoice,
  });
};

//part 2

const getInvoiceById = async (req = request, res = response) => { //Busqueda por medio del id
  const { id } = req.params;
  const invoice = await Invoice.findById(id)
    .populate("user", "name")
    //.populate("category", "name");

  res.status(200).json(invoice);
};

//part 3

const createInvoice = async (req, res = response) => { // POST Eenviar datos
  const { status, user, ...body } = req.body;

  const invoiceDB = await Invoice.findOne({ name: body.name });

/*  if (invoiceDB)
    return res
      .status(400)
      .json({ msg: `the invoice ${invoiceDB.name} already exists` });*/

  const data = {
    ...body,
   // name: body.name.toUpperCase(),
    user: req.user._id,
  };

  const invoice = new Invoice(data);
  await invoice.save();
  res.status(200).json(invoice);
};

 //part 4

const updateInvoice = async (req, res) => { //Actualizar datos PUT
  const { id } = req.params;
  const { status, user, ...data } = req.body;

//  data.name = data.name.toUpperCase();
  data.user = req.user._id;

  const invoice = await Invoice.findByIdAndUpdate(id, data, { new: true });

  res.json(invoice);
};

//part 5

const deleteInvoice= async (req, res) => { //Eliminar
  const { id } = req.params;
  const deletedInvoice = await Invoice.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
  res.json(deletedInvoice);
};

module.exports = { //Export
  getInvoice,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
};
