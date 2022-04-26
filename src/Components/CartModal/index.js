import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Item from '../Item';
import styles from './cartModal.module.css';

const CartModal = (props) => {
  const location = useLocation();
  const storeCurrencySymbol = useSelector((store) => store.currency);
  const cart = useSelector((store) => store.cart);

  useEffect(() => {
    props.notVisible();
  }, [location]);

  const totalItemsQty = cart.reduce((acc, cur) => acc + cur.qty, 0);
  const totalCartPrice = cart
    .reduce(
      (acc, cur) =>
        acc +
        cur.qty *
          cur.productInfo.prices.find((price) => price.currency.symbol === storeCurrencySymbol)
            .amount,
      0
    )
    .toFixed(2);

  return (
    <div className={styles.cartModal} style={!props.visible ? { display: 'none' } : null}>
      <div className={styles.cartModalTitle}>
        <span className={styles.cartModalTitleBold}>My Cart, </span>
        <span className={styles.cartModalTitleItems}>{totalItemsQty} items</span>
      </div>
      <div className={styles.cartModalItems}>
        {cart.map((item) => (
          <Item
            key={cart.indexOf(item)}
            id={item.id}
            attributes={item.attributes}
            qty={item.qty}
            productInfo={item.productInfo}
          />
        ))}
      </div>
      <div className={styles.total}>
        <span className={styles.totalWord}>Total</span>
        <span className={styles.totalNum}>
          {storeCurrencySymbol}
          {totalCartPrice}
        </span>
      </div>
      <div className={styles.cartModalButtons}>
        <Link
          className={styles.viewCartBtn}
          alt="View Cart"
          to={'/cart'}
          onClick={() => props.notVisible()}
        >
          VIEW CART
        </Link>
        <button className={styles.checkOutBtn} alt="Check Out" onClick={() => alert('Check Out!')}>
          CHECK OUT
        </button>
      </div>
    </div>
  );
};

export default CartModal;
