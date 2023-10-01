/**
 * @props className (optional): 'mt20' (String)
 * @props label (optional): 'Select Icon' (String)
 * @props icon (required): { class, fontSize, color } (Object)
 * @props onChange (required): (Function)
 * @props defaults (optional): { class, fontSize, color } (Object)
 */

import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { PanelRow, RangeControl, Tooltip, __experimentalGradientPicker, GradientPicker } from '@wordpress/components';
const Gradient = __experimentalGradientPicker || GradientPicker;

import './IconControl.scss';

import { Label, BtnGroup, BColor } from '../index';
import { gradients, bgTypes } from '../utils/options';
import iconLists from './iconLists6';

const IconControl = props => {
	const { className = '', label = __('Select Icon:', 'bplugins'), value = {}, onChange, defaults = {}, isSize = true, isColor = true } = props;

	const defaultVal = { class: '', name: '', fontSize: 16, colorType: 'solid', color: 'inherit', gradient: 'linear-gradient(135deg, #4527a4, #8344c5)' }

	const getDefault = property => defaults?.[property] || defaultVal[property];

	const getValue = property => value?.[property] || getDefault(property);
	const setValue = (property, val) => onChange({ ...value, [property]: val });

	// Font family searching
	const [query, setQuery] = useState('');
	const [isSearching, setIsSearching] = useState(false);
	const searchIcons = iconLists.filter(({ name }) => name.replace(/-/g, ' ').toLowerCase().includes(query.toLowerCase()));

	return <>
		<PanelRow className={`bPlIconTitle ${className}`}>
			<Label className='mt0 mb0'>{label}</Label>
			<i className={value?.class}></i>
		</PanelRow>

		<div className='bPlIconSelect'>
			<input type='search' value={query} onClick={() => setIsSearching(!isSearching)} placeholder={getValue('name')?.replace(/-/g, ' ') || 'Search & Select Icon'} onChange={e => setQuery(e.target.value)} />

			<span className={`dashicon dashicons dashicons-${isSearching ? 'arrow-up' : 'arrow-down'}`} onClick={() => setIsSearching(!isSearching)}></span>

			{isSearching && <div className='bPlIconLists'>
				{searchIcons?.map(item => <Tooltip key={item?.class} text={item?.name?.replace(/-/g, ' ')} position='top'><i onClick={() => {
					onChange({ ...value, ['class']: item?.class, ['name']: item?.name });
					setQuery('');
					setIsSearching(false);
				}} className={item?.class}></i></Tooltip>)}
			</div>}
		</div>

		{isSize && <>
			<Label>{__('Icon Size:', 'bplugins')}</Label>
			<RangeControl value={getValue('fontSize')} onChange={val => setValue('fontSize', val)} min={0} max={400} step={1} allowReset={true} resetFallbackValue={getDefault('fontSize')} initialPosition={getDefault('fontSize')} />
		</>}

		{isColor && <>
			<PanelRow className='mt20'>
				<Label className=''>{__('Icon Color Type:', 'bplugins')}</Label>
				<BtnGroup value={getValue('colorType')} onChange={val => setValue('colorType', val)} options={bgTypes} size='small' />
			</PanelRow>

			{'gradient' === getValue('colorType') ? <Gradient value={getValue('gradient')} onChange={val => setValue('gradient', val)} gradients={gradients} /> : <BColor label={__('Icon Color:', 'bplugins')} value={getValue('color')} onChange={val => setValue('color', val)} defaultColor={getDefault('color')} />}
		</>}
	</>
};
export default IconControl;