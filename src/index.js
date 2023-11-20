import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthProvider from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/Account/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    //   <App />
    // </React.StrictMode>
    <BrowserRouter>
        <AuthProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Routes>
                        <Route path="/*" element={<App />} />
                    </Routes>
                </PersistGate>
            </Provider>
        </AuthProvider>
    </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
