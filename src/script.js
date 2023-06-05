import './style.scss';

import { tabInit } from './utils/function';

// When the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get all blocks with class 'wp-block-tcb-tabs'
    const blocks = document.querySelectorAll('.wp-block-tcb-tabs');

    // Iterate over each block
    blocks.forEach(block => {
        // Parse the attributes JSON string
        const attributes = JSON.parse(block.dataset.attributes);
        const { cId } = attributes;

        // Initialize the first tab
        const tabs = block.querySelectorAll('.tabMenu li');
        tabInit(block.querySelector('.tabMenu li'), cId);

        // Add click event listeners to all tabs
        tabs.forEach((tab) => {
            tab.addEventListener('click', function () {
                tabInit(tab, cId);
            });
        });

        // Remove the 'data-attributes' attribute from the block
        block?.removeAttribute('data-attributes');
    });
});
