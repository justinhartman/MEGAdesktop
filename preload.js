/**
 * Preload script that will always have access to node APIs no matter whether node
 * integration is turned on or off. When node integration is turned off, the preload
 * script can reintroduce Node global symbols back to the global scope.
 *
 * @author     Justin Hartman <code@justinhartman.co>
 * @link       https://justinhartman.co
 * @copyright  Copyright (c) 2021 Justin Hartman
 * @licence    https://github.com/justinhartman/MEGAdesktop/blob/main/LICENSE MIT
 * @since      1.0.0
 */

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) {
            element.innerText = text;
        }
    };

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency]);
    }
});
