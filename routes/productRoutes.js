const express = require("express");
const formidable = require("express-formidable");

const {
  createOrder,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  productPhotoController1,
  productPhotoController2,
  productPhotoController3,
  productPhotoController4,
  productPhotoController5,
  productPhotoController6,
  productPhotoController7,
  productPhotoController8,
  realtedProductController,
  searchProductController,
  updateProductController,
  reduceProductQuantity,
  getProductQuantity,
  checkUserOrder
} = require("../controllers/productController.js");

const { isAdmin, requireSignIn } = require("../middlewares/authMiddleware.js");

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);
router.get("/product-photo1/:pid", productPhotoController1);
router.get("/product-photo2/:pid", productPhotoController2);
router.get("/product-photo3/:pid", productPhotoController3);


//delete product
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

router.post("/order", requireSignIn, createOrder);


//route for reducing product quantity by 1
router.post('/productsred/:pid/reduce', reduceProductQuantity);

router.get('/productsred/:productId/quantity', getProductQuantity);

router.get('/check-order/:userId', checkUserOrder);
module.exports = router;
