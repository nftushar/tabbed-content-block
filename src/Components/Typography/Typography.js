/**
 * @props className (optional): 'mt20' (String)
 * @props label (optional): 'Typography' (String)
 * @props typography (required): {fontFamily, fontWeight, fontSize, fontStyle, textTransform, textDecoration, lineHeight, letterSpace} (Object)
 * @props onChange (required): (Function)
 * @props defaults (optional): { fontFamily, fontWeight, fontSize, fontStyle, textTransform, textDecoration, lineHeight, letterSpace } (Object)
 */

import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { Button, Dropdown, PanelRow, SelectControl, __experimentalUnitControl as UnitControl, RangeControl, ToggleControl } from '@wordpress/components';

import './Typography.scss';
import { Label, BDevice, BtnGroup } from '../index';
import { pxUnit, perUnit, emUnit, remUnit } from '../utils/options';
import fontLists from './fontLists';
import { fontStyles, textTransforms, textDecorations } from './options';



const Typography = props => {
	const { className = '', label = __('Typography:', 'bplugins'), value, onChange, defaults = {}, isFamily = true, produce } = props;

	const defaultVal = { fontFamily: 'Default', fontCategory: 'sans-serif', fontWeight: 400, isUploadFont: true, fontSize: { desktop: 15, tablet: 15, mobile: 15 }, fontStyle: 'normal', textTransform: 'none', textDecoration: 'auto', lineHeight: '135%', letterSpace: '0px' }

	const getDefault = property => defaults?.[property] || defaultVal[property];
	const setDefault = property => onChange({ ...value, [property]: getDefault(property) });

	const getValue = property => undefined === value?.[property] ? getDefault(property) : value?.[property];
	// const setValue = (property, val) => onChange({ ...value, [property]: val });
	const resetValue = property => value?.[property] && value?.[property] !== getDefault(property) && <Button icon='image-rotate' className='bPlResetVal' onClick={() => setDefault(property)} />

	// Font family searching
	const [device, setDevice] = useState('desktop');
	const [query, setQuery] = useState('');
	const [isSearching, setIsSearching] = useState(false);
	const searchFonts = fontLists.filter(({ family }) => family.toLowerCase().includes(query.toLowerCase()));

	// Get Font weights
	const fontWeights = () => {
		const currentFontWeights = fontLists.find(font => font.family === getValue('fontFamily'))?.variants;
		let weights = []
		currentFontWeights?.map(weight => weights?.push({ label: weight, value: weight }));
		return 0 === weights.length ? [400] : weights;
	}

	const setValue = (property, val, otherProperty) => {
		const newTypo = produce(value, draft => {
			if (otherProperty) {
				draft[property] = { ...draft[property], [otherProperty]: val };
			} else {
				draft[property] = val;
			}
		});
		onChange(newTypo);
	}

	return <PanelRow className={`bPlDropdown ${className}`}>
		<Label className=''>{label}</Label>

		<Dropdown className='bPlDropdownContainer' contentClassName='bPlDropdownPopover' position='bottom right'
			renderToggle={({ isOpen, onToggle }) => <Button icon='admin-customizer' onClick={onToggle} aria-expanded={isOpen} />}
			renderContent={() => <>
				{/* Font Family & Weight */}
				{isFamily ? <>
					<PanelRow className='bPlTypoFontTitle'>
						<Label className=''>{__('Font Family:', 'bplugins')}</Label>
						<Label className=''>{__('Weight:', 'bplugins')}</Label>
					</PanelRow>
					<PanelRow className='bPlTypoFont'>
						<div className='bPlTypoFontSelect'>
							<input type='search' value={query} onClick={() => setIsSearching(!isSearching)} placeholder={getValue('fontFamily') || 'Search Font'} onChange={e => setQuery(e.target.value)} />

							<span className={`dashicon dashicons dashicons-${isSearching ? 'arrow-up' : 'arrow-down'} `} onClick={() => setIsSearching(!isSearching)}></span>

							{isSearching && <ul className='bPlTypoFontLists'>
								{searchFonts?.map(font => <li key={font?.family} onClick={() => {
									onChange({ ...value, ['fontFamily']: font?.family, ['fontCategory']: font?.category || 'sans-serif', ['fontWeight']: 400, ['fontVariant']: 400 });
									setQuery('');
									setIsSearching(false);
								}}>{font?.family}</li>)}
							</ul>}
						</div>

						<SelectControl value={getValue('fontVariant')} onChange={val => { onChange({ ...value, ['fontWeight']: parseInt(val?.replace('00i', '00')), ['fontVariant']: val }) }} options={fontWeights()} />
					</PanelRow>

					<ToggleControl className='mt10' label={__('Upload Google Font', 'bplugins')} checked={getValue('isUploadFont')} onChange={val => setValue('isUploadFont', val)} />
				</> : <PanelRow>
					<Label className=''>{__('Weight:', 'bplugins')}</Label>
					<SelectControl value={getValue('fontWeight')} onChange={val => setValue('fontWeight', val)} options={fontWeights()} />
				</PanelRow>}


				{/* Font Size */}
				<PanelRow className='mt20'>
					<Label className=''>{__('Font Size:', 'bplugins')}</Label>
					<BDevice device={device} onChange={val => setDevice(val)} />
				</PanelRow>
				<RangeControl value={getValue('fontSize')?.[device] || getValue('fontSize')} onChange={val => setValue('fontSize', val, device)} min={0} max={120} step={1} allowReset={true} resetFallbackValue={getDefault('fontSize')?.[device] || getDefault('fontSize')} initialPosition={getDefault('fontSize')?.[device] || getDefault('fontSize')} />

				{/* Font Style */}
				<PanelRow className='mt20'>
					<Label className=''>{__('Font Style:', 'bplugins')}</Label>
					<SelectControl value={getValue('fontStyle')} onChange={val => setValue('fontStyle', val)} options={fontStyles} />
					{resetValue('fontStyle')}
				</PanelRow>

				{/* Text Transform */}
				<PanelRow className='mt20'>
					<Label className='mt5'>{__('Text Transform:', 'bplugins')}</Label>
					<BtnGroup value={getValue('textTransform')} onChange={val => setValue('textTransform', val)} options={textTransforms} isTextIcon={true} />
				</PanelRow>

				{/* Text Decoration */}
				<PanelRow className='mt20'>
					<Label className=''>{__('Text Decoration:', 'bplugins')}</Label>
					<SelectControl value={getValue('textDecoration')} onChange={val => setValue('textDecoration', val)} options={textDecorations} />
					{resetValue('textDecoration')}
				</PanelRow>

				{/* Line Height */}
				<PanelRow className='mt20'>
					<UnitControl label={__('Line Height:', 'bplugins')} labelPosition='left' value={getValue('lineHeight')} onChange={val => setValue('lineHeight', val)} units={[pxUnit(24), perUnit(135), emUnit(2), remUnit(2)]} isResetValueOnUnitChange={true} />
					{resetValue('lineHeight')}
				</PanelRow>

				{/* Letter Spacing */}
				<PanelRow className='mt20'>
					<UnitControl label={__('Letter Spacing:', 'bplugins')} labelPosition='left' value={getValue('letterSpace')} onChange={val => setValue('letterSpace', val)} units={[pxUnit(), emUnit(), remUnit()]} />
					{resetValue('letterSpace')}
				</PanelRow>
			</>}
		/>
	</PanelRow>
};
export default Typography;