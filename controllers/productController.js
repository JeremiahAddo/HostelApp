const productModel = require("../models/productModel.js");
const categoryModel = require("../models/categoryModel.js");
const Order = require("../models/orderModel.js");
const mongoose = require("mongoose");


const fs = require("fs");
const slugify = require("slugify");
const dotenv = require("dotenv");

dotenv.config();

//payment gateway

exports.createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, location, gender } =
      req.fields;
    const {
      photo,
      photo1,
      photo2,
      photo3,
      
    } = req.files;

// Validation
switch (true) {
  case !name:
    return res.status(500).send({ error: "Name is Required" });
  case !location:
    return res.status(500).send({ error: "Location is Required" });
  case !description:
    return res.status(500).send({ error: "Description is Required" });
  case !price:
    return res.status(500).send({ error: "Price is Required" });
  case !gender:
    return res.status(500).send({ error: "Gender is Required" });
  case !category:
    return res.status(500).send({ error: "Category is Required" });
  case !quantity:
    return res.status(500).send({ error: "Quantity is Required" });
  case photo && photo.size > 1000000:
  case photo1 && photo1.size > 1000000:
  case photo2 && photo2.size > 1000000:
  case photo3 && photo3.size > 1000000:
    return res
      .status(500)
      .send({ error: "Photos are Required and should be less than 1mb" });
}


    const products = new productModel({ ...req.fields, slug: slugify(name) });

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    if (photo1) {
      products.photo1.data = fs.readFileSync(photo1.path);
      products.photo1.contentType = photo1.type;
    }
    if (photo2) {
      products.photo2.data = fs.readFileSync(photo2.path);
      products.photo2.contentType = photo2.type;
    }
    if (photo3) {
      products.photo3.data = fs.readFileSync(photo3.path);
      products.photo3.contentType = photo3.type;
    }
    

    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};

//get all products
exports.getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select(
        "-photo"
      )
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "ALlProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};
// get single product
exports.getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select(
        "-photo -photo1 -photo2 -photo3 "
      )
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

// get photo
exports.productPhotoController2 = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.pid)
      .select("photo2");
    if (product.photo2.data) {
      res.set("Content-type", product.photo2.contentType);
      return res.status(200).send(product.photo2.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};
exports.productPhotoController1 = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.pid)
      .select("photo1");
    if (product.photo1.data) {
      res.set("Content-type", product.photo1.contentType);
      return res.status(200).send(product.photo1.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};
exports.productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};
exports.productPhotoController3 = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.pid)
      .select("photo3");
    if (product.photo3.data) {
      res.set("Content-type", product.photo3.contentType);
      return res.status(200).send(product.photo3.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};


//delete controller
exports.deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//upate producta
exports.updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, location, gender } = req.fields;
    const { photo } = req.files;
    const { photo1 } = req.files;
    const { photo2 } = req.files;
    const { photo3 } = req.files;
    
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
        case !location:
        return res.status(500).send({ error: "Location is Required" });
      case !gender:
        return res.status(500).send({ error: "Gender is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
      case photo1 && photo1.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
      case photo2 && photo2.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
      case photo3 && photo3.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
      
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    if (photo1) {
      products.photo1.data = fs.readFileSync(photo1.path);
      products.photo1.contentType = photo1.type;
    }
    if (photo2) {
      products.photo2.data = fs.readFileSync(photo2.path);
      products.photo2.contentType = photo2.type;
    }
    if (photo3) {
      products.photo3.data = fs.readFileSync(photo3.path);
      products.photo3.contentType = photo3.type;
    }
  
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

// filters
exports.productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

// product count
exports.productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
exports.productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
    .find({})
      .select("-photo1 -photo2 -photo3")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in per page ctrl",
      error,
    });
  }
};


// search product
exports.searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select(
        "-photo1 -photo2 -photo3 "
      );
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// similar products
exports.realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select(
        "-photo -photo1 -photo2 "
      )
      .limit(12)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// get prdocyst by catgory
exports.productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel
      .find({ category })
      .select(
        "-photo -photo1 -photo2"
      )
      .populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

exports.createOrder = async (req, res) => {
  const { products, payment, buyer, status } = req.body;

  try {
    const order = new Order({
      products,
      payment,
      buyer,
      status,
    });

    await order.save();

    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


exports.reduceProductQuantity = async (req, res) => {
  const productId = req.params.pid; // Assuming you pass the product ID as a route parameter

  try {
    // Find the product by its ID
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.quantity <= 0) {
      return res.status(400).json({ message: 'Product quantity is already zero' });
    }

    // Reduce the product's quantity by 1
    product.quantity -= 1;

    // Save the updated product
    await product.save();

    res.status(200).json({ message: 'Product quantity reduced by 1', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getProductQuantity = async (req, res) => {
  const productId = req.params.productId; // Assuming you pass the product ID as a route parameter

  try {
    // Find the product by its ID
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ quantity: product.quantity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


// Controller function to check if a user has made an order before
exports.checkUserOrder = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming you pass the user ID as a parameter

    // Create a new ObjectId instance using the 'new' keyword
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Check if there's an order for the specified user ID
    const order = await Order.findOne({ buyer: userObjectId });

    if (order) {
      // User has made an order before
      return res.status(200).json({ message: 'User has made an order before', hasOrder: true });
    }

    // User has not made an order before
    return res.status(200).json({ message: 'User has not made an order before', hasOrder: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
