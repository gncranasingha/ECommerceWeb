const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
    try {
      // Corrected buffer handling
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const url = `data:${req.file.mimetype};base64,${b64}`;
  
      // Upload the base64 image to Cloudinary
      const result = await imageUploadUtil(url);
  
      // Send back the uploaded image details
      res.status(200).json({
        success: true,
        result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error occurred",
      });
    }
  };
  

//add new product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;
    const newlyCreateProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await newlyCreateProduct.save()
    res.status(201).json({
        success : true,
        data: newlyCreateProduct
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//fetch all product
const fetchAllProduct = async (req, res) => {
  try {

    const listOfProducts = await Product.find({});
    res.status(200).json({
        success : true,
        data: listOfProducts
    })


  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//edit all product
const editProduct = async (req, res) => {
  try {

    const {id} = req.params;
    const {
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
      } = req.body;

      const findProduct = await Product.findById(id);
      if(!findProduct){
        return res.status(404).json({
            success : false,
            message: "Product not found",
        })
      }
      findProduct.title = title || findProduct.title
      findProduct.description = description || findProduct.description
      findProduct.category = category || findProduct.category
      findProduct.brand = brand || findProduct.brand
      findProduct.price = price === "" ? 0 : price || findProduct.price
      findProduct.salePrice = salePrice === "" ? 0 : salePrice || findProduct.salePrice
      findProduct.totalStock = totalStock || findProduct.totalStock
      findProduct.image = image || findProduct.image

      await findProduct.save()
      res.status(200).json({
        success: true,
        data: findProduct,
      })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//delete a product
const DeleteProduct = async (req, res) => {
  try {

    const {id} = req.params
    const product = await Product.findByIdAndDelete(id);
    if(!product){
        return res.status(404).json({
            success : false,
            message: "Product not found",
        })
      }

      res.status(200).json({
        success: true,
        message:'Product delete Successfully',
      })


  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProduct,
  editProduct,
  DeleteProduct,
};
