import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/common/Header'
import Home from './components/pages/Home'
import { BrowserRouter, Routes } from 'react-router'
import { Route } from 'react-router'
import Cart from './components/pages/Cart'
import MainLayout from './components/common/MainLayout'
import MainContext from './context/MainContext'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainContext>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout/>}>
                  <Route path={'/'} element={<Home/>} />
                  <Route path={'/cart'} element={<Cart/>} />
            </Route>
            {/* http://localhost:5173/ */}
          
          </Routes>
        </BrowserRouter>

    </MainContext>
  </StrictMode>,
)
