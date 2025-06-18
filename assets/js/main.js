$(function () {

    RunMyScript();

    "use strict";
    $(window).on('load', function (event) {
        $('.preloader').delay(500).fadeOut(500);
    });
    $(window).on('scroll', function (event) {
        var scroll = $(window).scrollTop();
        if (scroll < 20) {
            $(".header_navbar").removeClass("sticky");
            $(".header_navbar img").attr("src", "assets/images/logo.png");
        } else {
            $(".header_navbar").addClass("sticky");
            $(".header_navbar img").attr("src", "assets/images/logo-2.png");
        }
    });
    var scrollLink = $('.page-scroll');
    $(window).scroll(function () {
        var scrollbarLocation = $(this).scrollTop();
        scrollLink.each(function () {
            var hash = $(this.hash);
            if (hash != undefined && hash.length > 0) {
                var sectionOffset = hash.offset().top - 73;
                if (sectionOffset <= scrollbarLocation) {
                    $(this).parent().addClass('active');
                    $(this).parent().siblings().removeClass('active');
                }
            }
        });
    });
    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });
    $(".navbar-toggler").on('click', function () {
        $(this).toggleClass("active");
    });
    $(".navbar-nav a").on('click', function () {
        $(".navbar-toggler").removeClass('active');
    });
    function mainSlider() {
        var BasicSlider = $('.slider-active');
        BasicSlider.on('init', function (e, slick) {
            var $firstAnimatingElements = $('.single_slider:first-child').find('[data-animation]');
            doAnimations($firstAnimatingElements);
        });
        BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
            var $animatingElements = $('.single_slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
            doAnimations($animatingElements);
        });
        BasicSlider.slick({
            autoplay: false,
            autoplaySpeed: 10000,
            dots: false,
            fade: true,
            arrows: false,
            responsive: [{
                breakpoint: 767,
                settings: {
                    arrows: false
                }
            }]
        });
        function doAnimations(elements) {
            var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            elements.each(function () {
                var $this = $(this);
                var $animationDelay = $this.data('delay');
                var $animationType = 'animated ' + $this.data('animation');
                $this.css({
                    'animation-delay': $animationDelay,
                    '-webkit-animation-delay': $animationDelay
                });
                $this.addClass($animationType).one(animationEndEvents, function () {
                    $this.removeClass($animationType);
                });
            });
        }
    }
    mainSlider();
    $('[data-countdown]').each(function () {
        var $this = $(this)
            , finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function (event) {
            $this.html(event.strftime('<div class="coming_soon_count d-flex justify-content-between pt-20"><div class="single_count d-flex align-items-center justify-content-center mt-30"><div class="count_content"><span class="count">%D</span><p class="times">Days</p></div></div><div class="single_count d-flex align-items-center justify-content-center mt-30"><div class="count_content"><span class="count">%H</span><p class="times">Hourd</p></div></div><div class="single_count d-flex align-items-center justify-content-center mt-30"><div class="count_content"><span class="count">%M</span><p class="times">Minits</p></div></div><div class="single_count d-flex align-items-center justify-content-center mt-30"><div class="count_content"><span class="count">%S</span><p class="times">Seconds</p>                            </div></div></div>'));
        });
    });
    $('.testimonial_wrapper').slick({
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        adaptiveHeight: true,
        arrows: true,
        prevArrow: '<span class="prev"><i class="lni lni-chevron-left"></i></span>',
        nextArrow: '<span class="next"><i class="lni lni-chevron-right"></i></span>',
        responsive: [{
            breakpoint: 576,
            settings: {
                arrows: false
            }
        }]
    });
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });
    $('.image-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
    });
    $(window).on('scroll', function (event) {
        if ($(this).scrollTop() > 600) {
            $('.back-to-top').fadeIn(200)
        } else {
            $('.back-to-top').fadeOut(200)
        }
    });
    $('.back-to-top').on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0,
        }, 1500);
    });
    var wow = new WOW({
        boxClass: 'wow',
    })
    wow.init();

    /*------------------------------------------
            = MASONRY GALLERY SETTING
        -------------------------------------------*/
    function masonryGridSetting() {
        if ($('.masonry-gallery').length) {
            var $grid = $('.masonry-gallery').masonry({
                itemSelector: '.grid-item',
                columnWidth: '.grid-item',
                percentPosition: true
            });

            // $grid.imagesLoaded().progress(function () {
            //     $grid.masonry('layout');
            // });
        }
    }

    masonryGridSetting();

    $(".btn-see-more-gallery").click(function (e) {
        e.preventDefault();
        let indexNumber = $(this).data('index') || 0;
        $(this).lightGallery({
            thumbnail: true,
            dynamic: true,
            dynamicEl: photoGalleries,
            download: false,
            autoplay: true,
            preload: 2,
            appendSubHtmlTo: '.lg-item',
            index: parseInt(indexNumber)
        });
    });

    /* VOLUMN PLAYER */
    $('#playerVolumeOff').click(function () {
        var audioPlayer = document.getElementById("audio-music");
        audioPlayer.play();
        $('#playerVolumeOn').show();
        $('#playerVolumeOff').hide();

    });

    $('#playerVolumeOn').click(function () {
        var audioPlayer = document.getElementById("audio-music");
        audioPlayer.pause();
        $('#playerVolumeOff').show();
        $('#playerVolumeOn').hide();
    });

    /*------------------------------------------
    = POPUP VIDEO
    -------------------------------------------*/
    if ($(".video-play-btn").length) {
        $(".video-play-btn").on("click", function(){
            $.fancybox({
                href: this.href,
                type: $(this).data("type"),
                'title'         : this.title,
                helpers     : {
                    title : { type : 'inside' },
                    media : {}
                },

                beforeShow : function(){
                    $(".fancybox-wrap").addClass("gallery-fancybox");
                }
            });
            return false
        });
    }

    /* Heart Fall */
    document.body.className  = "darkBg";
    $(document).snowfall(
        {image :"assets/images/heart.png", minSize: 10, maxSize:32}
    );
});


function RunMyScript(){
    CheckChooseLanguage();

    // Create Event
    $('#btnLanguage').click(function(){
        var selectedLanguageId = $(this).data('languageid');
        localStorage.setItem('languageId', selectedLanguageId);
        // Chuyển hướng tới trang ngôn ngữ tương ứng
        if (selectedLanguageId == 1033) {
            window.location.href = 'index.html' // Thay đổi đường dẫn tới trang ngôn ngữ tương ứng ở đây
        }
        else if (selectedLanguageId == 2052) {
            window.location.href = 'index_china.html'; // Thay đổi đường dẫn tới trang ngôn ngữ tương ứng ở đây
        }
    });
}

function CheckChooseLanguage(){
    var defaultLanguageId = localStorage.getItem('languageId');
    if(defaultLanguageId == null || defaultLanguageId == ''){
        var selectedLanguageId = $(this).data('languageid');
        localStorage.setItem('languageId', 1033);
        window.location.href = 'index.html';
    }
}
