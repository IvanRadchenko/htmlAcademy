//Item page images
import item1 from './images/item-1.png'
import item2 from './images/item-2.png'
import item3 from './images/item-3.png'
import item4 from './images/item-4.png'

const imageGallery = [item1, item2, item3, item4];

const itemGallery = document.querySelector('.item__gallery');
const items = itemGallery.querySelectorAll('img');
function addImages(items) {
  items.forEach( (item,index) => item.src = imageGallery[index]);
}

addImages(items);
