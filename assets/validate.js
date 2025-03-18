/* <![CDATA[ */

// Jquery validate form booking form inner page
jQuery(document).ready(function () {
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  $("#submit-booking").on("click", function (event) {
    event.preventDefault();
    $("#check_avail").submit();
  });

  $("#check_avail").validate({
    rules: {
      name_lastname_booking: {
        required: true,
        minlength: 3,
      },
      telephone_booking: {
        required: true,
      },
      people_count_booking: {
        required: true,
        number: true,
        min: 1,
        max: 8,
      },
    },
    messages: {
      name_lastname_booking: {
        required: "Enter your Name and Last name.",
        minlength: "Name must be at least 3 characters long.",
      },
      telephone_booking: {
        required: "Please enter a valid phone number.",
      },
      people_count_booking: {
        required: "Please enter the number of people.",
        number: "People count must be a number.",
        min: "At least 1 person is required.",
        max: "No more than 8 people allowed.",
      },
    },
    submitHandler: async function (form, event) {
      event.preventDefault();

      $("#message-booking").slideUp(750, function () {
        $("#message-booking").hide();
      });

      $("#submit-booking")
        .after('<i class="icon-spin4 animate-spin loader"></i>')
        .attr("disabled", "disabled");

      const name = $("#name_lastname_booking").val().trim();
      const phone = $("#telephone_booking").val().trim();
      const peopleCount = $("#people_count_booking").val().trim();
      const tour_slug = getQueryParam("slug");

      $.ajax({
        url: "https://api.viptourportugal.com/contact",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          name,
          phone,
          tour_slug,
          peopleCount,
        }),
        success: function () {
          $("#message-booking")
            .html(
              `
                  <div style="padding:10px 20px 30px 20px; text-align:center; font-size:14px;">
                    <div style="font-size:60px; font-weight:normal;color:#acd373;">
                      <i class="icon_set_1_icon-76"></i>
                    </div>
                    <strong>Application sent!</strong><br>
                    Thank you, <strong>${name}</strong>! We will contact you shortly.
                  </div>
                `
            )
            .slideDown("slow");

          $("#check_avail").trigger("reset");
          $("#check_avail .loader").fadeOut("slow", function () {
            $(this).remove();
          });
          $("#submit-booking").removeAttr("disabled");
        },
        error: function (xhr, status, error) {
          $("#message-booking")
            .html(
              `<div class="error_message">Ошибка при отправке: ${
                xhr.responseText || error
              }</div>`
            )
            .slideDown("slow");
          $("#submit-booking").removeAttr("disabled");
          $(".loader").remove();
        },
      });
    },
  });
});

/// Jquery validate newsletter
jQuery(document).ready(function () {
  $("#newsletter_2").submit(function () {
    var action = $(this).attr("action");

    $("#message-newsletter_2").slideUp(750, function () {
      $("#message-newsletter_2").hide();

      $("#submit-newsletter_2")
        .after('<i class="icon-spin4 animate-spin loader"></i>')
        .attr("disabled", "disabled");

      $.post(
        action,
        {
          email_newsletter_2: $("#email_newsletter_2").val(),
        },
        function (data) {
          document.getElementById("message-newsletter_2").innerHTML = data;
          $("#message-newsletter_2").slideDown("slow");
          $("#newsletter_2 .loader").fadeOut("slow", function () {
            $(this).remove();
          });
          $("#submit-newsletter_2").removeAttr("disabled");
          if (data.match("success") != null) $("#newsletter_2").slideUp("slow");
        }
      );
    });

    return false;
  });
});
// Jquery validate form contact
jQuery(document).ready(function () {
  $("#contactform").submit(function () {
    var action = $(this).attr("action");

    $("#message-contact").slideUp(750, function () {
      $("#message-contact").hide();

      $("#submit-contact")
        .after('<i class="icon-spin4 animate-spin loader"></i>')
        .attr("disabled", "disabled");

      $.post(
        action,
        {
          name_contact: $("#name_contact").val(),
          lastname_contact: $("#lastname_contact").val(),
          email_contact: $("#email_contact").val(),
          phone_contact: $("#phone_contact").val(),
          message_contact: $("#message_contact").val(),
          verify_contact: $("#verify_contact").val(),
        },
        function (data) {
          document.getElementById("message-contact").innerHTML = data;
          $("#message-contact").slideDown("slow");
          $("#contactform .loader").fadeOut("slow", function () {
            $(this).remove();
          });
          $("#submit-contact").removeAttr("disabled");
          if (data.match("success") != null) $("#contactform").slideUp("slow");
        }
      );
    });
    return false;
  });
});

/// Jquery validate review
jQuery(document).ready(function () {
  $("#review").submit(function () {
    var action = $(this).attr("action");

    $("#message-review").slideUp(750, function () {
      $("#message-review").hide();

      $("#submit-review")
        .after('<i class="icon-spin4 animate-spin loader"></i>')
        .attr("disabled", "disabled");

      $.post(
        action,
        {
          tour_name_review: $("#tour_name_review").val(),
          name_review: $("#name_review").val(),
          lastname_review: $("#lastname_review").val(),
          email_review: $("#email_review").val(),
          rating_review: $("#rating_review").val(),
          review_text: $("#review_text").val(),
          verify_review: $("#verify_review").val(),
        },

        function (data) {
          document.getElementById("message-review").innerHTML = data;
          $("#message-review").slideDown("slow");
          $("#review .loader").fadeOut("slow", function () {
            $(this).remove();
          });
          $("#submit-review").removeAttr("disabled");
          if (data.match("success") != null) $("#review").slideUp("slow");
        }
      );
    });

    return false;
  });
});
/* ]]> */
