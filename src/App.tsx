import "./App.css";
import "./media-queries.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import HeaderHelp from "./components/HeaderHelp";
import RootLayout from "./components/RootLayout";
import { HomePage } from "./components/RootLayout";
import Search from "./components/Search";
import Cart from "./components/Cart";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import MobileView from "./MobileView";


const homeRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/help", element: <HeaderHelp /> },
      { path: "/search", element: <Search /> },
      { path: "/cart", element: <Cart /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace/>
  },
  {
    path: '/help/*',
    element: <Navigate to="/help" replace/>
  },
  {
    path: '/search/*',
    element: <Navigate to="/search" replace/>
  },
  {
    path: '/cart/*',
    element: <Navigate to="/cart" replace/>
  },
]);

const mobileView = createBrowserRouter([
  {
    path: "/",
    element: <MobileView />,
  },
]);

export let persist = persistStore(store);

function App() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /iphone|android/.test(userAgent);

  return (
    <Provider store={store}>
      <PersistGate persistor={persist}>
        <RouterProvider router={isMobile ? mobileView : homeRouter} />
      </PersistGate>
    </Provider>
  );
}

export default App;
