//Item page images
import img1 from '../images/item-1.png'
import img2 from '../images/item-2.png'
import img3 from '../images/item-3.png'
import img4 from '../images/item-4.png'
import addImages from './addImages.js'

const imageGallery = [img1, img2, img3, img4];
const imageList = addImages('.product__image', imageGallery, false)

export default imageList;
