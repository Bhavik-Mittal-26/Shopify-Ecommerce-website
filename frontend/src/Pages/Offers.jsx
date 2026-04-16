import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Item from '../Components/Item/Item'
import './OffersPage.css'

const Offers = () => {
  const { all_product } = useContext(ShopContext)
  const offerProducts = all_product.filter(product => product.old_price > product.new_price)

  return (
    <div className='offers-page'>
      <div className='offers-page-header'>
        <div>
          <p className='offers-subtitle'>Limited Time</p>
          <h1>Exclusive Offers</h1>
        </div>
        <p className='offers-description'>Discover the latest discounted and best-selling products with handpicked offers just for you.</p>
      </div>

      <div className='offers-grid'>
        {offerProducts.map((product) => {
          const discount = Math.round(((product.old_price - product.new_price) / product.old_price) * 100)
          return (
            <div key={product.id} className='offers-card'>
              <div className='offers-card-badge'>{discount}% OFF</div>
              <div className='offers-card-image'>
                <img src={product.image} alt={product.name} />
              </div>
              <div className='offers-card-body'>
                <p className='offers-card-name'>{product.name}</p>
                <div className='offers-card-prices'>
                  <span className='offers-price-new'>${product.new_price}</span>
                  <span className='offers-price-old'>${product.old_price}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Offers