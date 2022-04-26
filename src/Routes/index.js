import { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Layout from 'Components/Layout';
import Product from 'Components/Product';
import Cart from 'Components/Cart';
const Products = lazy(() => import('Components/Products'));

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={<div />}>
        <Layout
          routes={[
            { name: 'All', path: '/all' },
            { name: 'Tech', path: '/tech' },
            { name: 'Clothes', path: '/clothes' }
          ]}
        >
          <Switch>
            <Route exact path="/all">
              <Products category="all" name="All" />
            </Route>
            <Route exact path="/tech">
              <Products category="tech" name="Tech" />
            </Route>
            <Route exact path="/clothes">
              <Products category="clothes" name="Clothes" />
            </Route>
            <Route exact path="/product/:id">
              <Product />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
            <Redirect to="/all" />
          </Switch>
        </Layout>
      </Suspense>
    </Router>
  );
};

export default Routes;
