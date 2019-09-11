import logoIndex from '../images/index-logo.svg'
import logoCommon from '../images/logo.svg'
import loginSVG from '../images/login.svg'

const logo = document.querySelector('.nav-logo__media');

if (location.pathname === '/index.html') {
  logo.src = logoIndex;
} else {
  logo.src = logoCommon;
}


const loginLinkImage = document.querySelector('.login-link:before');
loginLinkImage.style.backgroundImage = loginSVG;
