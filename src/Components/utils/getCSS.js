export const getBackgroundCSS = (bg, isSolid = true, isGradient = true, isImage = true) => {
	const { type = 'solid', color = '#000000b3', gradient = 'linear-gradient(135deg, #4527a4, #8344c5)', image = {}, position = 'center center', attachment = 'initial', repeat = 'no-repeat', size = 'cover', overlayColor = '#000000b3' } = bg || {};

	const styles = ('gradient' === type && isGradient) ? `background: ${gradient};` :
		('image' === type && isImage) ?
			`background: url(${image?.url});
				background-color: ${overlayColor};
				background-position: ${position};
				background-size: ${size};
				background-repeat: ${repeat};
				background-attachment: ${attachment};
				background-blend-mode: overlay;` :
			isSolid && `background: ${color};`;

	return styles;
} // PHP version in Stepped Content

export const getBorderCSS = (border) => {
	const { width = '0px', style = 'solid', color = '#0000', side = 'all', radius = '0px' } = border || {};

	const borderSideCheck = s => {
		const bSide = side?.toLowerCase();
		return bSide?.includes('all') || bSide?.includes(s);
	}

	const noWidth = width === '0px' || !width;
	const borderCSS = `${width} ${style} ${color}`;

	const styles = `
		${noWidth ? '' : ['top', 'right', 'bottom', 'left'].map(side => borderSideCheck(side) ? `border-${side}: ${borderCSS};` : '').join('')}
		${!radius ? '' : `border-radius: ${radius};`}
	`;

	return styles;
}

export const getColorsCSS = (colors) => {
	const { color = '#333', bgType = 'solid', bg = '#0000', gradient = 'linear-gradient(135deg, #4527a4, #8344c5)' } = colors || {};

	const styles = `
		${color ? `color: ${color};` : ''}
		${gradient || bg ? `background: ${'gradient' === bgType ? gradient : bg};` : ''}
	`;

	return styles;
}

export const getIconCSS = (icon, isSize = true, isColor = true) => {
	const { fontSize = 16, colorType = 'solid', color = 'inherit', gradient = 'linear-gradient(135deg, #4527a4, #8344c5)' } = icon || {};

	const colorCSS = 'gradient' === colorType ?
		`color: transparent; background-image: ${gradient}; -webkit-background-clip: text; background-clip: text;` :
		`color: ${color};`;

	const styles = `
		${!fontSize || !isSize ? '' : `font-size: ${fontSize}px;`}
		${isColor ? colorCSS : ''}
	`;

	return styles;
}

export const getMultiShadowCSS = (value, type = 'box') => {
	let styles = '';

	value?.map((item, index) => {
		const { hOffset = '0px', vOffset = '0px', blur = '0px', spreed = '0px', color = '#7090b0', isInset = false } = item || {};

		const inset = isInset ? 'inset' : '';
		const offsetBlur = `${hOffset} ${vOffset} ${blur}`;
		const isComa = index + 1 >= value.length ? '' : ', ';

		styles += 'text' === type ? `${offsetBlur} ${color}${isComa}` : `${offsetBlur} ${spreed} ${color} ${inset}${isComa}`;
	});

	return styles || 'none';
}

export const getSeparatorCSS = (separator) => {
	const { width = '50%', height = '2px', style = 'solid', color = '#bbb' } = separator || {};

	const styles = `
		width: ${width};
		${'0px' === height && '0em' === height && '0rem' === height ? '' : `border-top: ${height} ${style} ${color};`}
	`;

	return styles;
}

export const getShadowCSS = (shadow) => {
	const { type = 'box', hOffset = '0px', vOffset = '0px', blur = '0px', spreed = '0px', color = '#7090b0', isInset = false } = shadow || {};

	const inset = isInset ? 'inset' : '';
	const offsetBlur = `${hOffset} ${vOffset} ${blur}`;

	const styles = 'text' === type ? `${offsetBlur} ${color}` : `${offsetBlur} ${spreed} ${color} ${inset}`;

	return styles || 'none';
}

export const getSpaceCSS = (space) => {
	const { side = 2, vertical = '0px', horizontal = '0px', top = '0px', right = '0px', bottom = '0px', left = '0px' } = space || {};

	const styles = 2 === side ? `${vertical} ${horizontal}` : `${top} ${right} ${bottom} ${left}`;

	return styles;
}

export const getTypoCSS = (selector, typo, isFamily = true) => {
	const { fontFamily = 'Default', fontCategory = 'sans-serif', fontVariant = 400, fontWeight = 400, isUploadFont = true, fontSize = { desktop: 15, tablet: 15, mobile: 15 }, fontStyle = 'normal', textTransform = 'none', textDecoration = 'auto', lineHeight = '135%', letterSpace = '0px' } = typo || {};

	const generateCss = (value, cssProperty) => !value ? '' : `${cssProperty}: ${value};`;

	const isEmptyFamily = !isFamily || !fontFamily || 'Default' === fontFamily;
	const desktopFontSize = fontSize?.desktop || fontSize;
	const tabletFontSize = fontSize?.tablet || desktopFontSize;
	const mobileFontSize = fontSize?.mobile || tabletFontSize;

	const styles = `
		${isEmptyFamily ? '' : `font-family: '${fontFamily}', ${fontCategory};`}
		${generateCss(fontWeight, 'font-weight')}
		${`font-size: ${desktopFontSize}px;`}
		${generateCss(fontStyle, 'font-style')}
		${generateCss(textTransform, 'text-transform')}
		${generateCss(textDecoration, 'text-decoration')}
		${generateCss(lineHeight, 'line-height')}
		${generateCss(letterSpace, 'letter-spacing')}
	`;

	// Google font link
	const linkQuery = !fontVariant || 400 === fontVariant ? '' : '400i' === fontVariant ? ':ital@1' : fontVariant?.includes('00i') ? `: ital, wght@1, ${fontVariant?.replace('00i', '00')} ` : `: wght@${fontVariant} `;

	const link = isEmptyFamily ? '' : `https://fonts.googleapis.com/css2?family=${fontFamily?.split(' ').join('+')}${linkQuery.replace(/ /g, '')}&display=swap`;

	return {
		googleFontLink: !isUploadFont || isEmptyFamily ? '' : `@import url(${link});`,
		styles: `${selector}{
			${styles}
		}
		@media (max-width: 768px) {
			${selector}{
				${`font-size: ${tabletFontSize}px;`}
			}
		}
		@media (max-width: 576px) {
			${selector}{
				${`font-size: ${mobileFontSize}px;`}
			}
		}`.replace(/\s+/g, ' ').trim()
	}
}

export const getBoxCSS = (val = {}) => Object.values(val).join(' ');