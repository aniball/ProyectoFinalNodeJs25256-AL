import * as productModel  from "../models/products.models.js";

export const getAllProducts = async () => {
    return await productModel.getAllProducts();
};


export const getProductById = async (id) => {
    return await productModel.getProductById(id);
};


export const createProduct = async (productData) => {
    // Aquí se deberían realizar validaciones o enriquecimiento de datos 
    if (!productData.nombre || !productData.precio || !productData.categoria) {
        throw new Error("Datos de producto incompletos.");
    }
    return await productModel.saveProduct(productData);
};


export const deleteProduct = async (id) => {
    const product = await productModel.getProductById(id);
    //console.log("Producto a eliminar: ", product)
    if (!product) {
        throw new Error("Producto no encontrado.");
    }
    return await productModel.deleteProduct(id);
};
