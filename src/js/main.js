/*
* to include js file write: `//= include ./path-to-file`
* */

//= include ../../node_modules/jquery/dist/jquery.js ;
//= include ../../node_modules/waypoints/lib/jquery.waypoints.min.js ;
//= include ../../node_modules/jquery-nice-select/js/jquery.nice-select.js
//= include ../../node_modules/baguettebox.js/dist/baguetteBox.min.js ;


// CUSTOM SCRIPTS

// global variable for the player
let player;

function onPlayerReady(event) {
    // bind events
    alert('onPlayerReady')
    const playButton = document.getElementById("customPlaybtn");

    playButton.addEventListener("click", function () {
        console.log('clcik')
        player.playVideo();
        document.querySelector('.video__poster').style.display = 'none'
    });
}

// this function gets called when API is ready to use
function onYouTubePlayerAPIReady() {
    // create the global player from the specific iframe (#video)
    player = new YT.Player("youtube-video", {
        events: {
            // call this function when player is ready to use
            onReady: onPlayerReady
        }
    });
}


// Inject YouTube API script
const tag = document.createElement("script");
tag.src = "//www.youtube.com/player_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);



$(document).ready(function () {
    function useTextRevealAnim() {
        const $textWrap = $('.text-reveal');

        $textWrap.each(function (index, item) {
            const textContent = $(item).text();

            const parsedWords = textContent.split(' ').map(function (item) {
                const wordWrap = $('<span class="text-reveal__word-wrap"></span>');
                const word = $('<span class="text-reveal__word"></span>');

                word.html(item + '&nbsp;');
                wordWrap.html(word);

                return wordWrap;
            });

            $(item).html(parsedWords);
        });
    }

    // HOME BANNER ANIMATION
    useTextRevealAnim();

    setTimeout(function () {
        $('.section-intro').addClass('anim_started');
        $('.header.fadeInUp').addClass('active_anim');
    }, 500);

    setTimeout(() => {
        const neuronBanner = lottie.loadAnimation({
            container: document.getElementById('neuron__img'),
            renderer: 'svg',
            loop: false,
            autoplay: true,
            preserveAspectRatio: "xMidYMid meet",
            path: './assets/json/main_screen.json'
        })
    }, 600);

    //MOBILE MENU
    const nav = $('.header__nav');

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


    //OPEN FILTER
    const filter = $('.news-filter');

    $('#openFilter').click(function (e) {
         e.preventDefault();
        filter.toggleClass('open');
    });

    const filterPr = $('.projects-filter');

    $('#openFilterPr').click(function (e) {
        e.preventDefault();
        filterPr.toggleClass('open');
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

    //CUSTOM SELECT
    $('.custom-select').niceSelect();

    //BANNER SLIDER HOME

    const home_banner_slider = new Swiper(".slider-services", {
        slidesPerView: 1,
        spaceBetween: 30,
        slidesOffsetAfter: 30,
        speed: 1500,
        navigation: {
            nextEl: ".slider__arrow_next",
            prevEl: ".slider__arrow_prev",
        },
        breakpoints: {
            581: {
                slidesPerView: 'auto',
            },
        },
    });


    let majorProjectsSlider;

    function slidersInit() {
        if ($(window).width() >= 768) {
            if (!majorProjectsSlider) {
                majorProjectsSlider = new Swiper(".slider-mj-project", {
                    slidesPerView: "auto",
                    spaceBetween: 30,
                    slidesOffsetAfter: 30,
                    speed: 1500,
                    navigation: {
                        nextEl: ".slider__arrow_next",
                        prevEl: ".slider__arrow_prev",
                    },
                });
            }
        } else {
            if (majorProjectsSlider) {
                majorProjectsSlider.destroy(true, true);
                majorProjectsSlider = null;
            }
        }
    }

    slidersInit();

    $(window).on('resize', function () {
        slidersInit();
    });

    // LAYOUT TOGGLE

    const $layoutToggle = $('.layout-toggle');

    $layoutToggle.find('.layout-toggle__btn').click(function () {
        const $parent = $(this).parent('.layout-toggle');
        const btns = $parent.find('.layout-toggle__btn');

        const selected_layout_class = $(this).data('layout');
        const layout_ID = $parent.data('for');
        const $layout = $('#' + layout_ID);

        const layoutClasses = $(btns).map(function (index, item) {
            return $(item).data('layout');
        });

        $(btns).removeClass('layout-toggle__btn_active');
        $(this).addClass('layout-toggle__btn_active');

        layoutClasses.each(function (index, className) {
            $layout.removeClass(className);
        });

        $layout.addClass(selected_layout_class);
    });

    //PARTNER  SLIDE
    const quoteHolder = $('#partner-quote');

    function showPartnerQuote(currSlide) {
        if (quoteHolder.length > 0) {
            const quote = $(currSlide).find('.quote-template').html();
            quoteHolder.html(quote);
        }
    }

    const partners_slider = new Swiper(".partners-slider", {
        slidesPerView: 1,
        speed: 0,
        allowTouchMove: false,
        loop: true,
        on: {
            afterInit: function () {
                const currSlide = this.slides[this.activeIndex];
                $(currSlide).find('.cover-anim').addClass('anim_started');
                $(currSlide).find('.fade').addClass('anim_started');
                showPartnerQuote(currSlide);
            }
        }
    });

    const animTime = 600;

    //CLIENTS REVIEW
    partners_slider.on('slideChange', function () {
        const currSlide = this.slides[this.activeIndex];
        $(currSlide).find('.cover-anim').addClass('anim_started');
        $(currSlide).find('.fade').addClass('anim_started');
        showPartnerQuote(currSlide);
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

    const contactSlider = new Swiper(".contacts-slider", {

        direction: "horizontal",

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            320: {
                direction: "horizontal",
            },

            767: {
                direction: "vertical",
            }
        }

    });


    //SLIDER REVIEW
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



    //    GALLERY
    const gallery = baguetteBox.run('.gallery', {animation: 'fadeIn'});


    //    ANIMATION

    $('.fadeInUp').addClass('active_anim');


    $('.fadeInDown').addClass('active_anim');


    setTimeout(function () {
        $('.section-banner').addClass('anim_started');
    }, 500);
    setTimeout(function () {
        $('.single-news .section-banner').addClass('active_anim');
    }, 100);

    const sectionDrones = document.querySelector('.drones');
    if (sectionDrones.length) {
        const sectorRotate = new Waypoint({
            element: sectionDrones,
            handler: function (direction) {
                this.element.classList.add('active_anim');
                setTimeout(function () {

                    $('.drones').addClass('anim_started');
                }, 1100);
            },
            offset: '60%'
        });
    }

    const sectionGallery = document.querySelector('.gallery');
    if (sectionGallery.length) {
        const imgGroving = new Waypoint({
            element: sectionGallery,
            handler: function (direction) {
                this.element.classList.add('anim_started');
            },
            offset: '50%'
        });
    }

    const partnersSlide = document.querySelector('.partners-slide__wrap');
    if (partnersSlide.length) {
        const slideGroving = new Waypoint({
            element: partnersSlide,
            handler: function (direction) {
                this.element.classList.add('anim_started');
            },
            offset: '50%'
        });
    }


    const majorProect = document.querySelector('.major-projects');

    if (majorProect.length) {
        const sliderGroving = new Waypoint({
            element: majorProect,
            handler: function (direction) {
                this.element.classList.add('anim_started');
            },
            offset: '50%'
        });
    }
//    LOTTIE ANIMATION
    window.addEventListener('resize', function () {
        window.lottie.resize();
    });


    //ANIMATION PRESENTATION
    function renderNeuron(container, lottieObj) {
        if (container) {
            const inViewport = elementInViewport(container, .3);

            if (inViewport) {
                lottieObj.play();
            }
        }
    }

    function elementInViewport(element, offsetTop) {
        const bounds = element.getBoundingClientRect();
        return (
            (window.innerHeight - bounds.top - bounds.height * offsetTop > 0)
        );
    }

    const neuronContainer = document.getElementById('neuronBgBlack');
    const animationBgBlack = lottie.loadAnimation({
        container: neuronContainer,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMax slice'
        },
        path: './assets/json/black_screen.json'
    });
    const neuronContainerR = document.getElementById('neuronBgBlackRight');
    const animationBgBlackR = lottie.loadAnimation({
        container: neuronContainerR,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        },
        path: './assets/json/black_screen.json'
    });

    document.addEventListener('scroll', function () {
        renderNeuron(neuronContainer, animationBgBlack);
        renderNeuron(neuronContainerR, animationBgBlackR);
    });


    const neuronContainerDron = document.getElementById('neuronDrones');
    const animationNeuronDron = lottie.loadAnimation({
        container: neuronContainerDron,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        },
        path: './assets/json/main_screen.json'
    });
    let neuronAnimBlock = new Waypoint({
        element: neuronContainerDron,
        handler: function (direction) {
            animationNeuronDron.setSpeed(1.1);
            animationNeuronDron.play();
        },
        offset: '65%'
    });

});


