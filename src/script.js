import './style.scss';

import { tabInit } from './utils/function';

document.addEventListener('DOMContentLoaded', () => {
    const blocks = document.querySelectorAll('.wp-block-tcb-tabs');
    blocks.forEach(block => {
        const attributes = JSON.parse(block.dataset.attributes);
        const { cId } = attributes;

        // const listEls = document.querySelectorAll(`#bTempTabs-${cId} .tabMenu li`);
        // listEls[0] && tabInit(listEls[0], cId);

        // listEls.forEach(listEl => {
        //     listEl.addEventListener('click', (e) => {
        //         e.preventDefault();

        //         tabInit(listEl, cId);
        //     });
        // });

        const tabs = block.querySelectorAll('.tabMenu li');
        tabInit(block.querySelector('.tabMenu li'), cId);
        tabs.forEach((tab) => {
            tab.addEventListener('click', function () {
                tabInit(tab, cId)
            })
        });

        block?.removeAttribute('data-attributes');
    });
});