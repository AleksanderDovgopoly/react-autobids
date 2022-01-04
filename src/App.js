import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/home-page/homePage";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import Header from "./components/header/header";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route exact path='/' element={<HomePage/>}/>
                <Route path='/sign-in' element={<SignInAndSignUpPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
