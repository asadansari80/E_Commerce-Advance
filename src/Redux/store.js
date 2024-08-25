import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { usersReducer } from "./usersSlice";
import { cartReducer } from "./cartSlice";
// import asynchronousReducer from "./asynchronousCall";

const rootReducer = combineReducers({
  user: usersReducer,
  cart: cartReducer,
});
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});
const persistor = persistStore(store);

export { store, persistor };
