export const borderStyles = [
	{ label: 'Solid', value: 'solid' },
	{ label: 'Dashed', value: 'dashed' },
	{ label: 'Dotted', value: 'dotted' },
	{ label: 'Double', value: 'double' },
	{ label: 'Groove', value: 'groove' },
	{ label: 'Inset', value: 'inset' },
	{ label: 'Outset', value: 'outset' },
	{ label: 'Ridge', value: 'ridge' }
];

export const pxUnit = (def = 0) => ({ value: 'px', label: 'px', default: def });
export const perUnit = (def = 0) => ({ value: '%', label: '%', default: def });
export const emUnit = (def = 0) => ({ value: 'em', label: 'em', default: def });
export const remUnit = (def = 0) => ({ value: 'rem', label: 'rem', default: def });
export const vwUnit = (def = 0) => ({ value: 'vw', label: 'vw', default: def });
export const vhUnit = (def = 0) => ({ value: 'vh', label: 'vh', default: def });

export const sides = [
	{ value: 'all', label: 'All Sides' },
	{ value: 'top', label: 'Top' },
	{ value: 'right', label: 'Right' },
	{ value: 'bottom', label: 'Bottom' },
	{ value: 'left', label: 'Left' },
	{ value: 'topRight', label: 'Top Right' },
	{ value: 'topBottom', label: 'Top Bottom' },
	{ value: 'topLeft', label: 'Top Left' },
	{ value: 'topRightBottom', label: 'Top Right Bottom' },
	{ value: 'topRightLeft', label: 'Top Right Left' },
	{ value: 'topBottomLeft', label: 'Top Bottom Left' },
	{ value: 'rightBottom', label: 'Right Bottom' },
	{ value: 'rightLeft', label: 'Right Left' },
	{ value: 'rightBottomLeft', label: 'Right Bottom Left' },
	{ value: 'bottomLeft', label: 'Bottom Left' }
];

export const gradients = [
	{ name: 'Daisy Bush to Fuchsia Blue', gradient: 'linear-gradient(135deg, #4527a4, #8344c5)', slug: 'daisy-bush-to-fuchsia-blue' },
	{ name: 'Reddish Orange to Yellowish Orange', gradient: 'linear-gradient(135deg, #fe6601, #fbb040)', slug: 'reddish-orange-to-yellowish-orange' },
	{ name: 'Tuft Bush to Carnation Pink', gradient: 'linear-gradient(135deg, #fed1c7, #fe8dc6)', slug: 'tuft-bush-to-carnation-pink' },
	{ name: 'Golden Fizz to Yellow Orange', gradient: 'linear-gradient(135deg, #f9ed32, #fbb040)', slug: 'golden-fizz-to-yellow-orange' },
	{ name: 'Light Electric Violet to Electric Violet', gradient: 'linear-gradient(135deg, #e100ff, #7f00ff)', slug: 'light-electric-violet-to-electric-violet' },
	{ name: 'Hot Pink to Violet Red', gradient: 'linear-gradient(135deg, #ff7db8, #ee2a7b)', slug: 'hot-pink-to-violet-red' },
	{ name: 'Spring Green to Azure Radiance', gradient: 'linear-gradient(135deg, #00ff8f, #00a1ff)', slug: 'spring-green-to-azure-radiance' }
];
export const bgTypes = [
	{ label: 'Solid', value: 'solid' },
	{ label: 'Gradient', value: 'gradient' }
];