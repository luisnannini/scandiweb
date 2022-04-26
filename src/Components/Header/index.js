import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery, gql } from '@apollo/client';
import { changeCurrency } from '../../redux/Currency/actions';
import styles from './header.module.css';
import CartModal from 'Components/CartModal';

const CURRENCIES_QUERY = () => {
  return gql`
    {
      currencies {
        label
        symbol
      }
    }
  `;
};

function Header(props) {
  const dispatch = useDispatch();
  const [currencyDropdownVisible, setCurrencyDropdownVisible] = useState(false);
  const [cartModalVisible, setCartModalVisible] = useState(false);
  const ref1 = useRef();
  const ref2 = useRef();
  useOnClickOutside(ref1, () => setCurrencyDropdownVisible(false));
  useOnClickOutside(ref2, () => setCartModalVisible(false));
  const currentRoute = useLocation().pathname;
  const storeCurrencySymbol = useSelector((store) => store.currency);
  const storeCart = useSelector((store) => store.cart);
  const totalItemsQty = storeCart.reduce((acc, cur) => acc + cur.qty, 0);
  const currency = useQuery(CURRENCIES_QUERY());

  if (currency.loading) return 'Loading...';
  if (currency.error) return <pre>{currency.error.message}</pre>;
  return (
    <nav className={styles.navbar}>
      <div className={styles.routes}>
        {props.routes.map((route) => (
          <Link
            className={
              currentRoute.includes(route.path) ? `${styles.tab} ${styles.activeTab}` : styles.tab
            }
            to={route.path}
            key={route.name}
          >
            {route.name}
          </Link>
        ))}
      </div>
      <a href="all">
        <div className={styles.icon}>
          <img src={`${process.env.PUBLIC_URL}/favicon.svg`} />
        </div>
      </a>
      <div className={styles.rightButtons}>
        <div ref={ref1}>
          <button
            className={styles.currencyBtn}
            onClick={() => setCurrencyDropdownVisible(!currencyDropdownVisible)}
          >
            <p>{storeCurrencySymbol}</p>
            <img src={`${process.env.PUBLIC_URL}/currencyArrow.svg`} alt="arrow" />
          </button>
          <div
            className={
              currencyDropdownVisible
                ? `${styles.currenciesDropdown} ${styles.currenciesDropdownShow}`
                : styles.currenciesDropdown
            }
          >
            {currency.data.currencies.map((currency) => (
              <div
                className={styles.currencyOption}
                onClick={() => {
                  dispatch(changeCurrency(currency.symbol));
                  setCurrencyDropdownVisible(false);
                }}
                key={currency.label}
              >
                <span>{currency.symbol}</span>
                <span>{currency.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.cartAndModal} ref={ref2}>
          <div
            className={styles.btnAndNotification}
            onClick={() => setCartModalVisible(!cartModalVisible)}
          >
            <img className={styles.btn} src={`${process.env.PUBLIC_URL}/cart.svg`} alt="Cart" />
            {totalItemsQty ? <span className={styles.notification}>{totalItemsQty}</span> : null}
          </div>
          <CartModal visible={cartModalVisible} notVisible={() => setCartModalVisible(false)} />
        </div>
      </div>
    </nav>
  );
}

// Click-outside-modal hook
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export default Header;
