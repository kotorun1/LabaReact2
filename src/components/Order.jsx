import React from "react";

export default function Order({order}){
    return(<div>
        <h1>Order</h1>
        {order.map((item)=>{
            return(<li>
                {item.name} - {item.quantity}
                </li>
            )
        })}
    </div>
        
    )
}