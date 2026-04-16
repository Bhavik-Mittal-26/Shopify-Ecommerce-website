import React, { useContext, useState } from 'react'
import "../CSS/ShopCategory.css"
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from "../assets/dropdown_icon.png"
import Item from '../Components/Item/Item'
const ShopCategory = (props) => {
  const {all_product}=useContext(ShopContext);
  const [showSort, setShowSort] = useState(false)
  const [sortType, setSortType] = useState('default')

  const getSortedProducts = () => {
    let filtered = all_product.filter(item => item.category === props.category)
    
    if(sortType === 'lowToHigh') {
      return filtered.sort((a, b) => a.new_price - b.new_price)
    } else if(sortType === 'highToLow') {
      return filtered.sort((a, b) => b.new_price - a.new_price)
    }
    return filtered
  }

  const handleSort = (type) => {
    setSortType(type)
    setShowSort(false)
  }

  const products = getSortedProducts()
  
  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className='shopcategory-indexSort'>
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className='shopcategory-sort' onClick={() => setShowSort(!showSort)}>
          Sort by <img src={dropdown_icon} alt="" height="20px"/>
          {showSort && (
            <div className='shopcategory-sort-dropdown'>
              <div className='sort-option' onClick={() => handleSort('default')}>Default</div>
              <div className='sort-option' onClick={() => handleSort('lowToHigh')}>Price: Low to High</div>
              <div className='sort-option' onClick={() => handleSort('highToLow')}>Price: High to Low</div>
            </div>
          )}
        </div>
      </div>
      <div className="shopcategory-products">
        {products.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}

  
      </div>
     


      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  )
}

export default ShopCategory