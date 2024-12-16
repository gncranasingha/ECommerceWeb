import ProductImageUpload from '@/components/admin-view/image-upload'
import AdminProductTitle from '@/components/admin-view/product-tile'
import CommonForm from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useToast } from '@/components/ui/use-toast'
import { addProductFormElements } from '@/config'
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from '@/store/admin/products-slice'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'



  const initialFormData = {
    image : null,
    title : '',
    description : '',
    brand : '',
    price :"",
    salePrice : '',
    totalStock : ''
  }


const Adminproducts = () => {
 
  const [openCreateProductDialog,setopenCreateProductDialog] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [imageFile, setImageFile] = useState(null)
  const [uploadImageUrl, setUploadImageUrl] = useState('')
  const [imageLoadingState, setImageLoadingState] = useState(false)

  const [currentEditedId, setCurrentEditedId] = useState(null)

  const {productList} = useSelector(state => state.adminProducts)
  const dispatch = useDispatch()
  const {toast} = useToast()
  

  function onSubmit(event){
    event.preventDefault()
    //edit part
    currentEditedId !== null ?
    dispatch(editProduct({
      id : currentEditedId,formData
    })).then((data)=>{
      console.log(data, "edit");

      if(data?.payload?.success){
        dispatch(fetchAllProducts())
        setFormData(initialFormData)
        setopenCreateProductDialog(false)
        setCurrentEditedId(null)
      }
      
    }):
    //add part
    dispatch(addNewProduct({
      ...formData,
      image : uploadImageUrl
    })).then((data) => {
      console.log(data);
      if(data?.payload?.success){
        dispatch(fetchAllProducts())
        setopenCreateProductDialog(false)
        setImageFile(null);
        setFormData(initialFormData)
        toast({
          title : 'Product add Successfully!'
        })
      }
      
    })
  }


  //delete function
    function handleDelete(getCurrentProductId){
     
      dispatch(deleteProduct(getCurrentProductId)).then((data) =>{
        if(data?.payload?.success){
          dispatch(fetchAllProducts())
        }
      })
      
  }

  //if some field is empty add button is disable
  function isFormValid (){
    return Object.keys(formData)
        .map((key)=> formData[key] !== '' )
        .every(item => item)
  }


  useEffect (()=> {
    dispatch(fetchAllProducts())
  },[dispatch])

  console.log(productList,uploadImageUrl, "productList");
  

  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end' >
        <Button onClick={()=> setopenCreateProductDialog(true)} >Add New Product</Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4' >
          {
            productList && productList.length > 0 ?
            productList.map((productItem,index) => (
              <AdminProductTitle 
                  key={index} 
                  setFormData={setFormData} 
                  setopenCreateProductDialog={setopenCreateProductDialog} 
                  setCurrentEditedId={setCurrentEditedId} 
                  product={productItem} 
                  handleDelete = {handleDelete}
                  />)) : null
          }
      </div>
      <Sheet open={openCreateProductDialog} onOpenChange={()=>{
        setopenCreateProductDialog(false)
        setCurrentEditedId(null)  // wen user click add new product button disable data fetch
        setFormData(initialFormData)  // wen user click add new product button disable data fetch data want to fetch when user clicked on edit button
      }} >
          <SheetContent side="right" className="overflow-auto" >
            <SheetHeader>
              <SheetTitle>
                {
                  currentEditedId !== null ?
                  'Edit Product' : "Add New Product"
                }
              </SheetTitle>
            </SheetHeader>
            <ProductImageUpload 
              imageFile={imageFile} 
              setImageFile={setImageFile} 
              uploadImageUrl={uploadImageUrl} 
              setUploadImageUrl={setUploadImageUrl} 
              setImageLoadingState={setImageLoadingState}
              imageLoadingState = {imageLoadingState}
              isEditMode={currentEditedId !== null }
              />
            <div className='py-6' >
              <CommonForm
              onSubmit={onSubmit}
                formData={formData}
                setFormData={setFormData}
                buttonText={currentEditedId !== null ? 'Edit' : 'Add'}
                formControls={addProductFormElements}
                isBtnDisabled = {!isFormValid()}
              />
            </div>
          </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default Adminproducts