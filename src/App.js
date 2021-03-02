import Menu from "./components/Menu/Menu";
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
function App() {



    return (
        <BrowserRouter>
            <div>
                <Menu />
            </div>
        </BrowserRouter>
    );
}


export default App;
