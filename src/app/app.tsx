import {Route, BrowserRouter, Routes} from 'react-router-dom';

import {AppRoute,AuthorizationStatus, CityMap} from '../const';
import MainPage from '../pages/main-page/main-page';
import OfferPage from '../pages/offer-page/offer-page';
import FavoritePage from '../pages/favorites-page/favorites-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import LoginPage from '../pages/login-page/login-page';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import PrivateRoute from '../components/private-route/private-route';
import LayoutMain from '../components/Layout-main/layout-main';
import { HelmetProvider } from 'react-helmet-async';

import {OfferPreview} from '../types/offer';
import { newUser, OFFERS_DETAIL } from '../mocks/offers';
import { useState } from 'react';
import { User } from '../types/user';


type AppScreenProps = {
  offers : OfferPreview[];
}
type AppState = {
  authStatus : AuthorizationStatus;
  favoritesCount : number;
  user:User;
}

function App({offers}: AppScreenProps): JSX.Element {
  const initAppState: AppState = {authStatus:AuthorizationStatus.NoAuth,favoritesCount:3,user : newUser};
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [appState,setAppState] = useState(initAppState);
  const {authStatus, favoritesCount,user} = appState;

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element ={<LayoutMain favoritesCount = {favoritesCount} authStatus = {authStatus} currentUser = {user}/>}>
            <Route
              path={AppRoute.Main}
              index element={<MainPage offers = {offers} locations ={CityMap} currentCity = {CityMap.Amsterdam}/>}
            />
            <Route
              path={AppRoute.Favorites}
              element={
                // <PrivateRoute
                // authorizationStatus={AuthorizationStatus.NoAuth}
                // >
                <FavoritePage offers = {offers}/>
                // </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.OfferId}
              element={<OfferPage offers = {Array.from([OFFERS_DETAIL[0]])} authStatus = {authStatus} />}
            />

            <Route
              path={AppRoute.Login}
              element={<LoginPage />}
            />

            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
