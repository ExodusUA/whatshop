;(function($){
    "use strict";

    /* ==========================================================================
       Preloader
    ========================================================================== */
    $(window).on('load', function() {
         $('#status').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({'overflow':'visible'});
    })

     /* ==========================================================================
        Magnfic Video
    ========================================================================== */

    var $vdoPop = $('.video');
    if($vdoPop.length > 0){
       $vdoPop.magnificPopup({
          type: 'iframe',
              iframe: {
                  markup: '<style>.mfp-iframe-holder .mfp-content {max-width: 900px;height:500px}</style>' +
                      '<div class="mfp-iframe-scaler" >' +
                      '<div class="mfp-close"></div>' +
                      '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                      '</div></div>'
              }
          });
    }
     /* ==========================================================================
       Counter Up
    ========================================================================== */
    var $counter = $('.counter');
    if($counter.length > 0){
        $counter.counterUp({
            delay: 20,
            time: 3000
        });
    }

    /* ==========================================================================
        Parallax
    ========================================================================== */
    var $parallax = $('.parallaxie');
    if($parallax.length > 0){
        $parallax.parallaxie({
            speed: .975
        });
    }

    /* ==========================================================================
    Screenshot carousel
    ========================================================================== */
    var $loop = $('.screen')
    if($loop.length > 0){
        $loop.owlCarousel({
        loop:true,
        nav: false,
        center:true,
        autoplay:true,
        autoplayTimeout:2000,
        margin:50,
        responsive:{
            320:{
                items:2,
                margin:10
            },
            481:{
                items:3,
                margin:60
            },
            991:{
                items:4
            }
        }
    });
    }

    /* ==========================================================================
    Screen carousel
    ========================================================================== */
    var $appSlide = $('.app-slide-auto')
    if($appSlide.length > 0){
         $appSlide.owlCarousel({
            dots: false,
            loop: true,
            animateOut: 'fadeOut',
            center: true,
            margin: 0,
            autoplay: true,
            autoplayTimeout: 2500,
            autoWidth: true,
            touchDrag: false,
            items:3,
            mouseDrag: false
        })
    }

    /* ==========================================================================
    Testimonial Carousel
    ========================================================================== */
    var quoteCarousel = $('.quote')
    if(quoteCarousel.length > 0){
        quoteCarousel.owlCarousel({
            loop:true,
            autoplayTimeout:3500,
            items:1,
            nav: false,
            margin:20,
            items:1
        })
    }

     /* ==========================================================================
        Wow
    ========================================================================== */
    new WOW().init();


    /* ==========================================================================
      Mailchimp ajax
    ========================================================================== */
    if($('.mailchimp').length > 0) {
        /*  MAILCHIMP  */
        $('.mailchimp').ajaxChimp({
            language: 'es',
            callback: mailchimpCallback,
            url: "https://gmail.us8.list-manage.com/subscribe/post?u=dd00a6e222a827748e67dd5d6&amp;id=5f045a38b3" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".
        });
    }

    function mailchimpCallback(resp) {
        if (resp.result === 'success') {
            $('.subscription-success').html(resp.msg).fadeIn(1000);
            $('.subscription-error').fadeOut(500);

        } else if (resp.result === 'error') {
            $('.subscription-error').html(resp.msg).fadeIn(1000);
        }
    }
    $.ajaxChimp.translations.es = {
        'submit': 'Submitting...',
        0: 'We have sent you a confirmation email',
        1: 'Please enter a value',
        2: 'An email address must contain a single @',
        3: 'The domain portion of the email address is invalid (the portion after the @: )',
        4: 'The username portion of the email address is invalid (the portion before the @: )',
        5: 'This email address looks fake or invalid. Please enter a real email address'
    };

    /* ==========================================================================
      Contact form ajax
    ========================================================================== */
    var $contactForm = $('#contact-form');
    $contactForm.validator();


    // when the form is submitted
    $contactForm.on('submit', function (e) {

        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {
            var url = "/contact_form";

            // POST values in the background the the script URL
            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {
                    console
                    // data = JSON object that contact.php returns

                    // we recieve the type of the message: success x danger and apply it to the
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    // let's compose Bootstrap alert box HTML
                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';

                    // If we have messageAlert and messageText
                    if (messageAlert && messageText) {
                        // inject the alert to .messages div in our form
                        $contactForm.find('.messages').html(alertBox);
                        // empty the form
                        $contactForm[0].reset();
                    }
                }
            });
            return false;
        }
    })





    /* ==========================================================================
        Menu click scroll
    ========================================================================== */

    var $navItem = $('.right-nav a, .demo a, .footer-link a');
    if($navItem.length > 0 ){
        $navItem.on('click', function (e) {
            $(document).off("scroll");
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
                || location.hostname == this.hostname) {

                var target = $(this.hash),
                headerHeight = $(".navbar").height()-2; // Get fixed header height

                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

                if (target.length) {
                    $('html,body').animate({
                      scrollTop: target.offset().top - headerHeight
                    }, 1000);
                    return false;
                }
            }
        });
    }
     /* ==========================================================================
        Accordion
    ========================================================================== */

    function toggleIcon(e) {
    $(e.target)
        .prev('.panel-heading')
        .find(".more-less")
        .toggleClass('glyphicon-plus glyphicon-minus');
    }
    $('.panel-group').on('hidden.bs.collapse', toggleIcon);
    $('.panel-group').on('shown.bs.collapse', toggleIcon);


    /* ==========================================================================
        pricing
    ========================================================================== */
        var e = document.getElementById("filt-monthly"),
        d = document.getElementById("filt-hourly"),
        t = document.getElementById("switcher"),
        m = document.getElementById("monthly"),
        y = document.getElementById("hourly");
        e.addEventListener("click", function(){
          t.checked = false;
          e.classList.add("toggler--is-active");
          d.classList.remove("toggler--is-active");
          m.classList.remove("none");
          y.classList.add("none");
        });

        d.addEventListener("click", function(){
          t.checked = true;
          d.classList.add("toggler--is-active");
          e.classList.remove("toggler--is-active");
          m.classList.add("none");
          y.classList.remove("none");
        });

        t.addEventListener("click", function(){
          d.classList.toggle("toggler--is-active");
          e.classList.toggle("toggler--is-active");
          m.classList.toggle("none");
          y.classList.toggle("none");
        })

})(jQuery);


