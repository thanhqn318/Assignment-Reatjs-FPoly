import Menu from "./components/Menu/Menu";
import { BrowserRouter, Route, Router, Switch, Link } from 'react-router-dom';
function App() {
    return (
        <BrowserRouter>
            <header style={{backgroundColor: ' rgb(51, 112, 183)', height: '100px'}}></header>
            <div>
                <Menu />
            </div>
        </BrowserRouter>
    );
}


export default App;
