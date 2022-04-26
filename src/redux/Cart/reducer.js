import * as actionTypes from './actionTypes';

const initialState = []; // {id, attributes, productInfo, qty}

const objCompare = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }
  return true;
};

const cartReducer = (state = initialState, action) => {
  var exists = state.find(
    (item) =>
      item.id === action.payload.id && objCompare(item.attributes, action.payload.attributes)
  )
    ? true
    : false;
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return exists
        ? state.map((item) =>
            item.id === action.payload.id && objCompare(item.attributes, action.payload.attributes)
              ? { ...item, qty: item.qty + 1 }
              : item
          )
        : [...state, { ...action.payload, qty: 1 }];
    case actionTypes.ADJUST_ITEM_QTY:
      return state.map((item) =>
        item.id === action.payload.id && objCompare(item.attributes, action.payload.attributes)
          ? {
              ...item,
              qty: item.qty + action.payload.qty > 0 ? item.qty + action.payload.qty : item.qty
            }
          : item
      );
    case actionTypes.ADJUST_ITEM_ATTRIBUTE:
      var found = state.find(
        (item) =>
          item.id === action.payload.id &&
          objCompare(item.attributes, {
            ...action.payload.attributes,
            [action.payload.attribute.name]: action.payload.attribute.displayValue
          })
      );
      return found
        ? state
            .filter(
              (item) => !(item.id === found.id && objCompare(item.attributes, found.attributes))
            )
            .map((item) =>
              item.id === action.payload.id &&
              objCompare(item.attributes, action.payload.attributes)
                ? {
                    ...item,
                    qty: found.qty + action.payload.qty
                  }
                : item
            )
        : state.map((item) =>
            item.id === action.payload.id && objCompare(item.attributes, action.payload.attributes)
              ? {
                  ...item,
                  attributes: {
                    ...item.attributes,
                    [action.payload.attribute.name]: action.payload.attribute.displayValue
                  }
                }
              : item
          );
    case actionTypes.REMOVE_FROM_CART:
      return state.filter(
        (item) =>
          !(item.id === action.payload.id && objCompare(item.attributes, action.payload.attributes))
      );
    default:
      return state;
  }
};

export default cartReducer;
