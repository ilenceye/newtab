import { getFodlers } from "../lib/chrome";
import { getSelectedFolderId, setSelectedFolderId } from "../lib/data";
import { ACTIONS } from "../lib/constants";

export class BookmarkFolderSelect {
  constructor() {
    this.$el = document.getElementById("bookmark-folder");
    this.render();
  }

  async render() {
    const folders = await getFodlers();
    const selectedFolderId = getSelectedFolderId();

    this.$el.innerHTML = /*html*/ `
      <select 
        class="bookmark-folder-select" 
        data-action="${ACTIONS.UPDATE_SHORTCUTS}"
        >
          ${folders
            .map(
              ({ id, title }) => /*html*/ `
              <option 
                value="${id}"
                ${id === selectedFolderId ? "selected" : ""}
                >
                  ${title}
              </option>
            `
            )
            .join("")}
      </select>
    `;

    this.$el.querySelector("select").addEventListener("change", (e) => {
      setSelectedFolderId(e.target.value);
      this.render();
    });
  }
}
