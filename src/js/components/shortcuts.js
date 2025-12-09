import { deleteShortcut, getShortcuts } from "../lib/data";

export class Shortcuts {
  constructor() {
    /** @type {HTMLDivElement} */
    this.$el = document.getElementById("shortcuts");
    this.render();
    this.setup();
  }

  renderShortcutDropdown() {
    return /*html*/ `
      <wc-menu-wrapper class="shortcut-dropdown" heading="shortcut-dropdown__heading" item="shortcut-dropdown__item" heading-class="open">
        <div class="shortcut-dropdown__heading">···</div>
        <button class="shortcut-dropdown__item" data-action="delete">Delete</button>
      </wc-menu-wrapper>
    `;
  }

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

  render() {
    const shortcuts = getShortcuts();
    this.$el.innerHTML = shortcuts
      .map(this.renderShortcutItem.bind(this))
      .join("");
  }

  handleShortchutDropdownItemClick(event) {
    if (!event.target.classList.contains("shortcut-dropdown__item")) return;

    const action = event.target.dataset.action;

    switch (action) {
      case "delete":
        const shortcutItemEl = event.target.closest(".shortcut");
        const shortcutId = shortcutItemEl.dataset.id;
        deleteShortcut(shortcutId);
        shortcutItemEl.remove();
    }
  }

  setup() {
    document.querySelectorAll("img[data-cover]").forEach((img) => {
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
