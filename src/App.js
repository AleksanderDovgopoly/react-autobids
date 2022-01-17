import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import HomePage from "./pages/home-page/homePage";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import Header from "./components/header/header";
import SellCar from "./pages/sell-car/sell-car";
import AuctionDetail from "./pages/auction-detail/auction-detail";
import UserDetail from "./pages/user-detail/user-detail";
import PastAuctions from "./pages/past-auctions/past-auctions";
import SearchPage from "./pages/search-page/search-page";
import MyAccount from "./pages/my-account/my-account";

function App() {
    const loggedIn = useSelector(state => state.user.isLogin);

    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route exact path='/' element={<HomePage/>}/>
                <Route path='/sign-in' element={<SignInAndSignUpPage/>}/>
                <Route path='/my-account' element={
                    loggedIn ? <MyAccount/> : <Navigate to="/sign-in"/>
                }/>
                <Route path='/past-auctions' element={<PastAuctions/>}/>
                <Route path='/auctions/:auctionId' element={<AuctionDetail/>}/>
                <Route path='/user/:userId' element={<UserDetail/>}/>
                <Route path='/search/:query' element={<SearchPage/>}/>
                <Route path='/sell-car' element={
                    loggedIn ? <SellCar/> : <Navigate to="/sign-in"/>
                }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
