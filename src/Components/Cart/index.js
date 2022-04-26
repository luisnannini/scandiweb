import React from 'react';
import { useSelector } from 'react-redux';
import styles from './cart.module.css';
import Item from '../Item';

const Cart = () => {
  const storeCurrencySymbol = useSelector((store) => store.currency);
  const storeCart = useSelector((store) => store.cart);
  const totalItemsQty = storeCart.reduce((acc, cur) => acc + cur.qty, 0);
  const totalCartPrice = storeCart
    .reduce(
      (acc, cur) =>
        acc +
        cur.qty *
          cur.productInfo.prices.find((price) => price.currency.symbol === storeCurrencySymbol)
            .amount,
      0
    )
    .toFixed(2);
  document.title = 'Cart - Scandiweb';
  return (
    <section>
      <h2 className={styles.subtitle}>Cart</h2>
      {totalItemsQty < 1 ? (
        <span className={styles.noItems}>No Items In Cart</span>
      ) : (
        <div>
          <div className={styles.cartModalItems}>
            {storeCart.map((item) => (
              <Item
                key={storeCart.indexOf(item)}
                id={item.id}
                attributes={item.attributes}
                qty={item.qty}
                productInfo={item.productInfo}
              />
            ))}
          </div>
          <div className={styles.bottomInfo}>
            <div className={styles.totalQty}>
              <span className={styles.totalWord}>Quantity: </span>
              <span className={styles.totalNum}>{totalItemsQty}</span>
            </div>
            <div className={styles.totalTax}>
              <span className={styles.totalWord}>Tax: </span>
              <span className={styles.totalNum}>
                {storeCurrencySymbol}
                {(totalCartPrice * 0.075).toFixed(2)}
              </span>
            </div>
            <div className={styles.totalPrice}>
              <span className={styles.totalWord}>Total: </span>
              <span className={styles.totalNum}>
                {storeCurrencySymbol}
                {totalCartPrice}
              </span>
            </div>
            <button className={styles.orderBtn} alt="Order" onClick={() => alert('Order!')}>
              ORDER
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
