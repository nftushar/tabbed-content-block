/**
 * @props className (optional): 'mt20' (String)
 * @props label: 'Color' (String)
 * @props value: value of color (String)
 * @props defaultColor: default color for reset color
 * @props onChange: (Function)
 * @props disableAlpha: Disable alpha of color (Boolean)
 * @return color (String)
 */

import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { Dropdown, ColorPicker, Button, PanelRow } from '@wordpress/components';

import './BColor.scss';
import { Label } from '../index';

const BColor = props => {
	const { className = '', label = __('Color:', 'bplugins'), value, onChange, defaultColor, disableAlpha = false } = props;
	const [state, setState] = useState(value);

	const themeColors = wp.data.select('core/block-editor').getSettings().colors;

	return <PanelRow className={className}>
		<Label className=''>{label}</Label>

		<Dropdown className='bPlDropdownContainer bColor' contentClassName='bPlDropdownPopover bColorDropdownPopover' position='top right'
			renderToggle={({ isOpen, onToggle }) => {
				return <>
					<div className='bColorButtonContainer'>
						<button className='bColorButton' onClick={onToggle} aria-expanded={isOpen} style={{ backgroundColor: value || 'transparent' }} />
					</div>

					{defaultColor && defaultColor != state && <Button className='bPlResetVal' icon='image-rotate' label={__('Reset', 'bplugins')} onClick={() => {
						onChange(defaultColor);
						setState(defaultColor);
					}} />}
				</>;
			}}

			renderContent={({ isOpen, onClose }) => <>
				<ColorPicker color={value || ''} disableAlpha={disableAlpha} onChangeComplete={(c) => {
					onChange(`rgba(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}, ${c.rgb.a})`);
					setState(c.hex);
				}} />

				{themeColors.length && <div className='themeColors'>
					{themeColors.map(({ color }, index) => <div className='bColorButtonContainer' key={index}>
						<button
							className='bColorButton'
							onClick={() => {
								onChange(color);
								setState(color);
								onClose;
							}}
							aria-expanded={isOpen}
							style={{ backgroundColor: value ? color : 'transparent' }}
						/>
					</div>)}
				</div>}
			</>}
		/>
	</PanelRow>
};
export default BColor;