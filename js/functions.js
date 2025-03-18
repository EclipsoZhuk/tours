(function ($) {
  "use strict";

  /* ==============================================
	Preload
	=============================================== */
  $(window).on("load", function () {
    $('[data-loader="circle-side"]').fadeOut();
    $("#preloader").delay(500).fadeOut("slow");
    $("body").delay(500).css({ overflow: "visible" });
    $("#animate_intro").addClass("animated fadeInUp");
  });

  /* ==============================================
	Sticky nav +  Scroll to top
	=============================================== */
  var $headerStick = $("header");
  var $toTop = $("#toTop");

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 1) {
      $headerStick.addClass("sticky");
    } else {
      $headerStick.removeClass("sticky");
    }
    if ($(this).scrollTop() != 0) {
      $toTop.fadeIn();
    } else {
      $toTop.fadeOut();
    }
  });
  $toTop.on("click", function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      500
    );
  });

  /* ==============================================
	COMMON
	=============================================== */
  /* Animation on scroll */
  new WOW().init();

  /* Booking form calculate */
  update_amounts();
  $("select").change(update_amounts);

  function update_amounts() {
    var sum = 0.0;
    $("#tickets > tbody  > tr").each(function () {
      var qty = $(this).find("option:selected").val();
      var price = $(this)
        .find(".price")
        .text()
        .replace(/[^\d.]/, "");
      var amount = qty * price;
      sum += amount;
      $(this)
        .find(".subtotal")
        .text("$" + amount);
    });
    $("#total").val("$" + sum);
  }

  /* Tooltip*/
  $(".tooltip-1").tooltip({ html: true });

  /* Accordion*/
  function toggleChevron(e) {
    $(e.target)
      .prev(".panel-heading")
      .find("i.indicator")
      .toggleClass("icon_plus_alt2 icon_minus_alt2");
  }
  $(".panel-group").on("hidden.bs.collapse shown.bs.collapse", toggleChevron);

  /* Video modal*/
  $(".video").magnificPopup({
    type: "iframe",
  });

  /* Parallax modal*/
  $(".parallax_window_in").parallax({});

  /*  Image popups */
  $(".magnific-gallery").each(function () {
    $(this).magnificPopup({
      delegate: "a",
      type: "image",
      gallery: {
        enabled: true,
      },
    });
  });

  /* Hamburger icon*/
  var toggles = document.querySelectorAll(".cmn-toggle-switch");
  for (var i = toggles.length - 1; i >= 0; i--) {
    var toggle = toggles[i];
    toggleHandler(toggle);
  }

  function toggleHandler(toggle) {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      this.classList.contains("active") === true
        ? this.classList.remove("active")
        : this.classList.add("active");
    });
  }
})(window.jQuery); // JavaScript Document
