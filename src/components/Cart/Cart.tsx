import CartItems from "../CartItems/CartItems";
import { CartItemType } from "../Navbar";
import { Wrapper } from "./Cart.styles";

type Props = {
    cartItems ?: CartItemType[];
    addToCart:(clicked:CartItemType)=>void;
    removeFromCart:(id:number)=>void;
}


const Cart:React.FC<Props > = ({cartItems,addToCart,removeFromCart}) => {
   
    return (
    <div>
        <Wrapper>
            <h1>Hello </h1>
            {
              cartItems?.length &&  cartItems.map((item)=>(
                    <CartItems item={item} addToCart={addToCart}  removeFromCart={removeFromCart}/>
                ))
            }
        </Wrapper>

    </div>
  )
}
export default Cart