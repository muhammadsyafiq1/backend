import express, { Router } from "express"
import {
    getProducts,
    getPorductById,
    saveProduct,
    updateProduct,
    deleteProduct
} from "../controllers/ProductController.js"

const router = express.Router()

router.get('/products', getProducts)
router.get('/products/:id', getPorductById)
router.post('/products', saveProduct)
router.patch('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)

export default router