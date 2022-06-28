import { Button } from '@mui/material';
import React from 'react'
import { CartItemType } from '../Navbar';

import { Wrapper } from './items.style';

type Props = {
    item:CartItemType;
    handleAddToCart:(clicked:CartItemType)=>void
}

const Items:React.FC<Props> = ({item,handleAddToCart}: Props) => {
  
  return (
    <Wrapper>
          <img src={item.image} alt={item.title} />
    <div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <h3>${item.price}</h3>
    </div>
    <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
    </Wrapper>
  )
}
export default Items