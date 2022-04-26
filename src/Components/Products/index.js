import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery, gql } from '@apollo/client';
import { addToCart } from '../../redux/Cart/actions';
import styles from './products.module.css';

// TODO: could not fix: query returns wrong attributes for some products that share attribute name

const PRODUCTS_QUERY = (category) => {
  return gql`
    {
      category(input: { title: "${category}" }) {
        name
        products {
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
    }
  `;
};

function Products(props) {
  const dispatch = useDispatch();
  const storeCurrencySymbol = useSelector((store) => store.currency);
  const { data, loading, error } = useQuery(PRODUCTS_QUERY(props.category));

  const defaultAttributes = (attributes) => {
    const defaultAttributes = {};
    for (let atr of attributes) {
      defaultAttributes[atr.name] = atr.items[0].displayValue;
    }
    return defaultAttributes;
  };
  document.title = `${props.name} - Scandiweb`;
  if (loading) return 'Loading...';
  if (error) return <pre>{error.message}</pre>;

  return (
    <section className={styles.container}>
      <p className={styles.subtitle}>{data.category.name}</p>
      <div className={styles.products}>
        {data.category.products.map((product) => (
          <div className={styles.productDiv} key={product.id}>
            <Link to={`/product/${product.id}`}>
              <div className={styles.product}>
                <img
                  className={styles.productImage}
                  src={product.gallery[0]}
                  alt={product.name}
                ></img>
                <div className={styles.nameAndPrice}>
                  <p className={styles.productName}>
                    {product.brand} - {product.name}
                  </p>
                  <span>
                    {storeCurrencySymbol}{' '}
                    {product.prices.map((price) => {
                      if (price.currency.symbol === storeCurrencySymbol) return price.amount;
                    })}
                  </span>
                </div>
                {!product.inStock ? <p className={styles.noStock}>OUT OF STOCK</p> : ''}
              </div>
            </Link>
            {product.inStock ? (
              <a
                className={styles.cartGreen}
                onClick={() => {
                  dispatch(addToCart(product.id, defaultAttributes(product.attributes), product));
                }}
                title="Add To Cart"
              >
                <img src={`${process.env.PUBLIC_URL}/cartGreen.svg`}></img>
              </a>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;
