import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery, gql } from '@apollo/client';
import { addToCart } from '../../redux/Cart/actions';
import styles from './product.module.css';

const PRODUCT_QUERY = (id) => {
  return gql`
    {
      product(id: "${id}") {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            symbol
            label
          }
          amount
        }
        brand
      }
    }
  `;
};

function Product() {
  const dispatch = useDispatch();
  const storeCurrencySymbol = useSelector((store) => store.currency);
  const params = useParams();
  const { data, loading, error, refetch } = useQuery(PRODUCT_QUERY(params.id));
  const [bigImgShowing, setBigImgShowing] = useState('');
  const [itemAttributes, setItemAttributes] = useState({});
  const [itemPrice, setItemPrice] = useState('');

  useEffect(() => {
    refetch();
  }, [params]);

  useEffect(() => {
    if (!loading && data) {
      document.title = `${data.product.name} - Scandiweb`;
    }
  }, [loading, data]);

  useEffect(() => {
    if (!loading && data) {
      setBigImgShowing(data.product.gallery[0]);
      setItemAttributes(
        data.product.attributes.reduce(
          (obj, cur) => ({ ...obj, [cur.name]: cur.items[0].displayValue }),
          {}
        )
      );
    }
  }, [loading, data]);

  useEffect(() => {
    if (!loading && data) {
      const price = data.product.prices.find(
        (price) => price.currency.symbol === storeCurrencySymbol
      ).amount;
      setItemPrice(price);
    }
  }, [loading, data, storeCurrencySymbol]);

  if (loading) return 'Loading...';
  if (error) return <pre>{error.message}</pre>;

  return (
    <section className={styles.container}>
      <div className={styles.imagesLeft}>
        {data.product.gallery.map((img) => (
          <img
            className={bigImgShowing === img ? `${styles.img} ${styles.imgBorder}` : styles.img}
            key={img}
            src={img}
            onMouseOver={() => setBigImgShowing(img)}
          ></img>
        ))}
      </div>
      <img className={styles.bigImage} src={bigImgShowing}></img>
      <div className={styles.infoDiv}>
        <div className={styles.title}>
          <span>{data.product.brand}</span>
          <p>{data.product.name}</p>
        </div>
        <div className={styles.attributes}>
          {data.product.attributes.map((attribute) => (
            <div className={styles.attribute} key={attribute.name}>
              <span className={styles.attributeName}>{attribute.name}:</span>
              <ul className={styles.attributeItems}>
                {attribute.items.map((item) => (
                  <li
                    className={
                      item.displayValue === itemAttributes[attribute.name] &&
                      attribute.type === 'swatch'
                        ? `${styles.attributeItem} ${styles.colorSelected}`
                        : item.displayValue === itemAttributes[attribute.name] &&
                          attribute.type !== 'swatch'
                        ? `${styles.attributeItem} ${styles.itemSelected}`
                        : styles.attributeItem
                    }
                    style={attribute.type === 'swatch' ? { backgroundColor: item.value } : null}
                    key={item.id}
                    title={item.displayValue}
                    onClick={() =>
                      setItemAttributes({
                        ...itemAttributes,
                        [attribute.name]: item.displayValue
                      })
                    }
                  >
                    <span>{attribute.type != 'swatch' ? item.value : null}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.price}>
          <span className={styles.priceTitle}>Price:</span>
          <span className={styles.priceNumber}>
            {storeCurrencySymbol}
            {itemPrice}
          </span>
        </div>
        {data.product.inStock ? (
          <button
            className={styles.addButton}
            onClick={() => {
              dispatch(addToCart(data.product.id, itemAttributes, data.product));
            }}
          >
            ADD TO CART
          </button>
        ) : (
          <button className={styles.outOfStockBtn}>OUT OF STOCK</button>
        )}
        <div className={styles.description}>
          {data.product.description.replace(/<\/?[^>]+(>|$)/g, '\n')}
        </div>
      </div>
    </section>
  );
}

export default Product;
