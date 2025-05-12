// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import {XpProvider} from "./components/context/XpContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <XpProvider>
                <App />
            </XpProvider>
        </BrowserRouter>
    </React.StrictMode>
);
