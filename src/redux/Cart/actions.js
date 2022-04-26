import * as actionTypes from './actionTypes';

export const addToCart = (id, attributes, productInfo) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      id,
      attributes,
      productInfo
    }
  };
};

export const adjustQty = (id, attributes, qty) => {
  return {
    type: actionTypes.ADJUST_ITEM_QTY,
    payload: {
      id,
      attributes,
      qty
    }
  };
};

export const adjustAttribute = (id, attributes, attribute, qty) => {
  return {
    type: actionTypes.ADJUST_ITEM_ATTRIBUTE,
    payload: {
      id,
      attributes,
      attribute,
      qty
    }
  };
};

export const removeFromCart = (id, attributes) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      id,
      attributes
    }
  };
};
