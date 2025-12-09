import { getShortcuts } from "../lib/data";

export class Shortcuts {
  /**
   * @param {HTMLDivElement} $el
   */
  constructor($el) {
    this.$el = $el;
    this.render();
    this.setup();
  }

  render() {
    const shortcuts = getShortcuts();
    this.$el.insertAdjacentHTML(
      "afterbegin",
      shortcuts.map(this.renderShortcutItem).join("")
    );
  }

  renderShortcutItem(shortcut) {
    return /*html*/ `
      <a
        class="shortcut"
        href="${shortcut.url}" 
        data-id="${shortcut.id}"
        >
        <div class="tile">
          <div class="shortcut__cover-wrapper">
            <img
              class="shortcut__cover"
              src="https://favicon.im/${new URL(shortcut.url).hostname}"
              alt="Favicon for ${shortcut.title}"
              data-cover
              data-fallback="${new URL(shortcut.url).hostname.charAt(0)}"
            />
          </div>
        </div>
        <p class="shortcut__title truncate" data-title>
          ${shortcut.title}
        </p>
      </a>
    `;
  }

  setup() {
    this.setupShortcutCover();
  }

  setupShortcutCover() {
    document.querySelectorAll("img[data-cover]").forEach((img) => {
      img.addEventListener("error", () => {
        img.parentElement.dataset.fallback = img.dataset.fallback;
      });
    });
  }
}
