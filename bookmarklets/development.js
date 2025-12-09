javascript: (() => {
  const url = location.href;
  const title = document.title || url;

  const windowHeight = 720;
  const windowWidth = 526;

  window.open(
    `http://localhost:5173/bookmarklet.html?url=${encodeURIComponent(
      url
    )}&title=${encodeURIComponent(title)}`,
    "_blank",
    `height=${windowHeight},width=${windowWidth},menubar=no,toolbar=no,scrollbars=yes,status=no,dialog=1,right=0`
  );
})();
