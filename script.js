// Auto Banner Slider
let slides = document.querySelectorAll(".slide");
let current = 0;

function showSlide(index){
  slides.forEach((slide)=>{
    slide.classList.remove("active");
  });

  if(slides.length > 0){
    slides[index].classList.add("active");
  }
}

if(slides.length > 0){
  showSlide(0);

  setInterval(()=>{
    current++;
    if(current >= slides.length){
      current = 0;
    }
    showSlide(current);
  },3000);
    }
