/**
 * @typedef {Object} BookmarkFolder
 * @property {string} id
 * @property {string} title
 */

/**
 * @typedef {chrome.bookmarks.BookmarkTreeNode} BookmarkTreeNode
 */

/**
 * @param {BookmarkTreeNode} bookmarkTreeNode
 */
function isFolder(bookmarkTreeNode) {
  return bookmarkTreeNode.children !== undefined;
}

/**
 * @param {BookmarkTreeNode} bookmarkTreeNode
 */
function isRootFolder(bookmarkTreeNode) {
  return bookmarkTreeNode.parentId === undefined;
}

/**
 *
 * @param {BookmarkTreeNode} bookmarkTreeNode
 */
export function isBookmark(bookmarkTreeNode) {
  return bookmarkTreeNode.url !== undefined;
}

/**
 * @returns {Promise<BookmarkFolder[]>} folders
 */
export const getFodlers = async () => {
  const bookmarkTree = await chrome.bookmarks.getTree();

  /**
   * @param {BookmarkTreeNode[]} nodes
   */
  const run = (nodes) => {
    /** @type {BookmarkFolder} */
    const folders = [];

    nodes.forEach((node) => {
      if (isFolder(node)) {
        if (!isRootFolder(node)) {
          folders.push({
            id: node.id,
            title: node.title,
          });
        }

        if (node.children.length > 0) {
          folders.push(...run(node.children));
        }
      }
    });

    return folders;
  };

  return run(bookmarkTree);
};

/**
 * @param {string} id
 */
export const getBookmarksFromFolder = async (id) => {
  const nodes = await chrome.bookmarks.getChildren(id);
  const bookmarks = nodes.filter(isBookmark);
  return bookmarks;
};

/**
 * @param {string} id
 */
export const deleteBookmark = async (id) => {
  await chrome.bookmarks.remove(id);
};
