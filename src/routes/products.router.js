import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager('./src/data/products.json');

// GET all products
router.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

// GET product by ID
router.get('/:pid', async (req, res) => {
  const product = await productManager.getProductById(req.params.pid);
  product ? res.json(product) : res.status(404).send({ error: 'Producto no encontrado' });
});

// POST create new product
router.post('/', async (req, res) => {
  const newProduct = await productManager.addProduct(req.body);
  res.status(201).json(newProduct);
});

// PUT update product
router.put('/:pid', async (req, res) => {
  const updated = await productManager.updateProduct(req.params.pid, req.body);
  updated ? res.json(updated) : res.status(404).send({ error: 'Producto no encontrado' });
});

// DELETE product
router.delete('/:pid', async (req, res) => {
  const result = await productManager.deleteProduct(req.params.pid);
  result ? res.json({ message: 'Producto eliminado' }) : res.status(404).send({ error: 'Producto no encontrado' });
});

export default router;
