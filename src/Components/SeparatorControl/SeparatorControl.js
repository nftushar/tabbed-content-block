/**
 * @props className (optional): 'mt20' (String)
 * @props label: 'Separator' (String)
 * @props separator: { width, height, style, color } (Object)
 * @props onChange: (Function)
 * @props defaults (optional): { width, height, style, color } (Object)
 * @return Separator Properties (Object)
 */

import { __ } from '@wordpress/i18n';
import { Dropdown, PanelRow, SelectControl, __experimentalUnitControl as UnitControl, Button } from '@wordpress/components';

import { Label, BColor } from '../index';
import { borderStyles, pxUnit, perUnit, emUnit, remUnit } from '../utils/options';

const SeparatorControl = props => {
	const { className = '', label = __('Separator', 'bplugins'), value, onChange, defaults = {} } = props;

	const defaultVal = { width: '50%', height: '2px', style: 'solid', color: '#bbb' }

	const getDefault = property => defaults?.[property] || defaultVal[property];
	const setDefault = property => onChange({ ...value, [property]: getDefault(property) });

	const getValue = property => value?.[property] || getDefault(property);
	const setValue = (property, val) => onChange({ ...value, [property]: val });
	const resetValue = property => <Button icon='image-rotate' className='bPlResetVal' onClick={() => setDefault(property)} />

	return <PanelRow className={`bPlDropdown ${className}`}>
		<Label className='mt5'>{label}</Label>

		<Dropdown className='bPlDropdownContainer' contentClassName='bPlDropdownPopover' position='bottom right'
			renderToggle={({ isOpen, onToggle }) => <Button icon='edit' onClick={onToggle} aria-expanded={isOpen} />}
			renderContent={() => <>
				<PanelRow>
					<UnitControl label={__('Width:', 'bplugins')} labelPosition='left' value={getValue('width')} onChange={val => setValue('width', val)} units={[pxUnit(50), perUnit(25), emUnit(3)]} isResetValueOnUnitChange={true} />
					{value?.width && value?.width !== getDefault('width') && resetValue('width')}
				</PanelRow>

				<PanelRow>
					<UnitControl label={__('Height:', 'bplugins')} labelPosition='left' value={getValue('height')} onChange={val => setValue('height', val)} units={[pxUnit(3), emUnit(), remUnit()]} />
					{value?.height && value?.height !== getDefault('height') && resetValue('height')}
				</PanelRow>

				<PanelRow>
					<Label className=''>{__('Style:', 'bplugins')}</Label>
					<SelectControl value={getValue('style')} onChange={val => setValue('style', val)} options={borderStyles} />
					{value?.style && value?.style !== getDefault('style') && resetValue('style')}
				</PanelRow>

				<BColor label={__('Color:', 'bplugins')} value={getValue('color')} onChange={val => setValue('color', val)} defaultColor={getDefault('color')} />
			</>}
		/>
	</PanelRow>
};
export default SeparatorControl;