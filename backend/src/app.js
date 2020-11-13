const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const products = [ 
    {
        "id": "70709795",
        "name": "Borracha Escolar Faber Castell Super Soft",
        "image": "https://savegnago.vteximg.com.br/arquivos/ids/293238_2",
        "category": "Bazar E Utilidades",
        "price": "5.39",
        "brand": "Faber Castell"
    },
    {
        "id": "70709271",
        "name": "Cereal Barra Linea 60g Cookies Cream",
        "image": "https://savegnago.vteximg.com.br/arquivos/ids/296943_2",
        "category": "Mercearia",
        "price": "4.99",
        "brand": "Linea"
    },
    {
        "id": "70712433",
        "name": "Sobremesa Chandelle 200g Chantilly Caramelo",
        "image": "https://savegnago.vteximg.com.br/arquivos/ids/268054_2",
        "category": "Laticínios",
        "price": "4.99",
        "brand": "Chandelle"
    }
];

app.get("/products", (request, response) => {
    return response.json(products);
});

app.get("/products/:id", (request, response) => {
    const { id } = request.params;
    
    const productIndex = products.findIndex(product => product.id == id);

    if(productIndex < 0) {
        return response.status(400).send();
    }

    return response.json(products[productIndex]);
});

app.get("/products/?name", (request, response) => {
    console.log('entrou')
    const { name } = request.params;
    
    const productIndex = products.find(product => product.name == name);

    if(productIndex < 0) {
        return response.status(400).send();
    }

    return response.json(products[productIndex]);
});

app.post("/products", (request, response) => {
    const { name, image, category, price, brand } = request.body

    const product = {
        id: uuid(),
        name,
        image,
        category,
        price,
        brand
    }

    products.push(product);

    return response.json(product);

});

app.put("/products/:id", (request, response) => {
    const { id } = request.params;
    const { name, image, category, price, brand } = request.body;
    
    const productIndex = products.findIndex(product => product.id == id);

    if(productIndex < 0) {
        return response.status(400).send();
    }

    const product = {
        id,
        name,
        image,
        category,
        price,
        brand
    };

    products[productIndex] = product;
    
    return response.json(product);
});

app.delete("/products/:id", (request, response) => {
    const { id } = request.params;

    const productIndex = products.findIndex(product => product.id == id);

    if(productIndex < 0) {
        return response.status(400).send();
    }

    products.splice(productIndex, 1);

    return response.status(204).send();
});

module.exports = app;
