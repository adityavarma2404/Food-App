import {
  configureStore,
  combineReducers
} from "@reduxjs/toolkit";
import { cartSlice } from "./cart-slice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  cart: cartSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
//   If using Redux-Persist, you should specifically ignore all the action types it dispatches:
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type Rootstate = ReturnType<typeof store.getState>;
















// export const store = configureStore({
//   // reducer: cartSlice.reducer
//   reducer: {
//     cart: cartSlice.reducer,
//   },
// });

// export type AppDispatch = typeof store.dispatch;
// export type Rootstate = ReturnType<typeof store.getState>;
