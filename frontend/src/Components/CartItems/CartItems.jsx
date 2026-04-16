import React, { useContext } from 'react'
import "./CartItems.css"
import remove_icon from "../../assets/remove.webp"
import { ShopContext } from '../../Context/ShopContext'
import { Link } from 'react-router-dom'

const CartItems = () => {
    const { getTotalCartAmount,all_product, cartItems, removeFromCart } = useContext(ShopContext);
    
    // Check if cart is empty
    let hasItems = false;
    for(let item in cartItems) {
        const sizes = cartItems[item];
        if(sizes && Object.keys(sizes).length > 0) {
            hasItems = true;
            break;
        }
    }

    if(!hasItems) {
        return (
            <div className='cartItems'>
                <div className="empty-cart">
                    <div className="empty-cart-icon">🛒</div>
                    <p>Your cart is empty</p>
                    <Link to="/" style={{textDecoration: 'none', marginTop: '20px'}}>
                        <button style={{
                            padding: '12px 30px',
                            background: 'var(--primary-color)',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--radius-lg)',
                            cursor: 'pointer',
                            fontWeight: '700',
                            fontSize: '15px'
                        }}>
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className='cartItems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                const sizes = cartItems[e.id];
                if (sizes && Object.keys(sizes).length > 0) {
                    return Object.keys(sizes).map(size => {
                        if (sizes[size] > 0) {
                            return <div key={size}>
                                <div className='cartItems-format cartitems-format-main'>
                                    <img src={e.image} alt="" height="100px" />
                                    <p>{e.name} ({size})</p>
                                    <p>${e.new_price}</p>
                                    <button className='cartitems-quantity'>
                                        {sizes[size]}
                                    </button>
                                    <p>{e.new_price * sizes[size]}</p>
                                    <img src={remove_icon} alt="" onClick={() => removeFromCart(e.id, size)} height="20px" />
                                </div>
                                <hr />
                            </div>
                        }
                        return null;
                    });
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr/>
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr/>
                        <div className="cartitems-total-item">
                            <p>Total</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type='text' placeholder='promo code'/>
                        <button>submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems