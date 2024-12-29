//combined with filter.jsx in shopping-view
//combined with product-tile in shoping-view
//and backend part is shop folder
//combined with filter
import ProductFilter from '@/components/shopping-view/filter'
import ProductDetailsDialog from '@/components/shopping-view/product-details'
import ShoppingProductTile from '@/components/shopping-view/product-tile'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/use-toast'
import { sortOptions } from '@/config'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { fetchAllFilterdProducts, fetchProductDetails } from '@/store/shop/products-slice'

import { ArrowUpDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

function createSearchParamsHelper(filterParams){  //create the queryParames for URL
  const queryParams = []

  for(const [key,value] of Object.entries(filterParams)){
    if(Array.isArray(value) && value.length > 0 ){
      const paramValue = value.join(',')

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
    }
  }
  //console.log(queryParams);
  
  return queryParams.join('&')
}

const ShoppingListing = () => {

  const dispatch = useDispatch()
  const {productList, productDetails} = useSelector((state)=> state.shopProducts) //use name of reducer in store.js
  const {user} = useSelector(state => state.auth)
 const {cartItems} = useSelector(state => state.shopCart)
  const [filters, setFilters]= useState({})
  const [sort, setSort] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const {toast} = useToast()

  //sort controll function
  function handleSort(value){
    console.log(value);
    
      setSort(value)
  }

  // filter controll function
  function handleFilter(getSectionId, getCurrentOption){
      
      let copyFilter = {...filters}
      const indexOfCurrentSection = Object.keys(copyFilter).indexOf(getSectionId) 

      if(indexOfCurrentSection === -1){
        copyFilter = {
          ...copyFilter,
          [getSectionId] : [getCurrentOption] //check category or brand name selected or not
        }
      } else {
        const indexOfCurrentOption = copyFilter[getSectionId].indexOf(getCurrentOption) //curent all option get

        if(indexOfCurrentOption === -1) copyFilter[getSectionId].push(getCurrentOption) //Adds the selected option to the array 
        else copyFilter[getSectionId].splice(indexOfCurrentOption, 1) //when user double clicked on checkbox remove filter
      }
    
      setFilters(copyFilter)
      sessionStorage.setItem('filters', JSON.stringify(copyFilter)) //user refresh the page but filters and sort are working
      
  }

  useEffect(() => {
      setSort("price-lowtohigh")
      setFilters(JSON.parse(sessionStorage.getItem('filters')) || {} )
  },[])


  useEffect(() => { //change the URL according to filters
    if(filters && Object.keys(filters).length > 0 ){
      const createQueryString = createSearchParamsHelper(filters)
      setSearchParams(new URLSearchParams(createQueryString))
    }
  },[filters])



    //fetch list of products
  useEffect(()=>{
    if(filters !== null && sort !== null)
    dispatch(fetchAllFilterdProducts({filterParams: filters , sortParams: sort} )) //fetch data from redux store
  },[dispatch, sort, filters])

  //console.log(filters, searchParams.toString());
console.log(productDetails, "productdetails");


  //fetch one product details
function handleGetProductDetails(getCurrentProductId){
  console.log(getCurrentProductId);
  dispatch(fetchProductDetails(getCurrentProductId))
  
}

//when changed productdetails render this effect and change signle product details
useEffect(()=> {
  if(productDetails !== null){
    setOpenDetailsDialog(true)
  }
},[productDetails])


//handle cart item
function handleAddtoCart(getCurrentProductId){
  console.log(getCurrentProductId, "currentid");
  dispatch(addToCart({userId : user?.id, productId : getCurrentProductId, quantity : 1})).then(data => {
    if(data?.payload?.success){
      dispatch(fetchCartItems(user?.id))
      toast({
        title: "Product added to cart",
        description: "Product has been added to cart successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }
    
  }
  )
}

console.log(cartItems, "cart items");


  


  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6' >
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className='bg-background w-full rounded-lg shadow-sm' >
          <div className='p-4 border-b flex  items-center justify-between' >
            <h2 className='text-lg font-extrabold' >All Products</h2>
            <div className='flex items-center gap-3' >
              <span className='text-muted-foreground' >{productList.length} Products</span>
              <DropdownMenu>
              <DropdownMenuTrigger asChild >
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ArrowUpDownIcon className='h-4 w-4' />
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]" >
                  <DropdownMenuRadioGroup value={sort} onValueChange={handleSort} > {/*sort handler */}
                    {
                      sortOptions.map((sortItem)=>
                        <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id} >{sortItem.label}</DropdownMenuRadioItem>
                      )
                    }
                  </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>          
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4  ' >
                  {
                    productList && productList.length > 0 ?
                    productList.map((productItem)=>
                      <ShoppingProductTile 
                          handleGetProductDetails={handleGetProductDetails} 
                          product={productItem} 
                          handleAddtoCart={ handleAddtoCart}
                          />
                          
                    ) : null
                  }
          </div>
      </div>
      <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
    </div>
  )
}

export default ShoppingListing