import Product from "../models/ProductModel.js"
import path from "path"

export const getProducts = async (req, res) => {
    try {
        const response = await Product.findAll()
        res.json(response)
    } catch (error) {
        console.log(error.message);
    }
}

export const getPorductById = async (req, res) => {
    try {
        const response = await Product.findOne({
            where:{
                id: req.params.id
            }
        })
        res.json(response)
    } catch (error) {
        console.log(error.message);
        
    }
}

export const saveProduct = (req, res) => {
    if(req.files === null) return res.status(400).json({message: "Photo is required"})
    const name = req.body.title
    const file = req.files.file
    const fileSize = file.data.length
    const ext = path.extname(file.name)
    const fileName = file.md5 + ext
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`
    const allowedType = ['.png','.jpg','.jpeg']

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid type"})
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be 5 MB"})

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message})
        try {
            await Product.create({
                name: name,
                image: fileName,
                url: url
            })
            res.status(201).json({msg: "Successfully"})
        } catch (error) {
            console.log(err.message);
        }
    })
}

export const updateProduct = (req, res) => {

}

export const deleteProduct = (req, res) => {
    
}