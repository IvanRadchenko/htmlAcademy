// Test import of a JavaScript function, an SVG, and Sass
import  './styles/index.scss'
import './js/app'
import galleryImg from './images/index-gallery.jpg'


// Append SVG and heading nodes to the DOM
const app = document.querySelector('.nav-logo__media');
app.src = indexLogo;


const gallery = document.querySelector('.block__container_gallery');
Object.values(gallery).forEach( (img) => img.src = galleryImg);


