import { BrowserRouter, Route, Router, Switch, Link } from 'react-router-dom';
import Category from '../categories/Category';
import Product from '../products/Product';

function Menu() {
    return (
        <div>
            <BrowserRouter>
                <div className="navbar navbar-default">
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
                </div>
                <div  className='container'>
                    <Switch>
                        <Route path="/category">
                            <Category />
                        </Route>
                        <Route path="/product">
                            <Product />
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default Menu;