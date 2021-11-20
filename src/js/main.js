/*
* to include js file write: `//= include ./path-to-file`
* */

//= include ../../node_modules/jquery/dist/jquery.js ;
//= include ../../node_modules/waypoints/lib/jquery.waypoints.min.js ;


// CUSTOM SCRIPTS

$(document).ready(function () {

    //MOBILE MENU
    var nav = $('.header__nav');

    $('.btn-burger').click(function (e) {
        e.preventDefault();
        nav.addClass('open');
        jQuery('.backdrop').fadeIn();
    });

    $('.btn-close, .backdrop').click(function (e) {
        e.preventDefault();
        nav.removeClass('open');
        jQuery('.backdrop').fadeOut();
    });

    // SMOOTH SCROLL TO ANCHOR
    function smoothScrollToAnchor(selector) {
        $(selector).on('click', function (event) {
            let anchor = $.attr(this, 'href')

            if (anchor.match(/^#/) && anchor !== '#') {
                event.preventDefault()
                let offsetSize = $("header").innerHeight();
                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top - offsetSize
                }, 2000);
                nav.removeClass('open');
                jQuery('.backdrop').fadeOut();
                $('body').removeClass('modal_open');
            }
        })

    }
    smoothScrollToAnchor('.btn_scroll');
    smoothScrollToAnchor('.menu__link');

    //BANNER SLIDER HOME
    const home_banner_slider = new Swiper(".slider-services", {
        slidesPerView: "auto",
        spaceBetween: 30,
        speed: 1500,
        navigation: {
            nextEl: ".slider__arrow_next",
            prevEl: ".slider__arrow_prev",
        },
    });


    //PARTNER  SLIDE
    const partners_slider = new Swiper(".partners-slider", {
        slidesPerView: 1,
        speed: 0,
        allowTouchMove: false,
        loop: true,
        on: {
            afterInit: function () {
                $(this.slides[this.activeIndex]).find('.cover-anim').addClass('anim_started');
                $(this.slides[this.activeIndex]).find('.fade').addClass('anim_started');
            }
        }
    });

    const animTime = 600;

    partners_slider.on('slideChange', function () {
        $(this.slides[this.activeIndex]).find('.cover-anim').addClass('anim_started');
        $(this.slides[this.activeIndex]).find('.fade').addClass('anim_started');
    });

    $('.partners-slider__next').click(function () {
        $('.partners-slider .anim_started').removeClass('anim_started');
        setTimeout(function () {
            partners_slider.slideNext();
        }, animTime);
    });

    $('.partners-slider__prev').click(function () {
        $('.partners-slider .anim_started').removeClass('anim_started');
        setTimeout(function () {
            partners_slider.slidePrev();
        }, animTime);
    });

//CONTACTS SLIDER
    var contactSlider = new Swiper(".contacts-slider", {
        direction: "vertical",
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

//    ANIMATION
    const sectionDrones = document.querySelector('.drones__img-blocks');

    if (sectionDrones) {
        const sectorRotate = new Waypoint({
            element: sectionDrones,
            handler: function (direction) {
                this.element.classList.add('active_anim');
            },
            offset: '60%'
        });
    }

    const clients_review = new Swiper(".slider-reviews", {
        spaceBetween: 30,
        speed: 1500,
        navigation: {
            nextEl: ".slider__arrow_next",
            prevEl: ".slider__arrow_prev",
        },
        on: {
            afterInit: function () {
                const $slider = $('.slider-reviews');
                const currIndexEL = $slider.find('.current-slide');
                const totalIndexEL = $slider.find('.total-slides');
                $(currIndexEL).html(this.activeIndex + 1);
                $(totalIndexEL).html(this.slides.length);
            }
        }
    });

    clients_review.on('slideChange', function () {
        const $slider = $('.slider-reviews');
        const currIndexEL = $slider.find('.current-slide');
        const totalIndexEL = $slider.find('.total-slides');
        $(currIndexEL).html(this.activeIndex + 1);
        $(totalIndexEL).html(this.slides.length);
    });

    //    VIDEO YOUTYBE
    // function findVideos() {
    //     let videos = document.querySelectorAll('.video__content');
    //
    //     for (let i = 0; i < videos.length; i++) {
    //         setupVideo(videos[i]);
    //     }
    // }
    //
    // function setupVideo(video) {
    //     let link = video.querySelector('.video__link');
    //     let media = video.querySelector('.video__media');
    //     let button = video.querySelector('.btn_video');
    //     // let id = parseMediaURL(media);
    //
    //     let id = media.getAttribute('data-video');
    //
    //     video.addEventListener('click', () => {
    //         let iframe = createIframe(id);
    //
    //         link.remove();
    //         button.remove();
    //         video.appendChild(iframe);
    //     });
    //
    //     link.removeAttribute('href');
    //     video.classList.add('video_enabled');
    // }
    //
    // // function parseMediaURL(media) {
    // //     let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
    // //     let url = media.src;
    // //     let match = url.match(regexp);
    // //
    // //     return match[1];
    // // }
    //
    // function createIframe(id) {
    //     let iframe = document.createElement('iframe');
    //
    //     iframe.setAttribute('allowfullscreen', '');
    //     iframe.setAttribute('allow', 'autoplay');
    //     iframe.setAttribute('src', generateURL(id));
    //     iframe.classList.add('video__media');
    //
    //     return iframe;
    // }
    //
    // function generateURL(id) {
    //     let query = '?rel=0&showinfo=0&autoplay=1';
    //     return 'https://www.youtube.com/embed/' + id + query;
    // }
    //
    // findVideos();

});
