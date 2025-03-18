const CLOUD_URL = "https://cloud.viptourportugal.com/";
const API_URL = "https://api.viptourportugal.com";

function fetchHomeInfo() {
  return $.ajax({
    url: `${API_URL}`,
    method: "GET",
    dataType: "json",
  });
}

function fetchAllTours(page) {
  return $.ajax({
    url: `${API_URL}/tours?page=${page}`,
    method: "GET",
    dataType: "json",
  });
}

function fetchDetailInfo(slug) {
  return $.ajax({
    url: `${API_URL}/tours/${slug}`,
    method: "GET",
    dataType: "json",
  });
}
