const addClass = (el, cl) => el?.classList.add(cl);
const remClass = (el, cl) => el?.classList.remove(cl);

export const getBoxValue = object => Object.values(object).join(' ');

const getIndex = el => Array.from(el?.parentElement?.children || [])?.indexOf(el);

let timerOpacity;

export const tabInit = (el, clientId) => {
    const listEls = document.querySelectorAll(`#tcbTabContent-${clientId} .tabMenu > li`);
    const bodyEls = document.querySelectorAll(`#tcbTabContent-${clientId} .wp-block-tcb-tab`);

    // Clear Timer
    window.clearTimeout(timerOpacity);

    // Remove Active Classes
    listEls.forEach(el => {
        remClass(el, 'active');
    });
    bodyEls.forEach(bodyEl => {
        remClass(bodyEl, 'active');
        remClass(bodyEl, 'activeContent');
    });

    // Add Active Classes
    addClass(el, 'active');

    const bodyEl = bodyEls[getIndex(el)];
    addClass(bodyEl, 'active');

    // Opacity Transition Class
    timerOpacity = setTimeout(() => {
        // console.log(bodyEl)
        addClass(bodyEl, 'activeContent');
    }, 50);
}
