$(function () {
    "use strict";

    RunMyScript();

    // Preloader
    $(window).on('load', () => {
        $('.preloader').delay(500).fadeOut(500);
    });

    const $window = $(window);
    const $document = $(document);
    const $pageScroll = $('.page-scroll');
    const $headerNavbar = $(".header_navbar");
    const $backToTop = $('.back-to-top');

    // Scroll behavior (sticky header, scrollspy, back-to-top toggle)
    $window.on('scroll', () => {
        const scrollTop = $window.scrollTop();

        // Sticky header
        if (scrollTop < 20) {
            $headerNavbar.removeClass("sticky");
            if($headerNavbar.hasClass('header_navbar_gallery'))
                $headerNavbar.find("img").attr("src", "assets/images/logo-2.png");
            else
                $headerNavbar.find("img").attr("src", "assets/images/logo.png");
        } else {
            $headerNavbar.addClass("sticky");
            $headerNavbar.find("img").attr("src", "assets/images/logo-2.png");
        }

        // Scrollspy active update
        const scrollPos = $document.scrollTop();
        $pageScroll.each(function () {
            const $this = $(this);
            const target = $('#' + $this.data('id'));
            if (target.length) {
                const offsetTop = target.offset().top - 100;
                const offsetBottom = offsetTop + target.outerHeight();
                if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
                    $pageScroll.parent().removeClass('active');
                    $this.parent().addClass('active');
                }
            }
        });

        // Back-to-top button toggle
        if (scrollTop > 600) {
            $backToTop.fadeIn(200);
        } else {
            $backToTop.fadeOut(200);
        }
    });

    // Page scroll smooth
    $pageScroll.on('click', function (e) {
        e.preventDefault();
        const target = $('#' + $(this).data('id'));
        if (target.length) {
            $('html, body').animate({ scrollTop: target.offset().top }, 0);
            $pageScroll.parent().removeClass('active');
            $(this).parent().addClass('active');
        }
    });

    // Scroll to top
    $('#TopPage').click(function (e) {
        e.preventDefault();
        $('.navbar-collapse').collapse('hide');
        setTimeout(() => {
            $('html, body').animate({ scrollTop: 0 }, 600);
        }, 300);
    });

    // Back to top
    $backToTop.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 1500);
    });

    // Main Slider
    function mainSlider() {
        const $slider = $('.slider-active');

        $slider.on('init', function () {
            doAnimations($('.single_slider:first-child').find('[data-animation]'));
        });

        $slider.on('beforeChange', function (e, slick, current, next) {
            doAnimations($('.single_slider[data-slick-index="' + next + '"]').find('[data-animation]'));
        });

        $slider.slick({
            autoplay: false,
            autoplaySpeed: 10000,
            dots: false,
            fade: true,
            arrows: false,
            responsive: [{
                breakpoint: 767,
                settings: { arrows: false }
            }]
        });
    }

    function doAnimations(elements) {
        const animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function () {
            const $el = $(this);
            const delay = $el.data('delay');
            const animationType = 'animated ' + $el.data('animation');
            $el.css({ 'animation-delay': delay, '-webkit-animation-delay': delay })
                .addClass(animationType)
                .one(animationEndEvents, () => {
                    $el.removeClass(animationType);
                });
        });
    }

    mainSlider();

    // Countdown
    $('[data-countdown]').each(function () {
        const $this = $(this);
        const finalDate = $this.data('countdown');
        $this.countdown(finalDate, function (event) {
            $this.html(event.strftime(`
                <div class="coming_soon_count d-flex justify-content-between pt-20">
                    <div class="single_count d-flex align-items-center justify-content-center mt-30">
                        <div class="count_content"><span class="count">%D</span><p class="times">Days</p></div>
                    </div>
                    <div class="single_count d-flex align-items-center justify-content-center mt-30">
                        <div class="count_content"><span class="count">%H</span><p class="times">Hours</p></div>
                    </div>
                    <div class="single_count d-flex align-items-center justify-content-center mt-30">
                        <div class="count_content"><span class="count">%M</span><p class="times">Minutes</p></div>
                    </div>
                    <div class="single_count d-flex align-items-center justify-content-center mt-30">
                        <div class="count_content"><span class="count">%S</span><p class="times">Seconds</p></div>
                    </div>
                </div>`));
        });
    });

    // Testimonial
    $('.testimonial_wrapper').slick({
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        adaptiveHeight: true,
        arrows: true,
        prevArrow: '<span class="prev"><i class="lni lni-chevron-left"></i></span>',
        nextArrow: '<span class="next"><i class="lni lni-chevron-right"></i></span>',
        responsive: [{ breakpoint: 576, settings: { arrows: false } }]
    });

    // Video & image popups
    $('.video-popup').magnificPopup({ type: 'iframe' });

    $('.image-popup').magnificPopup({
        type: 'image',
        gallery: { enabled: true },
        callbacks: {
            open: initPanzoom,
            change: initPanzoom
        }
    });

    // WOW animation
    new WOW({ boxClass: 'wow' }).init();

    // Audio toggle
    $('#playerVolumeOff').click(() => {
        document.getElementById("audio-music").play();
        $('#playerVolumeOn').show();
        $('#playerVolumeOff').hide();
    });

    $('#playerVolumeOn').click(() => {
        document.getElementById("audio-music").pause();
        $('#playerVolumeOff').show();
        $('#playerVolumeOn').hide();
    });

    // Fancybox video
    $(".video-play-btn").on("click", function () {
        $.fancybox({
            href: this.href,
            type: $(this).data("type"),
            width: '100%',
            height: '100%',
            autoSize: false,
            title: this.title,
            helpers: { title: { type: 'inside' }, media: {} },
            beforeShow: function () {
                $(".fancybox-wrap").addClass("gallery-fancybox");
            }
        });
        return false;
    });

    // Heart snow fall
    document.body.className = "darkBg";
    $(document).snowfall({
        image: "assets/images/heart.png",
        minSize: 10,
        maxSize: 32
    });
});

// Init language check and button event
function RunMyScript() {
    CheckChooseLanguage();
    $('#btnLanguage').click(function () {
        const languageId = $(this).data('languageid');
        localStorage.setItem('languageId', languageId);
        if (languageId == 2051) {
            window.location.href = 'index_vi.html';
        } else if (languageId == 2052) {
            window.location.href = 'index_china.html';
        }
    });
}

function CheckChooseLanguage() {
    const languageId = localStorage.getItem('languageId');
    if (!languageId) {
        localStorage.setItem('languageId', 2051);
        window.location.href = 'index.html';
    }
}

// Init panzoom on image in popup
function initPanzoom() {
    setTimeout(() => {
        const img = document.querySelector('.mfp-img');
        if (img) {
            const panzoom = Panzoom(img, {
                contain: 'outside',
                maxScale: 5
            });
            img.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);
            img.addEventListener('mousedown', e => e.stopPropagation());
            img.addEventListener('click', e => e.stopPropagation());
        }
    }, 100);
}
