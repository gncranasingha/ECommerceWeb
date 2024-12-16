const express = require("express");
const { upload } = require("../../helpers/cloudinary");
const {
  addProduct,
  fetchAllProduct,
  editProduct,
  DeleteProduct,
  handleImageUpload,
} = require("../../controllers/admin/products-controller");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.get("/get", fetchAllProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", DeleteProduct);

module.exports = router;
