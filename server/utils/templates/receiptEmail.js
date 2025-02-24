const mjml2html = require('mjml');
const fs = require('fs')
const path = require('path');

const receiptEmailTemplate =  ({userName, orderId, orderItems, totalPrice, discountApplied}) => {
    const mjmlTemplate = fs. readFileSync(path.join(__dirname, 'receiptEmail.mjml'), 'utf8');


    let mjmlProcessed = mjmlTemplate
    .replace('{{userName}}', userName)
    .replace('{{orderId',orderId)
    .replace('{{totalPrice}}', totalPrice)
    .replace('{{discountApplied}}', discountApplied)

    //Handle order items dynamically
    const orderItemsHtml = orderItems.map(item => `<tr><td><img src="${item.image}" width="50px"/></td><td>${item.name}</td><td>${item.quantity}</td><td>${item.price}</td></tr>`).join('');
    mjmlProcessed = mjmlProcessed.replace('{{#each orderItems}}', orderItemsHtml).replace('{{/each}}', '');

    const {html} = mjml2html(mjmlProcessed);

    return html;
};

module.exports