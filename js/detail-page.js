$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get("slug");

  if (!slug) {
    alert("Ошибка: Не указан slug в URL");
    return;
  }

  fetchDetailInfo(slug)
    .then((data) => {
      renderDetailPage(data);
    })
    .catch(() => {
      alert("Ошибка загрузки данных с сервера.");
    });

  function renderDetailPage(data) {
    $("#animate_intro h1").text(data.title);
    $("#animate_intro p").text(data.title_description);
    $("#tab_1 .tour-description").text(data.description.content);
    $("#tab_1 .program-description").text(data.program.content);
    $("#tab_1 h3 span").text(`(${data.duration})`);
    $("#tab_2 .review_score span").text(data.rating);

    renderImagesTour(data.images, "#tour_images");
    renderDescriptionList(data.description.list, "#overview_tab_list");
    renderProgram(data.program.list, ".cbp_tmtimeline");
    renderPriceBox(data, "#box_price");

    $(".parallax_window_in").remove();
    const newParallaxSection = $(`
    <section class="parallax_window_in" 
             data-parallax="scroll"
             data-image-src="${CLOUD_URL + data.header_image}"
             data-natural-width="1400"
             data-natural-height="470">
      <div id="sub_content_in">
        <div id="animate_intro">
          <h1>${data.title}</h1>
          <p>${data.title_description}</p>
        </div>
      </div>
    </section>
  `);

    // Вставляем новый элемент в DOM
    $("body").prepend(newParallaxSection);

    // Переинициализируем плагин
    setTimeout(() => {
      $(".parallax_window_in").parallax({});
    }, 100);
  }

  function renderImagesTour(images, container) {
    $(container).empty();

    images.forEach((image) => {
      const imgSrc = CLOUD_URL + image;

      const imageCard = `
        <div class="item">
          <img src="${imgSrc}" alt="" />
        </div>
        `;
      $(container).append(imageCard);
    });

    $(".carousel_detail").owlCarousel({
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      responsiveClass: true,
      margin: 0,
      items: 1,
      responsiveClass: true,
      responsive: {
        600: {
          items: 1,
        },
        1000: {
          items: 1,
          nav: false,
        },
      },
    });
  }

  function renderDescriptionList(list, container) {
    $(container).empty();

    const leftColumn = $("<div>").addClass("col-md-6");
    const rightColumn = $("<div>").addClass("col-md-6");

    list.forEach((item, index) => {
      const featureBox = `
      <div class="feature-box">
        <div class="feature-box-icon">
          <i class="icon-ok-4"></i>
        </div>
        <div class="feature-box-info">
          <h4>${item.key}</h4>
          <p>${item.value}</p>
        </div>
      </div>
    `;

      if (index % 2 === 0) {
        leftColumn.append(featureBox);
      } else {
        rightColumn.append(featureBox);
      }
    });

    const row = $("<div>").addClass("row").append(leftColumn, rightColumn);
    $(container).append(row);
  }

  function renderProgram(list, container) {
    $(container).empty();

    list.forEach((step) => {
      const imgSrc = CLOUD_URL + step.image;

      const programItem = `
        <li>
            <time class="cbp_tmtime" datetime="${step.time}"
                ><span>${step.duration}</span><span>${step.time}</span>
            </time>
            <div class="cbp_tmicon">${step.step}</div>
            <div class="cbp_tmlabel">
                <div class="hidden-xs">
                    <img
                        src="${imgSrc}"
                        alt="${step.title}"
                        class="img-circle thumb_visit"
                    />
                </div>
                <h4>${step.title}</h4>
                <p>${step.description}</p>
            </div>
        </li>
      `;

      $(container).append(programItem);
    });
  }

  function renderPriceBox(data, container) {
    $(container).empty();

    const priceBox = `
        <div class="price">
            <strong>€${data.price}</strong>
            <small>all persons</small>
        </div>
        <ul class="list_ok">
            ${data.tags.map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <small>*Free for children under 8 years old</small>
    `;

    $(container).append(priceBox);
  }
});
