export const getShortcuts = () => {
  const existingData = localStorage.getItem("shortcuts");
  const shortcuts = existingData ? JSON.parse(existingData) : [];
  return shortcuts;
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
