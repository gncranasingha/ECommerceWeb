import CommonForm from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import React, { Fragment, useState } from 'react'

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

  function onSubmit(){

  }

  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end' >
        <Button onClick={()=> setopenCreateProductDialog(true)} >Add New Product</Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4' >

      </div>
      <Sheet open={openCreateProductDialog} onOpenChange={()=>{
        setopenCreateProductDialog(false)
      }} >
          <SheetContent side="right" className="overflow-auto" >
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
            </SheetHeader>
            <div className='py-6' >
              <CommonForm
              onSubmit={onSubmit}
                formData={formData}
                setFormData={setFormData}
                buttonText='Add'
                formControls={addProductFormElements}
              />
            </div>
          </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default Adminproducts