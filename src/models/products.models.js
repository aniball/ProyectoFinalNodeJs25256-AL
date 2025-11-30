import { db } from "../data/data.js";
import { doc, getDoc, collection, getDocs, setDoc, addDoc, deleteDoc, } from "firebase/firestore";

const productsCollection = collection(db, "products");

export async function getProductById(id) {
    const productDoc = await getDoc(doc(productsCollection, id));
    if (productDoc.exists()) {
    return productDoc.data();
    } else {
    return null;
    }
};

export async function getAllProducts() {
    const querySnapshot = await getDocs(productsCollection);
    const products = [];
    querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
    });
    console.log("Productos obtenidos: ", products)
    return products;
};


export async function saveProduct(product) {
    const docRef = await addDoc(productsCollection, product);
    return { id: docRef.id, ...product };
};

export async function deleteProduct(id) {
    await deleteDoc(doc(productsCollection, id));
    return true;
};

