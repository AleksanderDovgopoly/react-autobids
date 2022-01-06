import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./pages/home-page/homePage";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import Header from "./components/header/header";
import SellCar from "./pages/sell-car/sell-car";
import {useSelector} from "react-redux";
import AuctionDetail from "./pages/auction-detail/auction-detail";

function App() {
    const loggedIn = useSelector(state => state.user.isLogin);

    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route exact path='/' element={<HomePage/>}/>
                <Route path='/sign-in' element={<SignInAndSignUpPage/>}/>
                <Route path='/auctions/:auctionId' element={<AuctionDetail/>}/>
                <Route path='/sell-car' element={
                    loggedIn ? <SellCar/> : <Navigate to="/sign-in"/>
                }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
