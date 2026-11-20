import React from 'react';
import { bool, object } from 'prop-types';

import { ALL_TEXTS } from '../../constants';
import { formatPrice, storeUrl } from './commerceFormat';

const cartLabel = product => {
  if (product.stock_status !== 'instock') return ALL_TEXTS.OUT_OF_STOCK;
  if (product.type === 'variable' && product.attributes?.length) return ALL_TEXTS.SELECT_OPTION;
  return ALL_TEXTS.ADD_TO_CART;
};

const ProductCard = ({ product, showCart }) => {
  const image = storeUrl(product.images?.[0]?.src);
  const permalink = storeUrl(product.permalink);
  const price = formatPrice(product.price, product.priceCurrency);
  const onSale = price && Number(product.regular_price) > Number(product.price);
  return (
    <li className='jaic-commerce-card'>
      <div className='jaic-commerce-row'>
        {image && <img className='jaic-commerce-product-image' src={image} alt='' loading='lazy' />}
        <div className='jaic-commerce-item'>
          <strong>{product.name}</strong>
          <div className='jaic-commerce-prices'>
            {onSale && <del>{formatPrice(product.regular_price, product.priceCurrency)}</del>}
            {price}
            {onSale && <span className='jaic-commerce-badge'>{ALL_TEXTS.SALE}</span>}
          </div>
        </div>
      </div>
      <div className='jaic-commerce-controls'>
        {permalink && <a href={permalink} target='_blank' rel='noopener noreferrer'>{ALL_TEXTS.VIEW_DETAILS}</a>}
        {showCart && <button type='button' disabled>{cartLabel(product)}</button>}
      </div>
    </li>
  );
};

ProductCard.propTypes = { product: object.isRequired, showCart: bool };

export default ProductCard;
