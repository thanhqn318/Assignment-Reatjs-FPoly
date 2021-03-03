import { BrowserRouter, Route, Router, Switch, Link } from 'react-router-dom';
import Category from '../categories/Category';
import Product from '../products/Product';
import App from "../../App.css"
import RecycleBin from '../../recycleBin/RecycleBin';
import { useState } from 'react';

function Menu() {
    const [listCategory, setListCategory] = useState([]);
    const [danhMucId, setDanhMucId] = useState(-1);
    const urlParams = new URLSearchParams(window.location.search);
    const pageInit = urlParams.get('page') != null ? parseInt(urlParams.get('page')) : 1;
    const [page, setPage] = useState(pageInit)

    return (
        <div>
            <BrowserRouter>
                <div id="wrapper">
                    <div id="sidebar-wrapper">
                        <ul class="sidebar-nav">
                            <li>
                                <Link to="/product">Quản lý sản phẩm</Link>
                            </li>
                            <li>
                                <Link to="/category">Quản lý danh mục</Link>
                            </li>
                            <li>
                                <Link to="/recycleBin">Thùng rác</Link>
                            </li>
                        </ul>
                    </div>

                    <div id="page-content-wrapper">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-lg-12">
                                    <Switch>
                                        <Route path="/category">
                                            <Category />
                                        </Route>
                                        <Route path="/product">
                                            <Product />
                                        </Route>
                                        <Route path="/recycleBin">
                                            <RecycleBin />
                                        </Route>
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* <div className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand">ThanhQN</a>
                        </div>
                        <ul className="nav navbar-nav">
                            <li className="active">
                                <a>Home</a>
                            </li>
                            <li>
                                <Link to="/product">Quản lý sản phẩm</Link>
                            </li>
                            <li>
                                <Link to="/category">Quản lý danh mục</Link>
                            </li>
                        </ul>
                    </div>
                </div> */}
                {/* <div className='container'>
                    <Switch>
                        <Route path="/category">
                            <Category />
                        </Route>
                        <Route path="/product">
                            <Product />
                        </Route>
                    </Switch>
                </div> */}
            </BrowserRouter>
        </div>
    )
}

export default Menu;