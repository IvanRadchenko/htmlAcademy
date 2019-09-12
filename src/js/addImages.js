export default function addImages(selector, imageList, background = true) {
  const container = document.querySelectorAll(selector);

  if (!background) {
    container.forEach((item, index) => item.src = imageList[index]);
  }

  container.forEach( (item, index) => item.style.backgroundImage = imageList[index]);
}
