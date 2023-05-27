/**
 * @props className (optional): 'mt20' (String)
 * @props label: 'Shadow' (String)
 * @props value: [{hOffset, vOffset, blur, spreed, color, isInset}] (Array)
 * @props onChange: (Function)
 * @props defaults (optional): [{hOffset, vOffset, blur, spreed, color, isInset}] (Array)
 * @return Shadow Properties (Array)
 */

import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Dropdown, PanelRow, ToggleControl, __experimentalUnitControl as UnitControl, Button, Dashicon } from '@wordpress/components';

import { Label, BColor, BtnGroup } from '../index';
import { pxUnit, emUnit, remUnit } from '../utils/options';
import { gearIcon } from '../utils/icons';

const MultiShadowControl = props => {
	const { className = '', label = __('Shadow', 'bplugins'), value, onChange, type = 'box', defaults = [], produce } = props;

	const [activeIndex, setActiveIndex] = useState(0);

	const defaultVal = [{ hOffset: '0px', vOffset: '0px', blur: '0px', spreed: '0px', color: '#7090b0', isInset: false }]
	const shadow = (value?.length ? value : null) || (defaults?.length ? defaults : null) || defaultVal;

	const getDefault = (property) => defaults?.[activeIndex]?.[property] || defaultVal[0][property];

	const resetValue = (property) => <Button icon='image-rotate' className='bPlResetVal' onClick={() => updateShadow(property, getDefault(property))} />

	const updateShadow = (property, val) => {
		const newShadow = produce(shadow, draft => {
			draft[activeIndex][property] = val;
		})
		onChange(newShadow);
	}

	const duplicateShadow = e => {
		e.preventDefault();

		onChange([...shadow.slice(0, activeIndex), { ...shadow[activeIndex] }, ...shadow.slice(activeIndex)]);

		setActiveIndex(activeIndex + 1);
	}

	const removeShadow = e => {
		e.preventDefault();

		onChange([...shadow.slice(0, activeIndex), ...shadow.slice(activeIndex + 1)]);

		setActiveIndex(0 === activeIndex ? 0 : activeIndex - 1);
	}

	const { hOffset = '', vOffset = '', blur = '', spreed = '', color = '', isInset = false } = shadow[activeIndex] || {};

	return <PanelRow className={`bPlDropdown ${className}`}>
		<Label className='mt5'>{label}</Label>

		<Dropdown className='bPlDropdownContainer' contentClassName='bPlDropdownPopover' position='bottom right'
			renderToggle={({ isOpen, onToggle }) => <Button icon='edit' onClick={() => { onToggle(), setActiveIndex(0) }} aria-expanded={isOpen} />}
			renderContent={() => <>
				{1 < shadow.length && <PanelRow>
					<Label className='mt5'>{__('Shadow:', 'bplugins')}</Label>
					<BtnGroup value={activeIndex} onChange={val => setActiveIndex(val)} options={
						shadow.map((_, index) => ({ label: index + 1 + '', value: index })) || [{ label: 1, value: 0 }]
					} />
				</PanelRow>}

				{null !== activeIndex && <>
					<PanelRow>
						<UnitControl label={__('Horizontal Offset:', 'bplugins')} labelPosition='left' value={hOffset} onChange={val => updateShadow('hOffset', val)} units={[pxUnit(), emUnit(), remUnit()]} />
						{hOffset && hOffset !== getDefault('hOffset') && resetValue('hOffset')}
					</PanelRow>

					<PanelRow>
						<UnitControl label={__('Vertical Offset:', 'bplugins')} labelPosition='left' value={vOffset} onChange={val => updateShadow('vOffset', val)} units={[pxUnit(), emUnit(), remUnit()]} />
						{vOffset && vOffset !== getDefault('vOffset') && resetValue('vOffset')}
					</PanelRow>

					<PanelRow>
						<UnitControl label={__('Blur:', 'bplugins')} labelPosition='left' value={blur} onChange={val => updateShadow('blur', val)} units={[pxUnit(), emUnit(), remUnit()]} />
						{blur && blur !== getDefault('blur') && resetValue('blur')}
					</PanelRow>
					<small>{__('Blur cannot be negative value!', 'bplugins')}</small>

					{'box' === type && <PanelRow>
						<UnitControl label={__('Spreed:', 'bplugins')} labelPosition='left' value={spreed} onChange={val => updateShadow('spreed', val)} units={[pxUnit(), emUnit(), remUnit()]} />
						{spreed && spreed !== getDefault('spreed') && resetValue('spreed')}
					</PanelRow>}

					<BColor label={__('Color:', 'bplugins')} value={color} onChange={val => updateShadow('color', val)} defaultColor={getDefault('color')} />

					{'box' === type && <ToggleControl label={__('Shadow Inset?', 'bplugins')} checked={isInset} onChange={val => updateShadow('isInset', val)} />}

					<PanelRow className='itemAction mt20'>
						{1 < shadow?.length && <Button className='removeItem' label={__('Remove', 'bplugins')} onClick={removeShadow}><Dashicon icon='no' />{__('Remove', 'bplugins')}</Button>}

						<Button className='duplicateItem' label={__('Duplicate', 'bplugins')} onClick={duplicateShadow}>{gearIcon}{__('Duplicate', 'bplugins')}</Button>
					</PanelRow>
				</>}

				<br />
				<div className='addItem'>
					<Button label={__('Add New Shadow', 'bplugins')} onClick={() => onChange([...shadow, defaultVal[0]])}><Dashicon icon='plus' />{__('Add New Shadow', 'bplugins')}</Button>
				</div>
			</>}
		/>
	</PanelRow>;
};
export default MultiShadowControl;