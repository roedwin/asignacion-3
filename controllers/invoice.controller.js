const { response, request } = require("express");
const { Invoice } = require("../models");

const getInvoice = async (req, res = response) => { 
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

const getInvoiceById = async (req = request, res = response) => {
  const { id } = req.params;
  const invoice = await Invoice.findById(id)
    .populate("user", "name")
    //.populate("category", "name");

  res.status(200).json(invoice);
};

//part 3

const createInvoice = async (req, res = response) => {
  const { status, user, ...body } = req.body;

  const invoiceDB = await Invoice.findOne({ name: body.name });


  const data = {
    ...body,
   // name: body.name.toUpperCase(),
    user: req.user._id,
  };

  const invoice = new Invoice(data);
  await invoice.save();
  res.status(200).json(invoice);
};

const updateInvoice = async (req, res) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  data.user = req.user._id;

  const invoice = await Invoice.findByIdAndUpdate(id, data, { new: true });

  res.json(invoice);
};


const deleteInvoice= async (req, res) => {
  const { id } = req.params;
  const deletedInvoice = await Invoice.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
  res.json(deletedInvoice);
};

module.exports = { 
  getInvoice,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
};
