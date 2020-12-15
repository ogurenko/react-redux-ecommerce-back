const Sub = require("../models/sub");
const Product = require("../models/product");

const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;

    const sub = await new Sub({
      name,
      parent,
      slug: slugify(name),
    }).save();
    res.json(sub);
  } catch (err) {
    console.log("SUB CREATE ERROR", err);

    res.status(400).send("Create sub failed");
  }
};

exports.list = async (req, res) => {
  // createdAt most recent
  res.json(await Sub.find({}).sort({ createdAt: -1 }).exec());
};

exports.read = async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ subs: sub })
    .populate("category")
    .exec();
  res.json({ sub, products });
};

exports.update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name: name, parent: parent, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Update sub failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("SUB DELETE FAILED");
  }
};