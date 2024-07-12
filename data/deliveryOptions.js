import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });
  return deliveryOption || deliveryOptions[0];
}

export function validDeliveryOption(deliveryOptionId) {
  let found = false;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      found = true;
    }
  });

  return found;
}

export function calculateDeliveryDate(deliveryOption) {
  const todaysDate = dayjs();

  let numberOfDays = deliveryOption.deliveryDays;
  let actualDeliveryDate = 0; 

  while (numberOfDays > 0) {
    actualDeliveryDate++;
    if (
      todaysDate.add(actualDeliveryDate, 'days').format('dddd') 
      !== 'Saturday'
      && 
      todaysDate.add(actualDeliveryDate, 'days').format('dddd') 
      !== 'Sunday'
    ) {
      numberOfDays--;
    }
  }

  const deliveryDate = todaysDate.add(actualDeliveryDate, 'days');

  const dayString = deliveryDate.format('dddd, MMMM D');
  return dayString;
}