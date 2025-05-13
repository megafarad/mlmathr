// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import {XpProvider} from "./components/context/XpContext.tsx";
import {AuthProvider} from "./components/context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <XpProvider>
                    <App />
                </XpProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
