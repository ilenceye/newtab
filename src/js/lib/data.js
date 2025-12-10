/**
 * @typedef {Object} Shortcut
 * @property {string} id
 * @property {string} url
 * @property {string} title
 */

export const getSelectedFolderId = () => {
  return localStorage.getItem("selected-folder-id");
};

/**
 * @param {string} id
 */
export const setSelectedFolderId = (id) => {
  localStorage.setItem("selected-folder-id", id);
};
