// Test import of a JavaScript function, an SVG, and Sass
import  './styles/index.scss'
import './js/app'
import galleryImg from './images/index-gallery.jpg'

const gallery = document.querySelector('.block__container_gallery');
Object.values(gallery).forEach( (img) => img.src = galleryImg);


