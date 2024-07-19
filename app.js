let slides = document.querySelectorAll(".slide");
let prev = document.querySelector(".prev")
let next = document.querySelector(".next")
let menuicon = document.querySelector(".menu-icon");
let crossicon = document.querySelector(".cross-icon");



let navlinks = document.querySelectorAll(".nav-links");
console.log(navlinks);

navlinks.forEach((link)=>{
    link.addEventListener("click",()=>{
        document.querySelector(".navbar").style.right = "-100%";
    })
})


let counter = 0;

slides.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`;
})


prev.addEventListener("click", () => {
    counter--;
    if(counter<0){
        counter=0;
    }
    else{
        slideimage();
    }
})
next.addEventListener("click", () => {
    counter++;

    if (counter < slides.length) {
        slideimage();
    }
    else{
        slides.forEach((slide)=>{
            slide.style.transform = `translateX(${(slides.length-counter)*100}%)`;
        })
        counter=0;
    }
})

const slideimage = () => {


    slides.forEach((slide) => {
        slide.style.transform = `translateX(-${counter * 100}%)`;
    })



}



menuicon.addEventListener("click",()=>{
    document.querySelector(".navbar").style.right = 0;
    // menuicon.style.display = "none";

})

crossicon.addEventListener("click",()=>{
    document.querySelector(".navbar").style.right = "-100%";
    menuicon.style.display = "block";


})






// contactme


const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Form submitted successfully";
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});
