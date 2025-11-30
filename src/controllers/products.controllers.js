import * as productsService from '../services/products.services.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await productsService.getAllProducts(); 
        res.status(200).json(products); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor al obtener productos.' }); 
    }
};


export const getProductById = async (req, res) => {
    const id = req.params.id; 
    try {
        const product = await productsService.getProductById(id);
        if (product) {
            res.status(200).json(product); 
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor.' }); 
    }
};


export const createProduct = async (req, res) => {
    const productData = req.body; 
    try {
        const newProduct = await productsService.createProduct(productData);
        res.status(201).json({ 
            message: 'Producto creado satisfactoriamente', 
            product: newProduct 
        }); 
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: `Datos de entrada inválidos: ${error.message}` }); 
    }
};  


export const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        await productsService.deleteProduct(id);
        res.status(200).json({ message: `Producto con ID: ${id} eliminado con éxito` });
    } catch (error) {
        console.error(error);
        if (error.message.includes("no encontrado")) {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error interno al eliminar el producto.' });
    }
};