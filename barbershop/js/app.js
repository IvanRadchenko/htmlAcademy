const queryDoc = (element) => document.querySelector(element);
const query = (targetElement, element) => targetElement.querySelector(element);

let addClass = function addClassName(target, targetClassName) {
  target.classList.add(targetClassName);
};

let removeClass = function removeClassName(target, targetClassName) {
  target.classList.remove(targetClassName);
}

let toogleShuffleAnimation = function shuffle() {
  let mapCloseBtn = queryDoc('.modal-close_map');
  let shuffleOn = () => addClass(mapCloseBtn, 'modal-close_shuffle');
  let shuffleOff = () => removeClass(mapCloseBtn, 'modal-close_shuffle');

  return {
    on: shuffleOn,
    off: shuffleOff
  }
}

let toogleModalRoot = function makeRootVisible() {
  let rootModal = queryDoc('.modal-root');
  let showRootModal = () => addClass(rootModal, 'modal-root_visible');
  let hideRootModal = () => removeClass(rootModal, 'modal-root_visible');

  return {
    hide: hideRootModal,
    show: showRootModal
  }
}


let closeFormByKeys = function closeModalWindowsForms(targetForm) {
  let cleanAllAnimationsAndListeners = () => {
    addClass(targetForm, 'hidden');
    toogleShuffleAnimation().off();
    toogleModalRoot().hide();
    removeEscapeListener();
    removeRootModalListener();
  }

  // Modal root listener
  let rootModal = queryDoc('.modal-root');
  let addRootModalListener = () => rootModal.addEventListener('click', function (e) {
    if (e.target.className.includes('modal-root'))
      cleanAllAnimationsAndListeners();
  }, false);
  let removeRootModalListener = () => rootModal.removeEventListener('click', toogleModalRoot().hide, false);

  // Escape Listener for hidden Forms
  let pressEscapeHandler = (e) => {
    if (e.code === 'Escape') {
      cleanAllAnimationsAndListeners();
      removebtnShowFormsListener();
    }
  };

  let addEscapeListener = () => document.addEventListener('keydown', pressEscapeHandler, false);
  let removeEscapeListener = () => document.removeEventListener('keydown', pressEscapeHandler, false);

  // Close Buttons Listener for Hidden forms and map
  let closeFormBtn = query(targetForm, '.modal-close');
  let showFormsHandler = (e) => {
    e.preventDefault();
    cleanAllAnimationsAndListeners();
  };

  let addbtnShowFormsListener = () => closeFormBtn.addEventListener('click', showFormsHandler, {
    once: true
  });
  let removebtnShowFormsListener = () => closeFormBtn.removeEventListener('click', showFormsHandler, false);


  return {
    addHiddenFormListeners() {
      addEscapeListener();
      addbtnShowFormsListener();
      addRootModalListener();
    }
  };
};

let toogleLoginForm = function showLoginForm() {
  let loginLink = queryDoc('.login-link');

  loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    let loginForm = queryDoc('.modal-login');
    removeClass(loginForm, 'hidden');
    toogleModalRoot().show();
    closeFormByKeys(loginForm).addHiddenFormListeners();
  });
}

let toogleMap = function showMap() {
  let btnShowMap = document.querySelectorAll('.show-map');
  let nodes = [...btnShowMap];

  nodes.forEach((node) => {
    node.addEventListener('click', (e) => {
      e.preventDefault();
      let map = queryDoc('.modal-map');
      removeClass(map, 'hidden');
      toogleModalRoot().show();
      toogleShuffleAnimation().on();
      closeFormByKeys(map).addHiddenFormListeners();
    });
  });

};

toogleLoginForm();
toogleMap();

