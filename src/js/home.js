import "../css/home.css";
import "@vanillawc/wc-menu-wrapper";
import { Shortcuts } from "./components/shortcuts";
import { BookmarkFolderSelect } from "./components/bookmark-folder-select";
import { ACTIONS } from "./lib/constants";

const ShortcutsComponent = new Shortcuts();
new BookmarkFolderSelect();

document.addEventListener("change", (e) => {
  const action = e.target.dataset.action;

  switch (action) {
    case ACTIONS.UPDATE_SHORTCUTS:
      ShortcutsComponent.render();
      break;
    default:
      break;
  }
});
