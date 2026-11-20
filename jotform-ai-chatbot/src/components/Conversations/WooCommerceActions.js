import React from 'react';
import {
  array, object, oneOfType, string
} from 'prop-types';

import '../../styles/conversation-commerce.scss';

import { ALL_TEXTS } from '../../constants';
import { safeJSONParse } from '../../utils';
import OrderSummary from './OrderSummary';
import ProductCard from './ProductCard';

const WooCommerceActions = ({ action }) => {
  const parsed = safeJSONParse(action, [], true);
  const actions = Array.isArray(parsed) ? parsed : [parsed];
  return actions.map((entry, index) => {
    const data = entry?.data;
    // Actions are an ordered snapshot within a saved message and have no ID.
    const key = `${entry?.type}-${index}`;
    if (entry?.type === 'woocommerce-show-order' && (data?.order?.number || data?.order?.id)) {
      return <OrderSummary key={key} order={data.order} />;
    }
    if (entry?.type === 'woocommerce-show-products' && Array.isArray(data?.products)) {
      const products = data.products.filter(product => typeof product?.name === 'string' && product.name);
      if (products.length) {
        return (
          <ul key={key} className='jaic-commerce jaic-commerce-list' aria-label={ALL_TEXTS.PRODUCTS}>
            {products.map(product => <ProductCard key={product.id} product={product} showCart={data.isAddToCartActive} />)}
          </ul>
        );
      }
    }
    return null;
  });
};

WooCommerceActions.propTypes = { action: oneOfType([string, object, array]) };

export default WooCommerceActions;
