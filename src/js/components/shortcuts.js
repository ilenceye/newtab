import { deleteBookmark, getBookmarksFromFolder } from "../lib/chrome";
import { getSelectedFolderId } from "../lib/data";

export class Shortcuts {
  constructor() {
    /** @type {HTMLDivElement} */
    this.$el = document.getElementById("shortcuts");
    this.render();
  }

  renderShortcutDropdown() {
    return /*html*/ `
      <wc-menu-wrapper class="shortcut-dropdown" heading="shortcut-dropdown__heading" item="shortcut-dropdown__item" heading-class="open">
        <div class="shortcut-dropdown__heading">···</div>
        <button class="shortcut-dropdown__item" data-action="delete">Delete</button>
      </wc-menu-wrapper>
    `;
  }

  /** @param {import('../lib/data').Shortcut} shortcut */
  renderShortcutItem(shortcut) {
    return /*html*/ `
      <div class="shortcut" data-id="${shortcut.id}">
        ${this.renderShortcutDropdown()}
        <a href="${shortcut.url}">
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
      </div>
    `;
  }

  async render() {
    const selectedFolderId = getSelectedFolderId();

    if (!selectedFolderId) return;

    const bookmarks = await getBookmarksFromFolder(selectedFolderId);
    const shortcuts = bookmarks.map(({ id, title, url }) => ({
      id,
      title,
      url,
    }));

    if (shortcuts.length > 0) {
      this.$el.innerHTML = shortcuts
        .map(this.renderShortcutItem.bind(this))
        .join("");
      this.setup();
    }
  }

  async handleShortchutDropdownItemClick(event) {
    if (!event.target.classList.contains("shortcut-dropdown__item")) return;

    const action = event.target.dataset.action;

    switch (action) {
      case "delete":
        const shortcutItemEl = event.target.closest(".shortcut");
        const shortcutId = shortcutItemEl.dataset.id;
        await deleteBookmark(shortcutId);
        shortcutItemEl.remove();
    }
  }

  setup() {
    this.$el.querySelectorAll("img[data-cover]").forEach((img) => {
      img.addEventListener("error", () => {
        img.parentElement.dataset.fallback = img.dataset.fallback;
      });
    });

    this.$el.querySelectorAll(".shortcut-dropdown").forEach((el) => {
      el.addEventListener(
        "click",
        this.handleShortchutDropdownItemClick.bind(this)
      );
    });
  }
}
