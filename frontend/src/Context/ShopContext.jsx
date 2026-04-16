import React, {createContext, useState} from "react";
import all_product from "../assets/all_product";
import CartItems from "../Components/CartItems/CartItems";

export const ShopContext = createContext(null);
const getDefaultCart = () =>{
    let cart = {};
    for(let index=0;index < all_product.length+1;index++){
       cart[index] = {}
    } return cart;
}

const ShopContextProvider = (props) =>{
    const [cartItems,setCartItems] = useState(getDefaultCart())
    const [user, setUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    

    const addTocart = (itemId, size) =>{
        setCartItems((prev)=>({...prev,[itemId]:{...prev[itemId], [size]: (prev[itemId][size] || 0) + 1}}));
        console.log(cartItems);
        
        
    }
  
        const removeFromCart = (itemId, size) =>{
            setCartItems((prev) => {
                const newSizes = {...prev[itemId]};
                newSizes[size] = Math.max(0, (newSizes[size] || 0) - 1);
                if (newSizes[size] === 0) delete newSizes[size];
                return {...prev, [itemId]: newSizes};
            });
        }
  
        const getTotalCartAmount = () =>{
            let totalAmount = 0;
            for(const item in cartItems)
            {
                const sizes = cartItems[item];
                if(sizes && Object.keys(sizes).length > 0){
                    let itemInfo  = all_product.find((product)=>product.id === Number(item))
                    for(const size in sizes){
                        totalAmount += itemInfo.new_price * sizes[size];
                    }
                }
              
            }
            return totalAmount;
        }

        const getTotalCartItems = () =>{
            let totalItems = 0;
            for(const item in cartItems)
            {
                const sizes = cartItems[item];
                if(sizes){
                    for(const size in sizes){
                        totalItems += sizes[size];
                    }
                }
              
            }
            return totalItems;
        }

        const login = (name, email, password) => {
            const userData = { name, email, password };
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            setIsLoggedIn(true);
        }

        const logout = () => {
            localStorage.removeItem('user');
            setUser(null);
            setIsLoggedIn(false);
        }

        const checkUserLogin = () => {
            const userData = localStorage.getItem('user');
            if(userData) {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
                setIsLoggedIn(true);
            }
        }

        React.useEffect(() => {
            checkUserLogin();
        }, [])

        const contextValue={getTotalCartItems,getTotalCartAmount,all_product,cartItems,addTocart,removeFromCart,login,logout,user,isLoggedIn};
    return (
        <ShopContext.Provider value={contextValue}>
{props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;