import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { adjustQty, adjustAttribute, removeFromCart } from '../../redux/Cart/actions';
import styles from './item.module.css';

function Item(props) {
  const dispatch = useDispatch();
  const inCart = useLocation().pathname.includes('cart');
  const storeCurrencySymbol = useSelector((store) => store.currency);
  const [imgShowing, setImgShowing] = useState(0);

  return (
    <div className={styles.cartModalItem}>
      <div className={styles.itemInfo}>
        <div className={styles.nameAndPrice}>
          <Link className={styles.name} to={`/product/${props.productInfo.id}`}>
            <p className={styles.brand}>{props.productInfo.brand}</p>
            <p>{props.productInfo.name}</p>
          </Link>
          <p className={styles.price}>
            {storeCurrencySymbol}
            {
              props.productInfo.prices.find(
                (price) => price.currency.symbol === storeCurrencySymbol
              ).amount
            }
          </p>
        </div>
        <div className={styles.attributes}>
          {props.productInfo.attributes.map((attribute) => (
            <div className={styles.attribute} key={attribute.name}>
              <span className={styles.attributeName}>{attribute.name}:</span>
              <ul className={styles.attributeItems}>
                {attribute.items.map((item) => (
                  <li
                    className={
                      item.displayValue === props.attributes[attribute.name]
                        ? attribute.type === 'swatch'
                          ? `${styles.attributeColor} ${styles.colorSelected}`
                          : `${styles.attributeItem} ${styles.itemSelected}`
                        : attribute.type === 'swatch'
                        ? styles.attributeColor
                        : styles.attributeItem
                    }
                    style={attribute.type === 'swatch' ? { backgroundColor: item.value } : null}
                    key={item.id}
                    title={item.displayValue}
                    onClick={() => {
                      dispatch(
                        adjustAttribute(
                          props.productInfo.id,
                          props.attributes,
                          {
                            name: attribute.name,
                            displayValue: item.displayValue
                          },
                          props.qty
                        )
                      );
                    }}
                  >
                    <span>{attribute.type != 'swatch' ? item.value : null}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.qtyAndImg}>
        <div className={styles.qty}>
          <button
            onClick={() => {
              dispatch(adjustQty(props.productInfo.id, props.attributes, 1));
            }}
          >
            +
          </button>
          <p>{props.qty}</p>
          <button
            onClick={() => {
              props.qty > 1
                ? dispatch(adjustQty(props.productInfo.id, props.attributes, -1))
                : dispatch(removeFromCart(props.productInfo.id, props.attributes));
            }}
          >
            -
          </button>
        </div>
        <div className={styles.imgAndArrows}>
          <Link to={`/product/${props.productInfo.id}`}>
            <img className={styles.img} src={props.productInfo.gallery[imgShowing]}></img>
          </Link>
          {inCart && props.productInfo.gallery.length > 1 ? (
            <div className={styles.arrows}>
              <button
                onClick={() => {
                  imgShowing < 1
                    ? setImgShowing(props.productInfo.gallery.length - 1)
                    : setImgShowing(imgShowing - 1);
                }}
              >
                &#60;
              </button>
              <button
                onClick={() => {
                  imgShowing > props.productInfo.gallery.length - 2
                    ? setImgShowing(0)
                    : setImgShowing(imgShowing + 1);
                }}
              >
                &#62;
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Item;
