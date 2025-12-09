import "../css/reset.css";
import { createShortcut } from "./lib/data";

// 解析 URL 参数
function getUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    url: urlParams.get("url") || "",
    title: urlParams.get("title") || "",
  };
}

// 初始化应用
document.addEventListener("DOMContentLoaded", function () {
  const params = getUrlParams();

  const form = document.getElementById("bookmarklet__form");
  const urlInput = document.getElementById("url");
  const titleInput = document.getElementById("title");

  urlInput.value = params.url;
  titleInput.value = params.title;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const url = urlInput.value.trim();
    const title = titleInput.value.trim();

    if (!url || !title) {
      alert("请填写完整的网址和标题");
      return;
    }

    createShortcut({ url, title });

    window.close();
  });
});
