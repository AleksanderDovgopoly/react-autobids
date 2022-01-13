import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import HomePage from "./pages/home-page/homePage";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import Header from "./components/header/header";
import SellCar from "./pages/sell-car/sell-car";
import AuctionDetail from "./pages/auction-detail/auction-detail";
import UserDetail from "./pages/user-detail/user-detail";

function App() {
    const loggedIn = useSelector(state => state.user.isLogin);

    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route exact path='/' element={<HomePage/>}/>
                <Route path='/sign-in' element={<SignInAndSignUpPage/>}/>
                <Route path='/auctions/:auctionId' element={<AuctionDetail/>}/>
                <Route path='/user/:userId' element={<UserDetail/>}/>
                <Route path='/sell-car' element={
                    loggedIn ? <SellCar/> : <Navigate to="/sign-in"/>
                }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
