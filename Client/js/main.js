//?? SHOW MENU */

const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')


//?? MENU SHOW */
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

//?? MENU HIDDEN */
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}


/*?? REMOVE MENU MOBILE */
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


//?? CHANGE BACKGROUND HEADER */
const scrollHeader = () => {
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('scroll-header')
        : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)


//?? TESTIMONIAL SWIPER */
let testimonialSwiper = new Swiper(".testimonial-swiper", {
    spaceBetween: 30,
    loop: 'true',

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


//?? NEW SWIPER ??*/
let newSwiper = new Swiper(".new-swiper", {
    spaceBetween: 24,
    loop: 'true',

    breakpoints: {
        576: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        1024: {
            slidesPerView: 4,
        },
    },


});


//?? SCROLL SECTIONS ACTIVE LINK ??*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')


    })
}
window.addEventListener('scroll', scrollActive)


//?? SHOW SCROLL UP ??*/

const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up');

    if (window.scrollY >= 550) {
        scrollUp.classList.add('show-scroll');
        scrollUp.classList.remove('hide-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
        scrollUp.classList.add('hide-scroll');
    }
}

window.addEventListener('scroll', scrollUp);



//?? Cart ??//

const cart = document.getElementById('cart')
const cartShop = document.getElementById('cart-shop')
const cartClose = document.querySelector(".cart__close")



if (cartShop) {
    cartShop.addEventListener('click', () => {
        cart.classList.add('show-cart')
    })
}

if (cartClose) {
    cartClose.addEventListener('click', () => {
        cart.classList.remove('show-cart')
    })
}

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
        cart.classList.remove('show-cart'); // افزودن این خط برای بستن کارت هنگام کلیک بر روی منو
    });
}




//? Add Card ?//










//?? DARK LIGHT THEME ??*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'


// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())

})



const sectionAbout = document.querySelector('section-About-box');
themeButton.addEventListener('click', () => {



})



//? Add Api //

const cardContiner = document.querySelector('#products');
const featured = document.querySelector('#featured');
const newSwiperr = document.querySelector('#new-swiper');

const urlApi = "https://api.apify.com/v2/datasets/Sntk8efIVdLtWUgud/items?clean=true&format=json";

myProducts()

function myProducts() {

    fetch(urlApi)
        .then((res) => {
            return res.json();
        })


        .then(data => {
            const div = document.createElement('div');
            div.className = 'products__container grid';

            data.slice(13, 33).forEach((products) => {

                const divProdust = `<div class="products__card">

                 <img src="${products.images_urls[0]}" alt="" class="products__img"></img>

                    <h3 class="products__title">${products.brand}</h3>
                    <h4 class="products__title">${products.title}</h4>
                    <span class="products__price">${products.price} $  </span>

                    <button class="add-card products__button">
                        <i class='bx bx-shopping-bag'></i>
                    </button>
                </div>`;

                if (products.product_type === "Watch") {
                    cardContiner.appendChild(div);
                    div.innerHTML += divProdust

                }


            })


        })

        .catch(error => console.log(error));
}







myfeatured()
function myfeatured() {

    fetch(urlApi)
        .then((res) => {
            return res.json();
        })

        .then(data => {
            const div = document.createElement('div');
            div.className = 'featured__container grid';

            data.slice(0, 12).forEach((products) => {



                const divProdust = `<div class="featured__card">
                    <span class="featured__tag">Sale</span>

                    <img src="${products.images_urls[0]}" alt="" class="featured__img">

                    <div class="featured__data">
                        <h3 class="featured__title">${products.brand}</h3>
                        <span class="featured__price">${products.price} $</span>
                    </div>

                    <button class="add-card button featured__button">ADD TO CART</button>
                </div>`



                if (products.product_type === "Watch") {

                    featured.append(div);
                    div.innerHTML += divProdust
                }


            })


        })

        .catch(error => console.log(error));

}




//??Form ?//





// ایجاد یک شیء ScrollReveal جدید
const sr = ScrollReveal({
    distance: '60px',
    duration: 2500,
    delay: 100
});

// تعریف یک انیمیشن برای المان های مورد نظر
sr.reveal('.home__social-link', { origin: 'top', interval: 400 });
sr.reveal('.home__title ', { origin: 'left', delay: 300 });
sr.reveal('.home__description ', { origin: 'left', delay: 200 });
sr.reveal('.home__img', { origin: 'right', delay: 200 });

sr.reveal('.story__img', { origin: 'left', delay: 500 });

sr.reveal('.section__title, .story__title, .story__description, .button--small  ', { origin: 'right', interval: 300 });

sr.reveal('.testimonial__img', { origin: 'right', delay: 500 });
sr.reveal('.testimonial__description, .testimonial__date, .testimonial__perfil', { origin: 'left', interval: 300 });

sr.reveal('.newsletter__title, .newsletter__description, .newsletter__input, .btn2', { origin: 'bottom', interval: 300 });

sr.reveal('.footer__container ', { origin: 'bottom', interval: 300 });