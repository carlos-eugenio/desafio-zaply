import React, { useState } from "react";
import ProductDataService from "../services/ProductService";

const AddProduct = () => {
    const initialProductState = {
        id: null,
        name: "",
        image: "",
        category: "",
        price: "",
        brand: ""
    };
    const [product, setProduct] = useState(initialProductState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };

    const saveProduct = () => {
        var data = {
            name: product.name,
            image: product.image,
            category: product.category,
            price: product.price,
            brand: product.brand
        };
        ProductDataService.create(data)
        .then(response => {
            setProduct({
                id: response.data.id,
                title: response.data.name,
                image: response.data.image,
                category: response.data.category,
                price: response.data.price,
                brand: response.data.brand
            });
            setSubmitted(true);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    return (
        <div className="card">
            <div className="aside" style={{  
                backgroundImage: `url('${process.env.PUBLIC_URL}/images/aside-img.png')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
                }}>
            </div>
            <div className="details">
                <div className="item">
                    <label htmlFor="name">Nome</label>
                    <input type="text" className="form-control" id="name" required value={product.name} onChange={handleInputChange} name="name" />
                </div>

                <div className="item">
                    <label htmlFor="image">Imagem</label>
                    <input type="text" className="form-control" id="image" required value={product.image} onChange={handleInputChange} name="image" />
                </div>

                <div className="item">
                    <label htmlFor="category">Categoria</label>
                    <input type="text" className="form-control" id="category" required value={product.category} onChange={handleInputChange} name="category" />
                </div>

                <div className="item">
                    <label htmlFor="price">Preço</label>
                    <input type="text" className="form-control" id="price" required value={product.price} onChange={handleInputChange} name="price" />
                </div>

                <div className="item">
                    <label htmlFor="brand">Marca</label>
                    <input type="text" className="form-control" id="brand" required value={product.brand} onChange={handleInputChange} name="brand" />
                </div>

                {submitted ? (
                    <button className="success-button">
                        Produto cadastrado
                    </button>
                ) : (
                    <button onClick={saveProduct} className="save-button">
                        Salvar
                    </button>
                )}   
            </div>
        </div>
    );
};

export default AddProduct;
