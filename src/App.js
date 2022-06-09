import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import './App.css';
import Search from "./components/search/Search";
import Details from "./components/details/Details";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Search/>}></Route>
                <Route path="/beer/:id" element={<Details/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
