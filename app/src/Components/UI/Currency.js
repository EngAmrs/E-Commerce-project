import React, { useState } from 'react';
let curr = 'EGP'
let regi = 'ar-SA'

const formattedCurrency = new Intl.NumberFormat(regi, {
    style: 'currency',
    currency: curr, 
  })


  export default formattedCurrency