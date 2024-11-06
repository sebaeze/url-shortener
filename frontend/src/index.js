import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ShortUrlRedirect from "./ShortUrlRedirect";
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter as Router, Routes} from "react-router-dom";

if (module.hot) {module.hot.accept();}

const root = ReactDOM.createRoot(document.getElementById('root'));
document.title="URL Shortener";

root.render(
        <Router>
            <Routes>
                <Route path="/" element={<App/>}  />
                <Route path="/:shortUrl" element={<ShortUrlRedirect/>}  />
            </Routes>
        </Router>
);

reportWebVitals();
