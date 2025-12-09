/**
 * @typedef {Object} Shortcut
 * @property {string} id
 * @property {string} url
 * @property {string} title
 * @property {string} createAt
 */

/**
 * @returns {Shortcut[]}
 */
export const getShortcuts = () => {
  const existingData = localStorage.getItem("shortcuts");
  const shortcuts = existingData ? JSON.parse(existingData) : [];
  return shortcuts;
};

/**
 * @param {Shortcut[]} shortcuts
 */
const setShortcuts = (shortcuts) => {
  localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
};

export const createShortcut = ({ url, title }) => {
  const shortcut = {
    id: window.crypto.randomUUID(),
    url: url,
    title: title,
    createAt: new Date().toISOString(),
  };
  const shortcuts = getShortcuts();
  shortcuts.push(shortcut);
  localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
};

export const deleteShortcut = (id) => {
  const shortcuts = getShortcuts();
  const newShortcuts = shortcuts.filter((s) => s.id !== id);
  setShortcuts(newShortcuts);
};
