import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import ProductPage from './pages/ProductPage'
import Admin from './pages/Admin'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App/>}>
            <Route index element={<Home/>} />
            <Route path='about' element={<About/>} />
            <Route path='products' element={<Products/>} />
            <Route path='product/:id' element={<ProductPage/>} />
            <Route path='blog' element={<Blog/>} />
            <Route path='blog/:slug' element={<BlogPost/>} />
            <Route path='login' element={<Login/>} />
            <Route path='register' element={<Register/>} />
            <Route path='profile' element={<Profile/>} />
            <Route path='cart' element={<Cart/>} />
            <Route path='admin' element={<Admin/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)
