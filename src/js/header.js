import logoIndex from '../images/index-logo.svg'
import logoCommon from '../images/logo.svg'

const logo = document.querySelector(".nav-logo__media");

if (location.pathname === '/index.html') {
  logo.src = logoIndex;
} else {
  logo.src = logoCommon;
}

