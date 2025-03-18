/* ==============================================
First carousel + Second carousel
=============================================== */
(function ($) {
  "use strict";
  $(".carousel").owlCarousel({
    loop: false,
    autoplay: false,
    smartSpeed: 300,
    nav: false,
    margin: 0,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1200: {
        items: 4,
        dots: false,
      },
    },
  });
})(window.jQuery);
