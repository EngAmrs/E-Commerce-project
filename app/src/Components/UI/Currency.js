import React from 'react';

const formattedCurrency = new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'EGP', 
  })


  export default formattedCurrency