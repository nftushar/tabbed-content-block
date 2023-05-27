export const getImageSizes = (image, imageSizes) => {
	if (!image) return [];
	let options = [];
	const sizes = image.media_details.sizes;

	for (const key in sizes) {
		const imageSize = imageSizes.find(s => s.slug === key);
		if (imageSize) {
			options.push({ label: imageSize.name, value: sizes[key].source_url });
		}
	}
	return options;
}

export const tabController = () => {
	setTimeout(() => {
		const panelBodies = document.querySelectorAll('.components-panel__body-title button');
		panelBodies.forEach(item => {
			item.addEventListener('click', clickEveryItem);
		});

		function clickEveryItem() {
			this.removeEventListener('click', clickEveryItem);
			panelBodies.forEach(item => {
				if (item.getAttribute('aria-expanded') === 'true' && !item.isEqualNode(this)) {
					item.click();
				}
			});
			setTimeout(() => {
				this.addEventListener('click', clickEveryItem);
			}, 500);
		}
	}, 500);
};