
document.addEventListener("DOMContentLoaded", showProduct);



//?? SHOW MENU */

const navMenu = document.getElementById("nav-menu"),
    navToggle = document.getElementById("nav-toggle"),
    navClose = document.getElementById("nav-close");

//?? MENU SHOW */

/* Validate if constant exists */

if (navToggle) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.add("show-menu");
    });
}

//?? MENU HIDDEN */

/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener("click", () => {
        navMenu.classList.remove("show-menu");
    });
}

/*?? REMOVE MENU MOBILE */
const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
    const navMenu = document.getElementById("nav-menu");
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove("show-menu");
};

navLink.forEach((n) => n.addEventListener("click", linkAction));

//?? CHANGE BACKGROUND HEADER */

const scrollHeader = () => {
    const header = document.getElementById("header");
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50
        ? header.classList.add("scroll-header")
        : header.classList.remove("scroll-header");
};
window.addEventListener("scroll", scrollHeader);

//?? TESTIMONIAL SWIPER */

let testimonialSwiper = new Swiper(".testimonial-swiper", {
    spaceBetween: 30,
    loop: "true",

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

//?? NEW SWIPER ??*/

let newSwiper = new Swiper(".new-swiper", {
    spaceBetween: 24,
    loop: "true",

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
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

const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute("id"),
            sectionsClass = document.querySelector(
                ".nav__menu a[href*=" + sectionId + "]"
            );
    });
};
window.addEventListener("scroll", scrollActive);

//?? SHOW SCROLL UP ??*/

const scrollUp = () => {
    const scrollUp = document.getElementById("scroll-up");

    if (window.scrollY >= 550) {
        scrollUp.classList.add("show-scroll");
        scrollUp.classList.remove("hide-scroll");
    } else {
        scrollUp.classList.remove("show-scroll");
        scrollUp.classList.add("hide-scroll");
    }
};

window.addEventListener("scroll", scrollUp);

//?? DARK LIGHT THEME ??*/

const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
    themeButton.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
        darkTheme
    );
    themeButton.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](
        iconTheme
    );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    // We save the theme and the current icon that the user chose
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
});

const sectionAbout = document.querySelector("section-About-box");
themeButton.addEventListener("click", () => { });

//?? Cart ??//

let dataCart = [];
const cart = document.getElementById("cart");
const cartShop = document.getElementById("cart-shop");
const cartClose = document.querySelector(".cart__close");
const cartContainer = document.querySelector(".cart__container");

/* Add to Cart */

function showProduct() {
    cartContainer.innerHTML = "";
    const products = JSON.parse(localStorage.getItem("basketProducts")) || [];
    dataCart = products

    let totalPrice = 0; // جمع قیمت‌ها


    products.forEach((itemProduct) => {
        const divCartProduct = `<section class="cart__card">

                    <div class="cart__box">
                        <img src="${itemProduct.Image}" alt="" class="cart__img">
                    </div>

                    <div class="cart__details">
                        <h3 class="cart__title">${itemProduct.brand}</h3>
                        <span class="cart__price">${itemProduct.price}</span>

                        <div class="cart__amount">

                            <div class="cart__amount-content">
                                <span class="cart__amount-box minus" data-id="${itemProduct._id}">
                                    <i class='bx bx-minus '></i>
                                </span>


                                <span class="cart__amount-number">${itemProduct.count}</span>

                                <span class="cart__amount-box plus" data-id="${itemProduct._id}">
                                    <i class='bx bx-plus '></i>
                                </span>
                            </div>

                            <i class='bx bx-trash-alt cart__amount-trash' data-id="${itemProduct._id}"></i>
                        </div>
                    </div>

                   

                </section>`;

        cartContainer.innerHTML += divCartProduct;

        const productTotalPrice = parseFloat(itemProduct.price) * parseInt(itemProduct.count);  // قیمت کل محصول
        totalPrice += productTotalPrice;
    });



    const minusBtn = document.querySelectorAll(".minus");
    minusBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            const product = dataCart.find((item) => item._id === id);
            if (product.count > 1) {
                product.count--;
                localStorage.setItem("basketProducts", JSON.stringify(dataCart));
                showProduct();
            }
        });
    });

    const plusBtn = document.querySelectorAll(".plus");
    plusBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            const product = dataCart.find((item) => item._id === id);

            product.count++;
            localStorage.setItem("basketProducts", JSON.stringify(dataCart));
            showProduct();
        });
    });

    const trashBtn = document.querySelectorAll(".cart__amount-trash");
    trashBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            const newCart = dataCart.filter((item) => item._id !== id);
            dataCart = newCart;
            localStorage.setItem("basketProducts", JSON.stringify(dataCart));

            showProduct();



        });
    });





    const totalPriceElement = document.getElementById("total-price");
    totalPriceElement.textContent = totalPrice.toFixed(2);

    const buyBtn = document.querySelector(".btn-Buy");
    buyBtn.addEventListener("click", clearCart);

    function clearCart() {
        // پاک کردن محتوای سبد خرید از localStorage

        if (!dataCart.length) {
            return;
        }
        localStorage.removeItem("basketProducts");

        // نمایش پیغام
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Your Purchase is Complete',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'my-custom-popup',
                title: 'my-custom-title',
                content: 'my-custom-content',
                closeButton: 'my-custom-close-button',
                loader: '.swal2-icon.swal2-success'
            }
        });

        // نمایش سبد خرید به روز شده
        showProduct();
    }

}

/*Show Cart*/

if (cartShop) {
    cartShop.addEventListener("click", () => {
        cart.classList.add("show-cart");
    });
}

if (cartClose) {
    cartClose.addEventListener("click", () => {
        cart.classList.remove("show-cart");
    });
}

/*Close the card when openi the menu*/

if (navToggle) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.add("show-menu");
        cart.classList.remove("show-cart"); // افزودن این خط برای بستن کارت هنگام کلیک بر روی منو
    });
}


//? Add API to display Products//

const cardContiner = document.querySelector("#products");
const featured = document.querySelector("#featured");
const newSwiperr = document.querySelector("#new-swiper");

const urlApi = "http://localhost:5000/Products";

let dataProducts = [];

fetchDataProducts();
async function fetchDataProducts() {
    const response = await fetch(urlApi);
    const products = await response.json();
    dataProducts = products;
    myProducts();
    myfeatured();
    newProducts();
}



async function myProducts() {
    const div = document.createElement("div");
    div.className = "products__container grid";



    dataProducts
        .filter((product) => product.Tag === undefined)
        .forEach((products) => {



            const divProdust = `<div class="products__card">

                 <img src="${products.Image}" alt="" class="products__img"></img>

                    <h3 class="products__title">${products.brand}</h3>
                    <h6 class="products__name">${products.name}</h6>
                    <span class="products__price">${products.price}</span>

                    <button class="add-card products__button " data-id="${products._id}">
                        <i class='bx bx-shopping-bag'></i>
                    </button>
                </div>`;

            cardContiner.appendChild(div);
            div.innerHTML += divProdust;

        });
    sr.reveal(
        ".products__card",
        { origin: "top", interval: 200 }
    );



    const addBtn = document.querySelectorAll(".products__button");
    addBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            const existingProduct = dataCart.find((product) => product._id === id);

            if (existingProduct) {
                existingProduct.count++;
            } else {
                const newProduct = dataProducts.find((product) => product._id === id);
                newProduct.count = 1;
                dataCart.push(newProduct);

                const addedToCart = localStorage.getItem("addedToCart");
                if (addedToCart && addedToCart === "true") {
                    // Display the alert message after a slight delay
                    setTimeout(() => {



                        Swal.fire({
                            position: 'top',
                            icon: 'success',
                            title: 'The product has been added to the Cart',
                            showConfirmButton: false,
                            timer: 1500,
                            customClass: {
                                popup: 'my-custom-popup',
                                title: 'my-custom-title',
                                content: 'my-custom-content',
                                closeButton: 'my-custom-close-button',
                                loader: '.swal2-icon.swal2-success'
                            }

                        });


                    }, 10);

                } else {
                    localStorage.setItem("addedToCart", "true");
                }

            }



            localStorage.setItem("basketProducts", JSON.stringify(dataCart));
            showProduct();

        });
    });




}

async function myfeatured() {
    const div = document.createElement("div");
    div.className = "featured__container grid";

    dataProducts
        .filter((product) => product.Tag === "featured")
        .forEach((products) => {
            const divProdust = `<div class="featured__card">
                    <span class="featured__tag">Sale</span>

                    <img src="${products.Image}" alt="" class="featured__img">

                    <div class="featured__data">
                        <h3 class="featured__title">${products.brand}</h3>
                         <h6 class="featured__name">${products.name}</h6>
                        <span class="featured__price">${products.price} </span>
                    </div>

                    <button class="add-card button featured__button" data-id=${products._id}>ADD TO CART</button>
                </div>`;

            featured.append(div);
            div.innerHTML += divProdust;

        });
    sr.reveal(
        ".featured__card",
        { origin: "bottom", interval: 200 }
    );

    const addBtn = document.querySelectorAll(".add-card");
    addBtn.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            const existingProduct = dataCart.find((product) => product._id === id);

            if (existingProduct) {
                existingProduct.count++;
            } else {
                const newProduct = dataProducts.find((product) => product._id === id);
                newProduct.count = 1;
                dataCart.push(newProduct);

                const addedToCart = localStorage.getItem("addedToCart");
                if (addedToCart && addedToCart === "true") {
                    // Display the alert message after a slight delay
                    setTimeout(() => {



                        Swal.fire({
                            position: 'top',
                            icon: 'success',
                            title: 'The product has been added to the Cart',
                            showConfirmButton: false,
                            timer: 1500,
                            customClass: {
                                popup: 'my-custom-popup',
                                title: 'my-custom-title',
                                content: 'my-custom-content',
                                closeButton: 'my-custom-close-button',
                                loader: '.swal2-icon.swal2-success'
                            }

                        });


                    }, 10);

                } else {
                    localStorage.setItem("addedToCart", "true");
                }
            }

            localStorage.setItem("basketProducts", JSON.stringify(dataCart));
            showProduct();
        });
    });

}

async function newProducts() {
    const newSwiper = document.getElementById("new-swiper");

    dataProducts
        .filter((product) => product.Tag === "new")
        .forEach((products) => {
            const divProdust = `<article class="new__card swiper-slide">
      <span class="new__tag">New</span>

      <img src="${products.Image}" alt="" class="new__img">

      <div class="new__data">
          <h3 class="new__title">${products.brand}</h3>
          <h6 class="new__name">${products.name}</h6>
          <span class="new__price">${products.price}</span>
      </div>

      <button class="button new__button" data-id="${products._id}">ADD TO CART</button>
  </article>`;

            newSwiper.innerHTML += divProdust;
        });

    sr.reveal(
        ".new-swiper",
        { origin: "", interval: 200 }
    );

    const addBtn = document.querySelectorAll(".new__button");
    addBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            const exists = dataCart.find((product) => product._id === id);

            if (exists) {
                const newData = dataCart.map((product) => {
                    if (product._id === id) {
                        return {
                            ...product,
                            count: product.count + 1,
                        };
                    }
                    return product;
                });
                dataCart = newData;
                localStorage.setItem("basketProducts", JSON.stringify(dataCart));
                showProduct();
            } else {
                const myProduct = dataProducts.find((product) => product._id === id);
                myProduct.count = 1;
                dataCart.push(myProduct);

                const addedToCart = localStorage.getItem("addedToCart");
                if (addedToCart && addedToCart === "true") {
                    // Display the alert message after a slight delay
                    setTimeout(() => {



                        Swal.fire({
                            position: 'top',
                            icon: 'success',
                            title: 'The product has been added to the Cart',
                            showConfirmButton: false,
                            timer: 1500,
                            customClass: {
                                popup: 'my-custom-popup',
                                title: 'my-custom-title',
                                content: 'my-custom-content',
                                closeButton: 'my-custom-close-button',
                                loader: '.swal2-icon.swal2-success'
                            }

                        });


                    }, 10);

                } else {
                    localStorage.setItem("addedToCart", "true");
                }

            }

            localStorage.setItem("basketProducts", JSON.stringify(dataCart));
            showProduct();
        });
    });
}

// ایجاد یک شیء ScrollReveal جدید

const sr = ScrollReveal({
    distance: "60px",
    duration: 2500,
    delay: 100,
});

// تعریف یک انیمیشن برای المان های مورد نظر

sr.reveal(".home__social-link i", { dalay: 400, origin: 'top', interval: 200 });

sr.reveal(".home__title ", { origin: "left", delay: 300 });
sr.reveal(".home__description ", { origin: "left", delay: 200 });
sr.reveal(".home__img", { origin: "right", delay: 200 });

sr.reveal(".story__img", { origin: "left", delay: 500 });

sr.reveal(
    ".section__title, .story__title, .story__description, .button--small",
    { origin: "right", interval: 300 }
);

sr.reveal(".testimonial__img", { origin: "right", delay: 500 });
sr.reveal(
    ".testimonial__description, .testimonial__date, .testimonial__perfil",
    { origin: "left", interval: 300 }
);

sr.reveal(".newsletter__title, .newsletter__description, .newsletter__input, .btn2", { origin: "bottom", interval: 300 }
);

sr.reveal(".footer__container ", { origin: "bottom", interval: 300 });


//??Form ?//

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container-form");
const form = document.querySelector("#form");

const signUpForm = document.querySelector('.sign-up-form');
const signInForm = document.querySelector('.sign-in-form');

// Load form data from local storage

if (localStorage.getItem("formState")) {
    container.classList.add(localStorage.getItem("formState"));
}

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
    localStorage.setItem("formState", "sign-up-mode");


});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
    localStorage.setItem("formState", "");
});


//Sign Up

signUpForm.addEventListener('submit', function (event) {

    // Prevent default form submission behavior

    event.preventDefault();

    // Get form data

    const formData = {
        username: signUpForm.querySelector('input[name=username]').value,
        email: signUpForm.querySelector('input[name=email]').value,
        phone: signUpForm.querySelector('input[name=phone]').value,
        password: signUpForm.querySelector('input[name=password]').value
    };



    // Send form data using Axios

    axios.post('http://localhost:5000/users/register', formData)

        .then(function (response) {


            // Handle successful registration

            console.log('Registration successful!');

            signUpForm.reset();

            console.log(response.data); // "success"
            console.log(response.data.message);

            // Clear form fields

            signUpForm.querySelector('input[name=username]').value = '';
            signUpForm.querySelector('input[name=email]').value = '';
            signUpForm.querySelector('input[name=phone]').value = '';
            signUpForm.querySelector('input[name=password]').value = '';

            setTimeout(() => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: 'User registration successful!'
                })

            }, 100);
        })




        .catch(function (error) {

            // Handle registration error

            console.log('Registration failed: ' + error);
            alert(error.response.data.error);

        });


});


//Sign in

signInForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = signInForm.querySelector('input[type="text"]').value;
    const password = signInForm.querySelector('input[type="password"]').value;

    if (!username || !password) {
        alert('Please fill in all fields');
        return;
    }

    try {
        const response = await axios.post('http://localhost:5000/users/login', { username, password });

        if (response.status === 200) {

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Login successful.'
            })

            setTimeout(() => {
                window.location.href = '/Client/index.html';
            }, 1100);


        } else {
            alert(response.data);


        }
    } catch (error) {
        alert(error.response.data);


    }
});


