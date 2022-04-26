import Header from 'Components/Header';
import styles from './layout.module.css';

function Layout(props) {
  const { routes = [] } = props;
  return (
    <div className={styles.container}>
      <Header routes={routes} />
      <div className={styles.body}>{props.children}</div>
    </div>
  );
}
export default Layout;
