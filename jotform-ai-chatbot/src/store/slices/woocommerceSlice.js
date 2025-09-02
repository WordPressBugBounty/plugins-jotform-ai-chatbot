import { WOO_COMMERCE_PROPERTIES } from '../../constants';
import { generatePromiseActionType } from '../actionTypes';

// Internal action types (only used within this slice)
const UPDATE_WOOCOMMERCE_SETTINGS = generatePromiseActionType('UPDATE_WOOCOMMERCE_SETTINGS');
const SET_WOOCOMMERCE_PROPERTY = 'SET_WOOCOMMERCE_PROPERTY';

// Initial state for woocommerce domain
export const woocommerceInitialState = {
  woocommerce: {
    [WOO_COMMERCE_PROPERTIES.CONSUMER_KEY]: '',
    [WOO_COMMERCE_PROPERTIES.CONSUMER_SECRET]: '',
    [WOO_COMMERCE_PROPERTIES.PRODUCT_RECOMMENDATION]: false,
    [WOO_COMMERCE_PROPERTIES.PRODUCT_FILTER]: false,
    [WOO_COMMERCE_PROPERTIES.ADD_TO_CART]: false,
    [WOO_COMMERCE_PROPERTIES.ORDER_TRACKING]: false,
    [WOO_COMMERCE_PROPERTIES.REFUND_REQUEST]: false
  }
};

// Woocommerce slice reducer
export const woocommerceReducer = (state, action) => {
  switch (action.type) {
    case SET_WOOCOMMERCE_PROPERTY:
      return {
        ...state,
        woocommerce: {
          ...state.woocommerce,
          [action.payload.property]: action.payload.value
        }
      };

    default:
      return state;
  }
};

// Woocommerce action creators
export const woocommerceActionCreators = {
  setWoocommerceProperty: (property, value) => ({
    type: SET_WOOCOMMERCE_PROPERTY,
    payload: { property, value }
  }),
  updateWoocommerceSettingsRequest: () => ({
    type: UPDATE_WOOCOMMERCE_SETTINGS.REQUEST
  }),
  updateWoocommerceSettingsSuccess: () => ({
    type: UPDATE_WOOCOMMERCE_SETTINGS.SUCCESS
  }),
  updateWoocommerceSettingsError: () => ({
    type: UPDATE_WOOCOMMERCE_SETTINGS.ERROR
  })
};
