/**
 * @props className (optional): 'mt20' (String)
 * @props label (optional): 'Space' (String)
 * @props space (required): {side, vertical, horizontal, top, right, bottom, left} (Object)
 * @props onChange (required): (Function)
 * @props defaults (optional): { side, vertical, horizontal, top, right, bottom, left } (Object)
 */

import { __ } from '@wordpress/i18n';
import { PanelRow, __experimentalUnitControl as UnitControl, ButtonGroup, Button, Tooltip, Dashicon } from '@wordpress/components';

import './SpaceControl.scss';
import { Label } from '../index';
import { pxUnit, perUnit, emUnit, remUnit } from '../utils/options';
import { scrollIcon } from '../utils/icons';

const SpaceControl = props => {
	const { className = '', label = __('Space:', 'bplugins'), value, onChange, defaults = {} } = props;

	const defaultVal = { side: 2, vertical: '0px', horizontal: '0px', top: '0px', right: '0px', bottom: '0px', left: '0px' }

	const getDefault = property => defaults?.[property] || defaultVal[property];

	const getValue = property => value?.[property] || getDefault(property);
	const setValue = (property, val) => onChange({ ...value, [property]: val });

	const getIntVal = property => parseInt(getValue(property)?.replace(/([a-z])+/g, ''));

	// Check if space property and value are equals to defaults or defaultVal
	const isObject = object => object != null && typeof object === 'object';
	const triCompare = (main, defaults, defaultVal) => {
		const mainAllKeys = Object.keys(main || {});
		const mainKeys = mainAllKeys.filter(arr => arr !== 'styles');

		const equalSpecific = (main, defaults) => {
			const mainKeys = Object.keys(main);

			for (const key of mainKeys) {
				const mainVal = main[key];
				const defaultVal = defaults[key];
				const areObjects = isObject(mainVal) && isObject(defaultVal);

				if (areObjects && !equalSpecific(mainVal, defaultVal) || !areObjects && mainVal !== defaultVal) {
					return false;
				}
			}

			return true;
		}

		for (const key of mainKeys) {
			const mainSingle = main[key];
			const defaultsSingle = defaults[key];
			const defaultValSingle = defaultVal[key];

			const areObjects1 = isObject(mainSingle) && isObject(defaultsSingle);
			const areObjects2 = isObject(mainSingle) && isObject(defaultValSingle);

			if (!defaultsSingle) {
				if (areObjects2 && !equalSpecific(mainSingle, defaultValSingle) || !areObjects2 && mainSingle !== defaultValSingle) {
					return false;
				}
			} else {
				if (areObjects1 && !equalSpecific(mainSingle, defaultsSingle) || !areObjects1 && mainSingle !== defaultsSingle) {
					return false;
				}
			}
		}

		return true;
	}

	return <div className={`bPlSpaceControl ${className}`}>
		<PanelRow>
			<Label className=''>{label}</Label>

			<ButtonGroup className={`bPlBtnGroup`}>
				<Tooltip text={__('Vertical, Horizontal', 'bplugins')} position='top'>
					<Button className='side2' isSmall={true} isMedium={false} isPrimary={2 === getValue('side')} aria-pressed={2 === getValue('side')} onClick={() => onChange({ ...value, ['side']: 2, ['vertical']: `${(getIntVal('top') + getIntVal('bottom')) / 2}px`, ['horizontal']: `${(getIntVal('left') + getIntVal('right')) / 2}px` })}>
						<span className='scrollIcon'>{scrollIcon}</span>
						<span className='sideScrollIcon'>{scrollIcon}</span>
					</Button>
				</Tooltip>
				<Tooltip text={__('Top, Right, Bottom, Left', 'bplugins')} position='top'>
					<Button isSmall={true} isMedium={false} isPrimary={4 === getValue('side')} aria-pressed={4 === getValue('side')} onClick={() => onChange({ ...value, ['side']: 4, ['top']: getValue('vertical'), ['right']: getValue('horizontal'), ['bottom']: getValue('vertical'), ['left']: getValue('horizontal') })}>
						<Dashicon icon='arrow-up-alt' />
						<Dashicon icon='arrow-right-alt' />
						<Dashicon icon='arrow-down-alt' />
						<Dashicon icon='arrow-left-alt' />
					</Button>
				</Tooltip>
			</ButtonGroup>

			{!triCompare(value, defaults, defaultVal) && <Button icon='image-rotate' className='bPlResetVal' onClick={() => {
				const obj = { side: getDefault('side'), vertical: getDefault('vertical'), horizontal: getDefault('horizontal'), top: getDefault('top'), right: getDefault('right'), bottom: getDefault('bottom'), left: getDefault('left') }
				onChange({ ...value, ...obj });
			}} />}
		</PanelRow>

		{2 === getValue('side') && <PanelRow className='twoColumn'>
			<UnitControl label={__('Top Bottom:', 'bplugins')} labelPosition='top' value={getValue('vertical')} onChange={val => setValue('vertical', val)} units={[pxUnit(), perUnit(), emUnit(), remUnit()]} />

			<UnitControl label={__('Left Right:', 'bplugins')} labelPosition='top' value={getValue('horizontal')} onChange={val => setValue('horizontal', val)} units={[pxUnit(), perUnit(), emUnit(), remUnit()]} />
		</PanelRow>}

		{4 === getValue('side') && <PanelRow className='fourColumn'>
			<UnitControl label={__('Top:', 'bplugins')} labelPosition='top' value={getValue('top')} onChange={val => setValue('top', val)} units={[pxUnit(), perUnit(), emUnit(), remUnit()]} />

			<UnitControl label={__('Right:', 'bplugins')} labelPosition='top' value={getValue('right')} onChange={val => setValue('right', val)} units={[pxUnit(), perUnit(), emUnit(), remUnit()]} />

			<UnitControl label={__('Bottom:', 'bplugins')} labelPosition='top' value={getValue('bottom')} onChange={val => setValue('bottom', val)} units={[pxUnit(), perUnit(), emUnit(), remUnit()]} />

			<UnitControl label={__('Left:', 'bplugins')} labelPosition='top' value={getValue('left')} onChange={val => setValue('left', val)} units={[pxUnit(), perUnit(), emUnit(), remUnit()]} />
		</PanelRow>}
	</div>
};
export default SpaceControl;