const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const btn4x4 = document.querySelector('.btn4x4');
const btn32x32 = document.querySelector('.btn32x32');
const btn256x256 = document.querySelector('.btn256x256');

btn4x4.addEventListener("click", () => {
   path = './data/4x4.json';
   loadImageJson4x4(path);
});

btn32x32.addEventListener("click", () => {
   path = './data/32x32.json';
   loadImageJson32x32(path);
});

btn256x256.addEventListener("click", () => {
   path = './data/image.png';
   loadImagePng(path);
});

function loadImageJson4x4(path) {
   canvas.width = 4;
   canvas.height = 4;

   fetch(path)
      .then(res => res.json())
      .then(function (data) {

         const concat = (as, bs) => as.concat(bs);
         console.log(concat);
         const hexToRGBA = hexStr => [
            parseInt(hexStr.substr(0, 2), 16),
            parseInt(hexStr.substr(2, 2), 16),
            parseInt(hexStr.substr(4, 2), 16),
            255
         ];

         const flattenedRGBAValues = data
            .reduce(concat)
            .map(hexToRGBA)
            .reduce(concat);

         const imageData = new ImageData(Uint8ClampedArray.from(flattenedRGBAValues), 4, 4);
         ctx.putImageData(imageData, 0, 0);
      });
};

function loadImageJson32x32(path) {
   canvas.width = 32;
   canvas.height = 32;

   fetch(path)
      .then(res => res.json())
      .then(function (data) {

         const concat = (as, bs) => as.concat(bs);

         const flattenedRGBAValues = data
            .reduce(concat)
            .reduce(concat);

         const imageData = new ImageData(Uint8ClampedArray.from(flattenedRGBAValues), 32, 32);
         ctx.putImageData(imageData, 0, 0);

         console.log(data);
         console.log(flattenedRGBAValues);
      });
};

function loadImagePng(path) {
   canvas.width = 512;
   canvas.height = 512;
   let img = new Image();
   img.src = path;
   img.onload = function () {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
   }
};