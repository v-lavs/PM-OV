/*
* to include js file write: `//= include ./path-to-file`
* */

//= include ../../node_modules/jquery/dist/jquery.js ;


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

    smoothScrollToAnchor('.menu__link')

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
});
