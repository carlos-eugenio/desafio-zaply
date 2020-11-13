import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductService";

const Product = props => {
    const initialProductState = {
        id: null,
        name: "",
        image: "",
        category: "",
        price: "",
        brand: ""
    };
    const [currentProduct, setCurrentProduct] = useState(initialProductState);
    const [message, setMessage] = useState(false);

    const getProduct = id => {
        ProductDataService.get(id)
        .then(response => {
            setCurrentProduct(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    useEffect(() => {
        getProduct(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentProduct({ ...currentProduct, [name]: value });
    };

    const updateProduct = () => {
        var data = {
            id: currentProduct.id,
            name: currentProduct.name,
            image: currentProduct.image,
            category: currentProduct.category,
            price: currentProduct.price,
            brand: currentProduct.brand
        };

        ProductDataService.update(currentProduct.id, data)
        .then(response => {
            setCurrentProduct({ ...currentProduct, data });
            setMessage(true);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    const deleteProduct = () => {
        ProductDataService.remove(currentProduct.id)
        .then(response => {
            console.log(response.data);
            props.history.push("/products");
        })
        .catch(e => {
            console.log(e);
        });
    };

    return (
        <div className="card">
            {currentProduct ? (
            <>
                <div className="aside" style={{  
                    backgroundImage: `url('${currentProduct.image}')`,
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat'
                    }}>
                </div>
                <div className="details">
                    <div className="item">
                        <label htmlFor="name">Nome</label>
                        <input type="text" className="form-control" id="name" required value={currentProduct.name} onChange={handleInputChange} name="name" />
                    </div>

                    <div className="item">
                        <label htmlFor="image">Imagem</label>
                        <input type="text" className="form-control" id="image" required value={currentProduct.image} onChange={handleInputChange} name="image" />
                    </div>

                    <div className="item">
                        <label htmlFor="category">Categoria</label>
                        <input type="text" className="form-control" id="category" required value={currentProduct.category} onChange={handleInputChange} name="category" />
                    </div>

                    <div className="item">
                        <label htmlFor="price">Preço</label>
                        <input type="text" className="form-control" id="price" required value={currentProduct.price} onChange={handleInputChange} name="price" />
                    </div>

                    <div className="item">
                        <label htmlFor="brand">Marca</label>
                        <input type="text" className="form-control" id="brand" required value={currentProduct.brand} onChange={handleInputChange} name="brand" />
                    </div>
                    <div className="edit-page-button">
                        {message ? (
                            <button className="success-button">
                                Atualizado
                            </button>
                        ) : (
                            <button className="save-button" onClick={updateProduct}>
                                Atualizar
                            </button>
                        )}                           
                        <button className="delete-button" onClick={deleteProduct}>
                            Excluir
                        </button>
                    </div>    
                </div>
            </>
            ) : (
            <div>
            <br />
            <p>Selecione um produto...</p>
            </div>
            )}
        </div>
    );
};

export default Product;
