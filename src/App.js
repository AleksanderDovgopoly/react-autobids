import {useEffect} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllCategoriesList, fetchAuctions, fetchBrandsAndModels} from "./firebase/firebase.utils";
import {fetchCategoriesCollection} from "./redux/categories/categories.actions";
import {fetchAuctionsAction} from "./redux/auctions/auctions.actions";
import HomePage from "./pages/home-page/homePage";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import Header from "./components/header/header";
import SellCar from "./pages/sell-car/sell-car";
import AuctionDetail from "./pages/auction-detail/auction-detail";
import UserDetail from "./pages/user-detail/user-detail";
import PastAuctions from "./pages/past-auctions/past-auctions";
import SearchPage from "./pages/search-page/search-page";
import MyAccount from "./pages/my-account/my-account";
import WatchList from "./pages/watch-list/watch-list";
import ScrollToTop from "./hoc/scrollToTop";

function App() {
    const loggedIn = useSelector(state => state.user.isLogin);
    const dispatch = useDispatch();
    const {isFetching} = useSelector(state => state.categories);
    const isCarsFetching = useSelector((state => state.auctions.isFetching));

    useEffect(async () => {
        if (!isCarsFetching) {
            const auctionsCollection = await fetchAuctions();
            dispatch(fetchAuctionsAction(auctionsCollection));
        }
    }, [dispatch, isCarsFetching]);

    useEffect(async () => {
        if (!isFetching) {
            let fetchingData = {};
            fetchingData['taxonomies'] = await fetchAllCategoriesList();
            fetchingData['brand_models'] = await fetchBrandsAndModels();
            dispatch(fetchCategoriesCollection(fetchingData));
        }
    }, [dispatch, isFetching]);

    return (
        <BrowserRouter>
            <ScrollToTop>
                <Header/>
                <Routes>
                    <Route exact path='/' element={<HomePage/>}/>
                    <Route path='/sign-in' element={<SignInAndSignUpPage/>}/>
                    <Route path='/my-account' element={
                        loggedIn ? <MyAccount/> : <Navigate to="/sign-in"/>
                    }/>
                    <Route path='/watchlist' element={
                        loggedIn ? <WatchList/> : <Navigate to="/sign-in"/>
                    }/>
                    <Route path='/past-auctions' element={<PastAuctions/>}/>
                    <Route path='/auctions/:auctionId' element={<AuctionDetail/>}/>
                    <Route path='/user/:userId' element={<UserDetail/>}/>
                    <Route path='/search/:made/:model' element={<SearchPage/>}/>
                    <Route path='/search/:made' element={<SearchPage/>}/>
                    <Route path='/sell-car' element={
                        loggedIn ? <SellCar/> : <Navigate to="/sign-in"/>
                    }/>
                </Routes>
            </ScrollToTop>
        </BrowserRouter>
    );
}

export default App;
