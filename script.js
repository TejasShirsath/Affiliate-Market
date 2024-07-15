const webfileLocation = "https://affiliate-market.netlify.app" //change this to your own webfiles location

const pages = ["shop.html", "productDetails.html", "about.html", "contact.html"];
const currentUrl = window.location.href;
const backendUrl = "https://affiliate-market-wheat.vercel.app"


function navbar(){
    const bar = document.getElementById('bar');
    const close = document.getElementById('close');
    const nav = document.getElementById('navbar');

    if (bar) {
        bar.addEventListener('click', () => {
            nav.classList.add('active');
        })
    }

    if (close) {
        close.addEventListener('click', () => {
            nav.classList.remove('active');
        })
    }
}

navbar();



class homePageSlider {
    constructor() {
        this.slideImages = document.querySelectorAll('#slide');
        this.dots = document.querySelectorAll('.dot');
        this.counter = 0;
        this.deletInterval = null;
    }

    slideNext() {
        this.slideImages[this.counter].style.animation = 'next1 0.5s ease-in forwards';
        if (this.counter >= this.slideImages.length - 1) {
            this.counter = 0;
        } else {
            this.counter++;
        }
        this.slideImages[this.counter].style.animation = 'next2 0.5s ease-in forwards';
        this.indicators();
    }

    slidePrev() {
        this.slideImages[this.counter].style.animation = 'prev1 0.5s ease-in forwards';
        if (this.counter == 0) {
            this.counter = this.slideImages.length - 1;
        } else {
            this.counter--;
        }
        this.slideImages[this.counter].style.animation = 'prev2 0.5s ease-in forwards';
        this.indicators();
    }

    autoSliding() {
        this.deletInterval = setInterval(() => {
            this.slideNext();
            this.indicators();
        }, 3000);
    }

    indicators() {
        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i].className = this.dots[i].className.replace(' active', '');
        }
        this.dots[this.counter].className += ' active';
    }

    switchImage(currentImage) {
        currentImage.classList.add('active');
        let imageId = currentImage.getAttribute('attr');
        if (imageId > this.counter) {
            this.slideImages[this.counter].style.animation = 'next1 0.5s ease-in forwards';
            this.counter = imageId;
            this.slideImages[this.counter].style.animation = 'next2 0.5s ease-in forwards';
        } else if (imageId == this.counter) {
            return;
        } else {
            this.slideImages[this.counter].style.animation = 'prev1 0.5s ease-in forwards';
            this.counter = imageId;
            this.slideImages[this.counter].style.animation = 'prev2 0.5s ease-in forwards';
        }
        this.indicators();
    }
}
const HomePageSlider = new homePageSlider();



function productList(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', backendUrl+'/data', true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);

            var featuredProducts = data.featuredProducts;
            var products = data.products;
            
            //  code area start

            // Featured - Product Container Code
            if (!pages.some(page => currentUrl.includes(page)) || currentUrl.includes("index.html")) {

                var featuredProductContainerDynamic = document.getElementById("featuredProductContainer-Dynamic");

                for (var i = 0; i < featuredProducts.length; i++) {
                    featuredProductContainerDynamic.innerHTML += '<div class="product" onclick="productDetails('+featuredProducts[i].id+')">' +
                                                                    '<div class="productImage">' +
                                                                        '<img src="'+featuredProducts[i].productImg1+'"alt="">' +
                                                                        '<video class="productVideo" muted loop>' +
                                                                            '<source src="'+featuredProducts[i].productVideo+'" type="video/mp4">' +
                                                                        '</video>' +
                                                                    '</div>' +
                                                                    '<div class="description">'+
                                                                        '<h5>'+featuredProducts[i].productTitle+'</h5>' +
                                                                    '</div>' +
                                                                '<a href="#"><i class="fa-solid fa-cart-shopping cart"></i></a>' +
                                                            '</div>';  
                }
            }

            //Product Container Code
            var productContainerDynamic = document.getElementById("productContainer-Dynamic");

            for (var i = products.length-1; i >= 0; i--) {
                productContainerDynamic.innerHTML += '<div class="product" onclick="productDetails('+products[i].id+')">' +
                                                            '<div class="productImage">' +
                                                                '<img src="'+products[i].productImg1+'"alt="">' +
                                                                '<video class="productVideo" muted loop>' +
                                                                    '<source src="'+products[i].productVideo+'" type="video/mp4">' +
                                                                '</video>' +
                                                            '</div>' +
                                                            '<div class="description">'+
                                                                '<h5>'+products[i].productTitle+'</h5>' +
                                                            '</div>' +
                                                        '<a href="#"><i class="fa-solid fa-cart-shopping cart"></i></a>' +
                                                    '</div>';
                
            }           

            const videos = document.querySelectorAll('.productVideo');
            videos.forEach(video => {
                let isHovered = false;
                if (video !== null){
                    video.addEventListener('touchmove', () => {
                        if (!isHovered) {
                            video.play();
                            video.classList.add('hover');
                            isHovered = true;
                        }
                    });

                    video.addEventListener('mouseenter', () => {
                        if (!isHovered) {
                            video.play();
                            video.classList.add('hover');
                            isHovered = true;
                        }
                    });

                    video.addEventListener('mouseleave', () => {
                        video.classList.remove('hover');
                        isHovered = false;
                        video.pause();
                    });
                }
            });
            //  code area end
        }
    };

    xhr.send();
}

function productDetails(productId) {
    var url = "productDetails.html?productId=" + btoa(productId);
    window.location.href = url;
}

function urlParameter(name) {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function fetchData(productId) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', backendUrl+'/product?id=' + productId, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);

            var productTitle = data.productTitle;
            var productDescription = data.productDescription;
            var productImages = [
                data.productImg1,
                data.productImg2,
                data.productImg3,
                data.productImg4,
                data.productImg5
            ];
            var amazonLink = data.productAmazonLink;
            var flipkartLink = data.productFlipkartLink;
            var ebayLink = data.productEbayLink;
            var snapdealLink = data.productSnapdealLink;

            // Title of Webpage
            document.title = productTitle;

            //Product Main Image
            document.getElementById('ProductDetails-ImgContainer').src = productImages[0];

            //Product Image Slider
            var productSlider = document.querySelector('.productDetailsFirstSec-ImgSlides');
            var productSliderHTML = '';
            for (var i = 0; i < productImages.length; i++) {
                if (productImages[i] !== null) {
                    productSliderHTML += '<img src="' + productImages[i] + '" alt="" onclick="productDetailsImgSlideChange(\'' + productImages[i] + '\')">'; 
                }
            }
            productSlider.innerHTML = productSliderHTML;

            //Product Title
            document.getElementById('productDetails-Title').innerHTML = productTitle;

            //Product Description
            document.getElementById('productDetails-Description').innerHTML = productDescription;

            //Product Links
            var productLinksContainer = document.getElementById('productLinks');
            productLinksContainer.innerHTML = '';

            if (amazonLink !== null && amazonLink !== "NULL") {
                productLinksContainer.innerHTML += '<a href="'+amazonLink+'"><div><img src="img/links/amazon.png" alt="Amazon"></div></a>';
            }
            if (flipkartLink !== null && flipkartLink !== "NULL"){
                productLinksContainer.innerHTML += '<a href="'+flipkartLink+'"><div><img src="img/links/flipkart.png" alt="Flipkart"></div></a>';
            }
            if (ebayLink !== null && ebayLink !== "NULL") {
                productLinksContainer.innerHTML += '<a href="'+ebayLink+'"><div><img src="img/links/ebay.png" alt="Ebay"></div></a>';
            }
            if (snapdealLink !== null && snapdealLink !== "NULL"){
                productLinksContainer.innerHTML += '<a href="'+snapdealLink+'"><div><img src="img/links/snapdeal.png" alt="Snapdeal"></div></a>';
            }

        }
    };
    xhr.send();
}




function productDetailsImgSlideChange(src) {
    var imgContainer = document.getElementById("ProductDetails-ImgContainer");
    if (imgContainer) {
        imgContainer.src = src;
    }
}


function heroSliderShopPage() {
    let nextButton = document.getElementById('shoppage-next');
    let prevButton = document.getElementById('shoppage-prev');
    let carousel = document.querySelector('.carousel');
    let listHTML = document.querySelector('.carousel .list');

    let unAcceppClick;
    let sliderInterval;

    const startSliderInterval = () => {
        sliderInterval = setInterval(() => {
            showSlider('next');
        }, 5000);
    };

    const stopSliderInterval = () => {
        clearInterval(sliderInterval);
    };

    nextButton.onclick = function() {
        stopSliderInterval();
        showSlider('next');
        startSliderInterval();
    };

    prevButton.onclick = function() {
        stopSliderInterval();
        showSlider('prev');
        startSliderInterval();
    };

    const showSlider = (type) => {
        nextButton.style.pointerEvents = 'none';
        prevButton.style.pointerEvents = 'none';

        carousel.classList.remove('next', 'prev');
        let items = document.querySelectorAll('.carousel .list .item');
        if (type === 'next') {
            listHTML.appendChild(items[0]);
            carousel.classList.add('next');
        } else {
            listHTML.prepend(items[items.length - 1]);
            carousel.classList.add('prev');
        }
        clearTimeout(unAcceppClick);
        unAcceppClick = setTimeout(() => {
            nextButton.style.pointerEvents = 'auto';
            prevButton.style.pointerEvents = 'auto';
        }, 1000);
    };

    startSliderInterval();
}





// run script

if (!pages.some(page => currentUrl.includes(page)) || currentUrl.includes("index.html")) {
    HomePageSlider.autoSliding();
    productList();
    heroSliderShopPage();
}

if (currentUrl.includes("shop.html")) {
    productList();
    heroSliderShopPage();
}

if (currentUrl.includes("productDetails.html")) {
    var productId = atob(urlParameter('productId'));
    fetchData(productId);
    productList();
}