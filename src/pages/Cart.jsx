import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// redux
import { useSelector } from 'react-redux'

// re-dux component support


// component
import Helmet from '../components/Helmet'
import numberWithCommas from '../utils/numberWithCommas'
import Button from '../components/Button'
import CartItem from '../components/CartItem'

// fake-data
import productData from '../assets/fake-data/products'

const Cart = () => {
    const cartItems = useSelector((state) => state.cartItems.value)
    const [cartProducts, setCartProducts] = useState([])
    const [totalProducts, settotalProcuts] = useState(0)
    const [totalPrice, settotalPrice] = useState(0)

    useEffect(() => {
        setCartProducts(productData.getCartItemsDetail(cartItems))
        settotalProcuts(cartItems.reduce((total, item) => total + (Number(item.quantity)), 0))
        settotalPrice(cartItems.reduce((total, item) => total + (Number(item.quantity) * Number(item.price)), 0))
    }, [cartItems])

    return (
        <Helmet title="Giỏ hàng">
            <div className="cart">
                <div className="cart__info">
                    <div className="cart__info__txt">
                        <p>
                            Bạn đang có {totalProducts} sản phẩm trong giỏ hàng
                        </p>
                        <div className="cart__info__txt__price">
                            <span>Thành tiền:</span> <span>{numberWithCommas(Number(totalPrice))}</span>
                        </div>
                    </div>
                    <div className="cart__info__btn">
                        <Button size="block">
                            Đặt hàng
                        </Button>
                        <Link to="/catalog">
                            <Button size="block">
                                Tiếp tục mua hàng
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="cart__list">
                    {
                        cartProducts.map((item, index) => (
                            <CartItem key={index} item={item} />
                        ))
                    }
                </div>
            </div>
        </Helmet>
    )
}

export default Cart
