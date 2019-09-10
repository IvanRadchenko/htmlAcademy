import productImage from './images/catalog-item.png'

const productImages = document.getElementsByClassName('.products__image img');
productImages.forEach( (item) => item.src = productImage);
