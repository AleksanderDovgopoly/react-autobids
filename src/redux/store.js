import {configureStore} from "@reduxjs/toolkit";
import reducer from "./rootReducer";

export default configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});