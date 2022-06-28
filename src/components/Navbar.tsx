import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Badge, Drawer } from "@mui/material";
import "./Items/navbar.css"
import Cart from "./Cart/Cart";
export interface CartItemType{
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}
type Props = {
  cartItems:CartItemType[];
 product?:CartItemType[];
  getTotalItems:(items:CartItemType[])=>number
  addToCart:(clicked:CartItemType)=>void;
  removeFromCart:(id:number)=>void
}

const Navbar:React.FC<Props> = ({product,cartItems, getTotalItems,addToCart,removeFromCart}) => {
  // console.log(addToCart)
  
  
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <h1>E-commerce</h1>
          </Link>
          <div className="d-flex justift-content-end" >
            <div className="iconBadge" onClick={() => setIsCartOpen(true)}>
            <Badge color="secondary" badgeContent={getTotalItems(cartItems)} showZero>
              <AddShoppingCartIcon  />
            </Badge>
            </div>
            <Drawer
              anchor={"right"}
              open={isCartOpen}
              onClose={() => setIsCartOpen(false)}
            >
              <Cart cartItems={cartItems} removeFromCart={removeFromCart} addToCart={addToCart} />
            </Drawer>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
