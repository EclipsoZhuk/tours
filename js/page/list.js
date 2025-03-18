$(document).ready(function () {
  const startPage = getPageFromURL();

  fetchAllTours(startPage).then((data) => {
    renderTours(data.data);
    renderPagination(data.current_page, data.last_page);
  });

  function getPageFromURL() {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get("page"));
    return isNaN(page) ? 1 : page;
  }

  // Функция отрисовки «полос» (strip_list)
  function renderTours(tours) {
    const container = document.getElementById("tours-container");
    container.innerHTML = ""; // Очищаем содержимое

    tours.forEach((tour) => {
      const imgSrc = CLOUD_URL + tour.header_image;

      const row = document.createElement("div");
      row.classList.add("row", "strip_list", "wow", "fadeIn", "animated");
      row.setAttribute("data-wow-delay", "0.2s");

      row.innerHTML = `
        <div class="col-md-5">
          <div class="img_wrapper">
            <div class="ribbon">
              <span>Popular</span>
            </div>
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
                  <em>Duration ${tour.duration ?? ""}</em>
                  <div class="score_wp">
                      Superb
                      <div class="score">${tour.rating}</div>
                    </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div class="col-md-7">
            <h3>${tour.title}</h3>
            <p>${tour.title_description}</p>
            <p>
                <a href="detail-page.html?slug=${
                  tour.slug
                }" class="btn_1">Read more</a>
            </p>
        </div>
      `;

      container.appendChild(row);
    });
  }

  function renderPagination(currentPage, lastPage) {
    const paginationContainer = document.getElementById("pagination-container");
    paginationContainer.innerHTML = "";
    if (lastPage <= 1) return;

    const ul = document.createElement("ul");
    ul.classList.add("pagination");

    for (let page = 1; page <= lastPage; page++) {
      const li = document.createElement("li");
      li.classList.add("page-item");
      if (page === currentPage) {
        li.classList.add("active");
      }

      const a = document.createElement("a");
      a.classList.add("page-link");
      a.textContent = page;
      a.href = "";

      a.addEventListener("click", (e) => {
        e.preventDefault();
        const newUrl = new URL(window.location);
        newUrl.searchParams.set("page", page);
        window.history.pushState({}, "", newUrl);

        fetchAllTours(page).then((data) => {
          renderTours(data.data);
          renderPagination(data.current_page, data.last_page);
        });
      });

      li.appendChild(a);
      ul.appendChild(li);
    }

    if (currentPage < lastPage) {
      const liNext = document.createElement("li");
      liNext.classList.add("page-item");
      const aNext = document.createElement("a");
      aNext.classList.add("page-link");
      aNext.innerHTML = "&raquo;";
      aNext.href = "";

      aNext.addEventListener("click", (e) => {
        e.preventDefault();
        const newPage = currentPage + 1;
        const newUrl = new URL(window.location);
        newUrl.searchParams.set("page", newPage);
        window.history.pushState({}, "", newUrl);

        fetchAllTours(newPage).then((data) => {
          renderTours(data.data);
          renderPagination(data.current_page, data.last_page);
        });
      });

      liNext.appendChild(aNext);
      ul.appendChild(liNext);
    }

    paginationContainer.appendChild(ul);
  }
});
