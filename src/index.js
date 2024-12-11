import Main from '@pages/Main';
import Actions from '@pages/Actions';
import Action from '@pages/Action';
import Product from '@pages/Product';
import SelectCity from '@pages/SelectCity';
import Auth from '@pages/Auth';
import Profile from '@pages/Profile';
import EditProfile from '@pages/EditProfile';
import AuthError from '@pages/AuthError';
import Addresses from '@pages/Addresses';
import AddAddress from '@pages/AddAddress';
import SearchPage from '@pages/SearchPage';



import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot, useRecoilState } from 'recoil';
import useAuth from '@scripts/custom_hooks/useAuth';
import useCity from '@scripts/custom_hooks/useCity';
import { isUserFetchingState } from '@scripts/atoms/authState';
import reportWebVitals from './reportWebVitals';
import { useEffect } from 'react';


import '@fonts/fonts.scss'
import '@globalStyles/globals.scss';
import '@globalStyles/mixins.scss';
import '@globalStyles/normalize.scss';
import '@globalStyles/variables.scss';

const App = (props) => {
  const [isUserFetching, setIsUserFetching] = useRecoilState(isUserFetchingState);

  const {
    initUser,
    isAuthorised
  } = useAuth();

  useEffect(() => {
    if (!isUserFetching && !isAuthorised) {
      setIsUserFetching(true)
      initUser()
      setIsUserFetching(false)
    }
  }, [isAuthorised, isUserFetching])

  return props.children
}

const InitCity = (props) => {
  const {
    initCity
  } = useCity()

  useEffect(() => {
    initCity()
  }, [])

  return props.children
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App>
        <Router>
          <InitCity>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/actions" element={<Actions />} />
              <Route path="/actions/:id" element={<Action />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/city" element={<SelectCity />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/profile/addresses" element={<Addresses />} />
              <Route path="/profile/addresses/add" element={<AddAddress />} />
            </Routes>
          </InitCity>
        </Router>
      </App>
    </RecoilRoot>
  </React.StrictMode>
);


reportWebVitals();
