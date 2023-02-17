import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

export default function Cart({cart, AddOrder ,incrementQuantity, decrementQuantity,handleDelete}) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/order");
      };
    
    return (
        <div>
            <h1>Cart</h1>
            {cart.map((item) => (
          <li key={item.id}>
          {item.name} ({item.quantity})
            <button onClick={()=>{incrementQuantity(item.id)}}>+</button>
            <button onClick={()=>{decrementQuantity(item.id)}}>-</button>
            <button onClick={()=>{handleDelete(item.id)}}>удалить</button>

        </li>
        ))}
        <button onClick={()=>{AddOrder();handleClick()}}>Добавить в лист Заказов</button>
        </div>
    )
}



