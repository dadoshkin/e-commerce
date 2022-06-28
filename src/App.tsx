import { Grid, LinearProgress } from "@mui/material";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import { useQuery } from "react-query";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Cart from "./components/Cart/Cart";
import CartItems from "./components/CartItems/CartItems";
import Items from "./components/Items/Items";
import { Wrapper } from "./components/Items/items.style";
import Navbar, { CartItemType } from "./components/Navbar";

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();
function App() {
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    `products`,
    getProducts
  );
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const getTotalItems = (items: CartItemType[]) => items.reduce((ack:number,item)=> ack+item.amount,0);
  const handleAddToCart = (clicked: CartItemType) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clicked.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clicked.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clicked, amount: 1 }];
    });
  };
  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };
  console.log(cartItems)
  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <>
      <Navbar product={data} cartItems={cartItems}  getTotalItems={getTotalItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}/>
      
      <Wrapper>
        <Grid container spacing={3}>
          {data?.map((item) => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Items item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      </Wrapper>
   
    </>
  );
}
export default App;
