javascript: (() => {
  const url = location.href;
  const title = document.title || url;

  const windowHeight = 720;
  const windowWidth = 526;

  const screenWidth = window.screen.availWidth;
  const left = screenWidth - windowWidth;

  window.open(
    `https://newtab.ilnce.com/bookmarklet.html?url=${encodeURIComponent(
      url
    )}&title=${encodeURIComponent(title)}`,
    "_blank",
    `height=${windowHeight},width=${windowWidth},left=${left},menubar=no,toolbar=no,scrollbars=yes,status=no,dialog=1,right=0`
  );
})();
