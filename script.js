const imageContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");
let photosArray = [];
let count = 5;
const apiKey = "99084QaqR8uFHlIEt3zNJ3blIj6iHSjHP2ZMOuawmAk";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

//Check if all images were loaded
const imageLoaded = function () {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
  }
};

//Helper funciton to set attributes
const setAttributes = function (element, object) {
  for (const key in object) {
    element.setAttribute(key, object[key]);
  }
};
//Create Elements For Links & photos, Add to Dom
const displayPhotos = function () {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  //Run function for eac obj
  photosArray.forEach(function (photo) {
    //Creat an <a> to link to unplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      targer: "blanks",
    });
    //Create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener("load", imageLoaded);
    //Put <img> inside <a>, then put both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

//Get phots from Unsplash Api
const getPhotos = async function () {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    photosArray = data;
    displayPhotos();
  } catch (e) {
    console.log(e);
  }
};

//Check to see if scrolling near bottom of page, load more images
window.addEventListener("scroll", function () {
  if (
    window.scrollY + this.window.innerHeight >=
      document.body.offsetHeight - 1000 &&
    ready === true
  ) {
    ready = false;
    getPhotos();
  }
});
//On Load
getPhotos();
// displayPhotos();
