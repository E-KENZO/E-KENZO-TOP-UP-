const banners = [
  "assets/banners/banner1.png",
  "assets/banners/banner2.png",
  "assets/banners/banner3.png"
];

let currentBanner = 0;

setInterval(() => {
  currentBanner = (currentBanner + 1) % banners.length;
  document.getElementById("banner").src = banners[currentBanner];
}, 3000);
