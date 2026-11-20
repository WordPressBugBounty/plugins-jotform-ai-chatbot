import React from 'react';
import { object } from 'prop-types';

import { ALL_TEXTS } from '../../constants';
import { formatPrice, orderLocale, storeUrl } from './commerceFormat';

const formatAddress = (address, locale) => {
  if (!address) return '';
  const {
    first_name: firstName, last_name: lastName, company, address_1: street, address_2: unit,
    city, state, postcode, country
  } = address;
  const region = /^[a-z]{2}$/i.test(country) && Intl.DisplayNames
    ? new Intl.DisplayNames(locale, { type: 'region' }).of(country.toUpperCase()) : country;
  return [
    [firstName, lastName].filter(Boolean).join(' '), company, street, unit,
    [city, state].filter(Boolean).join(', '), [postcode, region].filter(Boolean).join(' ')
  ].filter(Boolean).join(' · ');
};

const OrderSummary = ({ order }) => {
  const { currency, status } = order;
  const items = Array.isArray(order.line_items) ? order.line_items.filter(item => typeof item?.name === 'string') : [];
  const locale = orderLocale(currency);
  const address = formatAddress(order.shipping, locale) || formatAddress(order.billing, locale);
  const date = new Date(order.date_created);
  const facts = [
    [ALL_TEXTS.ITEMS, items.reduce((sum, item) => sum + Number(item.quantity || 0), 0)],
    [ALL_TEXTS.TOTAL, formatPrice(order.total, currency)],
    [ALL_TEXTS.CURRENCY, currency],
    [ALL_TEXTS.PAYMENT, order.payment_method_title],
    [ALL_TEXTS.SHIPPING, order.shipping_lines?.[0]?.method_title]
  ];

  return (
    <section className='jaic-commerce' aria-label={ALL_TEXTS.ORDER_SUMMARY}>
      <h3>{ALL_TEXTS.ORDER_SUMMARY}</h3>
      <p className='jaic-commerce-muted'>{ALL_TEXTS.ORDER_SUMMARY_DESCRIPTION}</p>
      <div className='jaic-commerce-card'>
        <div className='jaic-commerce-row'>
          <div>
            <strong>#{order.number || order.id}</strong>
            {order.date_created && Number.isFinite(date.getTime()) && (
              <div className='jaic-commerce-muted'>{date.toLocaleString(locale, { dateStyle: 'long', timeStyle: 'short' })}</div>
            )}
          </div>
          {status && <span className='jaic-commerce-badge' data-status={status}>{ALL_TEXTS.ORDER_STATUSES[status] || status}</span>}
        </div>
        <dl className='jaic-commerce-facts'>
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value ?? '—'}</dd>
            </div>
          ))}
        </dl>
        {address && <div><h4>{ALL_TEXTS.SHIPPING_ADDRESS}</h4>{address}</div>}
        {items.length > 0 && (
          <div>
            <h4>{ALL_TEXTS.PRODUCTS}</h4>
            <ul className='jaic-commerce-list'>
              {items.map(item => (
                <li key={item.id} className='jaic-commerce-row'>
                  {storeUrl(item.image?.src) && <img src={storeUrl(item.image.src)} alt='' loading='lazy' />}
                  <div className='jaic-commerce-item'>
                    <strong>{item.name}</strong>
                    {item.parent_name && <div>{item.parent_name}</div>}
                    <small>{[`×${item.quantity ?? 1}`, formatPrice(item.price, currency)].filter(Boolean).join(' • ')}</small>
                  </div>
                  <strong>{formatPrice(item.total, currency)}</strong>
                </li>
              ))}
            </ul>
          </div>
        )}
        {order.customer_note && <div><h4>{ALL_TEXTS.YOUR_NOTE}</h4>{order.customer_note}</div>}
      </div>
    </section>
  );
};

OrderSummary.propTypes = { order: object.isRequired };

export default OrderSummary;
