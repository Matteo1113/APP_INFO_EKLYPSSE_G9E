/* image slider */

// var slideIndex = 1;
// showSlides(slideIndex, id);

// function plusSlide(n){
//     showSlides(slideIndex += n);
// }

// function currentSlide(n) {
//     showSlides(slideIndex = n);
// }

// // .getElementById("")
// function showSlides(n, id) {
//     var i;
//     var slides = document.getElementsByClassName("custom-slider").getElementById(id);
//     var dots = document.getElementsByClassName("dot").getElementById(id);
//     if (n > slides.length) {slideIndex = 1}
//     if (n < 1) {slideIndex = slides.length}
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";
//     }
//     for (i = 0; i < dots.length; i++) {
//         dots[i].className = dots[i].className.replace(" active", "");
//     }
//     slides[slideIndex-1].style.display = "block";
//     dots[slideIndex-1].className += " active";
// }


var slideIndex = {};
slideIndex['slider1'] = 1;
slideIndex['slider2'] = 1;

showSlides(slideIndex['slider1'], 'slider1');
showSlides(slideIndex['slider2'], 'slider2');

function plusSlide(n, id) {
    showSlides(slideIndex[id] += n, id);
}

function currentSlide(n, id) {
    showSlides(slideIndex[id] = n, id);
}

function showSlides(n, id) {
    var i;

    var slides = document.querySelectorAll('#' + id + ' .custom-slider');
    var dots = document.querySelectorAll('#' + id + ' .dot');
    if (slides.length === 0 || dots.length === 0) {
        console.error("Slider or dots not found for ID:", id);
        return;
    }
    if (n > slides.length) { slideIndex[id] = 1; }
    if (n < 1) { slideIndex[id] = slides.length; }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    slides[slideIndex[id] - 1].style.display = "block";
    dots[slideIndex[id] - 1].classList.add("active");
}



/* caroussel */

function setupCarousel(carouselId) {
    const carousel = document.querySelector(`.${carouselId}`);
    // const arrowBtns = document.querySelectorAll(".content-fest i");
    const arrowLeft = document.getElementById(`left-${carouselId}`);
    const arrowRight = document.getElementById(`right-${carouselId}`);
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    const carouselChildrens = [...carousel.children];

    let isDragging = false, startX, startScrollLeft;

    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });
    carouselChildrens.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    // arrowBtns.forEach(btn => {
    //     btn.addEventListener("click", () => {
    //         carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    //     })
    // })

    arrowLeft.addEventListener("click", () => {
        carousel.scrollLeft -= firstCardWidth;
      });
    
      arrowRight.addEventListener("click", () => {
        carousel.scrollLeft += firstCardWidth;
      });

    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    }

    const dragging = (e) => {
        if(!isDragging) return;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX); 
    }

    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    }

    const infiniteScroll = () => {
        if(carousel.scrollLeft === 0) {
            carousel.classList.add("no-tansition");
            carousel.scrollLeft = carousel.scrollWidth - ( 2 * carousel.offsetWidth);
            carousel.classList.remove("no-tansition");
        }
        else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add("no-tansition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-tansition");
        }
    }
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);
}

setupCarousel("carousel1");
setupCarousel("carousel2");
setupCarousel("carousel3");

/* affichage/cachage des détails des festivals */

$(document).ready(function() {
    $(".card").click(function() {
        var targetId = $(this).data("target");
        var detail = $("#" + targetId);
        
        // Si le détail est déjà ouvert, le fermer
        if (detail.is(":visible")) {
            detail.hide();
        } else {
            // Cacher tous les détails, puis afficher celui correspondant à la carte cliquée
            $(".détails").hide();
            detail.css("display", "flex"); // Modifier display en flex
        }
    });
});


/* rotation du chevron */

// Sélectionne tous les éléments avec la classe "card"
var cards = document.getElementsByClassName("card");

// Parcourt tous les éléments avec la classe "card" et ajoute un gestionnaire d'événements à chacun
for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function() {
        // Lorsque l'élément est cliqué, recherchez l'élément ".fa-chevron-down" à l'intérieur de cet élément et basculez la classe "active"
        var chevron = this.querySelector('.fa-chevron-down');
        if (chevron) {
            chevron.classList.toggle("active");
        }
    });
}



/* search bar */

const searchBar = document.querySelector('.search-bar');
const searchInput = searchBar.querySelector('input');

searchInput.addEventListener('focus', () => {
  searchBar.classList.add('open');
});

searchInput.addEventListener('blur', () => {
  searchBar.classList.remove('open');
});



