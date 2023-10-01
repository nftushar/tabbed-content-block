/**
 * @props className (optional): 'mt20' (String)
 * @props label (optional): 'Typography' (String)
 * @props colors (required): { color, bgType, bg, gradient } (Object)
 * @props onChange (required): (Function)
 * @props defaults (optional): { color, bgType, bg, gradient } (Object)
 */

import { __ } from '@wordpress/i18n';
import { Button, PanelRow, Dropdown, __experimentalGradientPicker, GradientPicker, ColorIndicator } from '@wordpress/components';
const Gradient = __experimentalGradientPicker || GradientPicker;

// Variables
import { Label, BtnGroup, BColor } from '../index';
import { gradients, bgTypes } from '../utils/options';

const ColorsControl = props => {
	const { className = '', label = __('Colors:', 'bplugins'), value, onChange, defaults = {} } = props;

	const defaultVal = { color: '#333', bgType: 'solid', bg: '#0000', gradient: 'linear-gradient(135deg, #4527a4, #8344c5)' }

	const getDefault = property => defaults?.[property] || defaultVal[property];

	const getValue = property => value?.[property] || getDefault(property);
	const setValue = (property, val) => onChange({ ...value, [property]: val });

	return <PanelRow className={`bPlDropdown ${className}`}>
		<Label className=''>{label} <ColorIndicator colorValue={getValue('color')} /> <ColorIndicator colorValue={getValue('gradient' === getValue('bgType') ? 'gradient' : 'bg')} /></Label>

		<Dropdown className='bPlDropdownContainer' contentClassName='bPlDropdownPopover' position='bottom right'
			renderToggle={({ isOpen, onToggle }) => <Button icon='edit' onClick={onToggle} aria-expanded={isOpen} />}
			renderContent={() => <>
				<BColor label={__('Color:', 'bplugins')} value={getValue('color')} onChange={val => setValue('color', val)} defaultColor={getDefault('color')} />

				<PanelRow className='mt20'>
					<Label className=''>{__('Background:', 'bplugins')}</Label>
					<BtnGroup value={getValue('bgType')} onChange={val => setValue('bgType', val)} options={bgTypes} size='small' />
				</PanelRow>

				{'gradient' === getValue('bgType') ? <Gradient value={getValue('gradient')} onChange={val => setValue('gradient', val)} gradients={gradients} /> : <BColor label={__('Background Color:', 'bplugins')} value={getValue('bg')} onChange={val => setValue('bg', val)} defaultColor={getDefault('bg')} />}
			</>}
		/>
	</PanelRow>
};
export default ColorsControl;