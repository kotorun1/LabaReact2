import React, { useState,useEffect } from 'react'
import uuid from 'react-uuid';
import Cart from './Cart';
import LoginForm from './LoginForm'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";




import './App.css';
// компоненты
import Home from './Home';
import Header from './Header';
import RegistrationForm from "./RegistrationForm";
import Order from './Order'
import Loader from './Loader'
import './Loader.css'


function App() {
  // стейты
  const [pets, setPets] = useState([]);
  const [initPets, setInitPets] = useState([]);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState()

  // авторизация + регистрация

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([
    { id: uuid(), name: 'admin', password: 'admin', email: 'admin@ad.ad' },
    { id: uuid(), name: 'user', password: 'user', email: 'user@Ad.as' },
  ]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleRegister = (user) => {
    setUsers([
      ...users,
      { id: uuid(), name: user.username, password: user.password, email: user.email },
    ]);
  };

  // функции

  // Определяем URL для запроса
  const API_URL = 'https://petstore.swagger.io/v2/pet/findByStatus?status=available';

  const getPets = async () => {
    // Запрашиваем данные с API
    const response = await fetch(API_URL);
    const data = await response.json();
    setPets(data);
  };

  // функция добавления в корзину с проверкой на совпадение id
  const addToCart = (id) => {
    const pet = pets.find((pet) => pet.id === id);
    const existingCartItemIndex = cart.findIndex((item) => item.id === id);
    if (existingCartItemIndex !== -1) {
      const newCart = [...cart];
      newCart[existingCartItemIndex].quantity++;
      setCart(newCart);
    } else {
      setCart([...cart, { id, name: pet.name, quantity: 1 }]);
    }
  };

  
useEffect(() => {
  setLoading(true)
  getPets();
  setLoading(false)


  });

  
// Функция для увеличения количества товара в корзине
function incrementQuantity(itemId) {
  setCart(prevCart => {
    const itemIndex = prevCart.findIndex(item => item.id === itemId);
    if (itemIndex >= 0) {
      // Товар уже есть в корзине
      const updatedItem = {...prevCart[itemIndex], quantity: prevCart[itemIndex].quantity + 1};
      const updatedCart = [...prevCart];
      updatedCart[itemIndex] = updatedItem;
      return updatedCart;
    } else {
      // Товара еще нет в корзине
      const newItem = {id: itemId, quantity: 1};
      return [...prevCart, newItem];
    }
  });
}

// Функция для уменьшения количества товара в корзине
function decrementQuantity(itemId) {
  setCart(prevCart => {
    const itemIndex = prevCart.findIndex(item => item.id === itemId);
    if (itemIndex >= 0) {
      const updatedItem = {...prevCart[itemIndex], quantity: prevCart[itemIndex].quantity - 1};
      if (updatedItem.quantity <= 0) {
        // Удаляем товар из корзины, если количество стало нулевым
        const updatedCart = [...prevCart];
        updatedCart.splice(itemIndex, 1);
        return updatedCart;
      } else {
        const updatedCart = [...prevCart];
        updatedCart[itemIndex] = updatedItem;
        return updatedCart;
      }
    } else {
      // Товара еще нет в корзине, ничего не делаем
      return prevCart;
    }
  });



}
const handleDelete = (id) => {
  setCart(cart.filter(item => item.id !== id));
}

  function AddOrder(){
    setOrder(cart)
    setCart([])
}









return (
<div>
<Router>
    <Header handleLogout ={handleLogout} isLoggedIn = {isLoggedIn}/>
    {loading ==='true' ?<Loader/>:
    <Routes>
      <Route path="/" element={<Home getPets={getPets} pets = {pets}  isLoggedIn = {isLoggedIn} addToCart = {addToCart} />} />
      <Route path="/registration" element={<RegistrationForm onRegister={handleRegister}  isLoggedIn = {isLoggedIn}/>} />
      <Route path="/login" element={<LoginForm onLogin={handleLogin} users = {users} isLoggedIn = {isLoggedIn}/>} />
      {isLoggedIn&&<Route path="/cart" element={<Cart cart={cart} AddOrder ={AddOrder} 
      incrementQuantity = {incrementQuantity} decrementQuantity = {decrementQuantity} handleDelete ={handleDelete}  />} />}
      {isLoggedIn&&<Route path="/order" element={<Order order ={order} />} />}

      
    </Routes>}
    </Router>
</div>
  );
}

export default App;