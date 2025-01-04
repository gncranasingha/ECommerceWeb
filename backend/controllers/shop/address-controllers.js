const Address = require('../../models/Address')

const addAddress = async () => {
 
    try {

        const {userId, address, city, pincode, phone, notes} = req.body

        if(!userId || !address || !city || !pincode || !phone || !notes){
            return res.status(400).json({
                success: false,
                message : 'Please fill all the fields'
            })
        }

        const newAddresscreated = new Address({
            userId,
            address,
            city,
            pincode,
            phone,
            notes
        })

        await newAddresscreated.save()

        res.status(201).json({
            success: true,
            data : newAddresscreated
           
        })

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message : 'Error'
        })
    }
  
}

const fetchAllAddress =  async () => {
 
    try {

        const {userId} = req.params

        if(!userId){
            return res.status(400).json({
                success: false,
                message : 'user id is required'
            })
        }

        const addressList = await Address.find({userId})

        res.status(200).json({
            success: true,
            data : addressList
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message : 'Error'
        })
    }
  
}

const editAddress = async() => {
 
    try {

        const {userId, addressId} = req.params

        if(!userId || !addressId){
            return res.status(400).json({
                success: false,
                message : 'user id and address id is required'
            })
        }

        const formdata = req.body

       

        const addressUpdated = await Address.findOneAndUpdate({
            userId,
            _id: addressId
        }, formdata, {new: true
        })

        if(!addressUpdated){
            return res.status(404).json({
                success: false,
                message : 'Address not found'
            })
        }

        res.status(200).json({
            success: true,
            data : addressUpdated
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message : 'Error'
        })
    }
  
}

const deleteAddress = async () => {
 
    try {

        const {userId, addressId} = req.params

        if(!userId || !addressId){
            return res.status(400).json({
                success: false,
                message : 'user id and address id is required'
            })
        }

        const addressDeleted = await Address.findOneAndDelete({
            userId,
            _id: addressId
        })

        if(!addressDeleted){
            return res.status(404).json({
                success: false,
                message : 'Address not found'
            })
        }

        res.status(200).json({
            success: true,
            message : 'Address deleted'
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message : 'Error'
        })
    }
  
}



module.exports = {
    addAddress,
    fetchAllAddress,
    editAddress,
    deleteAddress
}