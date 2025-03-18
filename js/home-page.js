$(document).ready(function () {
  fetchHomeInfo()
    .then((data) => {
      $("#total_tours").text(`Explore all tours (${data.total_tours})`);
      renderTours(data.tours, "#tours_list");
      renderNewTours(data.new_tours, "#new_tours_list");
      renderSpecialTours(data.special_tours, "#special_tours_list");
      renderReviews(data.reviews, "#reviews_list");
    })
    .catch(() => {
      alert("Ошибка загрузки данных с сервера.");
    });

  function renderTours(tours, container) {
    $(container).empty();

    tours.forEach((tour) => {
      const imgSrc = CLOUD_URL + tour.header_image;

      const tourCard = `
        <div class="col-md-4 col-sm-6 wow fadeIn animated" data-wow-delay="0.2s">
            <div class="img_wrapper">
                <div class="ribbon"><span>Popular</span></div>
                <div class="price_grid"><sup>€</sup>${tour.price}</div>
                <div class="img_container">
                    <a href="detail-page.html?slug=${tour.slug}">
                        <img
                        src="${imgSrc}"
                        width="800"
                        height="533"
                        class="img-responsive"
                        alt="${tour.title}"
                        />
                        <div class="short_info">
                            <h3>${tour.title}</h3>
                            <em>${tour.duration}</em>
                            <p>${tour.title_description}</p>
                            <div class="score_wp">Superb
                                <div class="score">${tour.rating}</div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        `;
      $(container).append(tourCard);
    });
  }

  function renderNewTours(tours, container) {
    $(container).empty();

    tours.forEach((tour) => {
      const imgSrc = CLOUD_URL + tour.header_image;

      const tourCard = `
        <li>
            <div>
              <a href="detail-page.html?slug=${tour.slug}">
                <figure>
                    <img
                    src="${imgSrc}"
                    alt="${tour.title}"
                    class="img-rounded"
                    width="60"
                    height="60"
                    />
                </figure>
                <h4>${tour.title}</h4>
                <small>Duration ${tour.duration}</small>
                <span class="price_list">€${tour.price}</span>
              </a>
            </div>
        </li>
        `;
      $(container).append(tourCard);
    });
  }

  function renderSpecialTours(tours, container) {
    $(container).empty();

    tours.forEach((tour) => {
      const imgSrc = CLOUD_URL + tour.header_image;

      const tourCard = `
        <li>
            <div>
                <a href="detail-page.html?slug=${tour.slug}">
                  <figure>
                      <img
                      src="${imgSrc}"
                      alt="${tour.title}"
                      class="img-rounded"
                      width="60"
                      height="60"
                      />
                  </figure>
                  <h4>${tour.title}</h4>
                  <small>Duration ${tour.duration}</small>
                  <span class="price_list"><em>€${tour.price}</em>€${tour.price_with_discount}</span>
                </a>
            </div>
        </li>
        `;
      $(container).append(tourCard);
    });
  }

  function renderReviews(reviews, container) {
    $(container).empty();

    reviews.forEach((review) => {
      const reviewCard = `
        <div>
          <div class="box_overlay">
            <div class="pic">
              <figure>
                <img
                  src="${review.image}"
                  alt="review user"
                  class="img-circle"
                />
              </figure>
              <h4>${review.name}<small>${
        review.created_at || review.updated_at
      }</small></h4>
            </div>
            <div class="comment">
              "${review.review}"
            </div>
          </div>
        </div>
        `;
      $(container).append(reviewCard);
    });

    /* Carousel*/
    $(".carousel_testimonials").owlCarousel({
      items: 1,
      loop: false,
      autoplay: false,
      animateIn: "flipInX",
      margin: 30,
      stagePadding: 30,
      smartSpeed: 450,
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
});
