const express = require('express');
const ProductManager = require('./ProductManager'); 
const fs = require('fs');

const app = express();
const port = 3000;

const productManagerInstance = new ProductManager("products.json");

app.use(express.json()); 


app.get('/products', (req, res) => {
  let products = productManagerInstance.getProducts();

  
  const limit = req.query.limit;
  if (limit) {
    products = products.slice(0, parseInt(limit)); 
  }

  res.json({ products });
});


app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    const product = productManagerInstance.getProductById(productId);
    res.json({ product });
  } catch (error) {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

