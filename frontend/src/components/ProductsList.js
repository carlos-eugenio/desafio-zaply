import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductService";
import { Link } from "react-router-dom";

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        retrieveProducts();
    }, []);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const retrieveProducts = () => {
        ProductDataService.getAll()
        .then(response => {
            setProducts(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    const findByName = () => {
        ProductDataService.findByName(searchName)
        .then(response => {
            setProducts(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    return (
        <div class="card table-container">
            <div class="header">
                <input type="text" placeholder="Procurar por nome" value={searchName} onChange={onChangeSearchName} /> 
                <button type="button" onClick={findByName}>
                    Pesquisar
                </button>
            </div> 
            <table width="100%">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Marca</th>
                        <th>Categoria</th>
                        <th>Ação</th>
                    </tr>    
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>
                                <span style={{  
                                    backgroundImage: `url('${product.image}')`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat'
                                    }}></span>
                                {product.name}
                            </td>
                            <td>R$ {product.price}</td>
                            <td>{product.brand}</td>
                            <td>{product.category}</td>
                            <td>
                                <Link to={"/products/" + product.id}>
                                    Editar
                                </Link>
                            </td>
                        </tr>
                    ))} 
                </tbody>  
            </table>
        </div>
    );
};

export default ProductsList;