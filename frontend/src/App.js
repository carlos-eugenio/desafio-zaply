import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import './App.css';
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import ProductsList from "./components/ProductsList";

function App() {
    return (
        <div>
            <div className="header-page">
                {/* <a href="/products" className="navbar-brand">
                  Produtos
                </a> */}
                <div className="links">
                    <Link to={"/products"} > Listar produtos </Link>
                    <Link to={"/add"} > Adicionar produto</Link>
                </div>
            </div>
            <Switch>
                <Route exact path={["/", "/products"]} component={ProductsList} />
                <Route exact path="/add" component={AddProduct} />
                <Route path="/products/:id" component={Product} />
            </Switch>
        </div>
    );
}

export default App;
