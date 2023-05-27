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
import { Dropdown, ColorPicker, Button, PanelRow } from '@wordpress/components';

import './ColorControl.scss';
import { Label } from '../index';

const ColorControl = props => {
	const { className = '', label = __('Color:', 'bplugins'), value, onChange, defaultColor, disableAlpha } = props;

	const themeColors = wp.data.select('core/block-editor').getSettings().colors;

	return <PanelRow className={className}>
		<Label className=''>{label}</Label>

		<Dropdown className='bPlDropdownContainer bPlColor' contentClassName='bPlDropdownPopover bPlColorPopover' position='top center'
			renderToggle={({ isOpen, onToggle }) => <>
				<div className='bPlColorButtonContainer'>
					<button className='bPlColorButton' onClick={onToggle} aria-expanded={isOpen} style={{ backgroundColor: value || 'transparent' }} />
				</div>

				{defaultColor && defaultColor != value && <Button className='bPlResetVal' icon='image-rotate' label={__('Reset', 'bplugins')} onClick={() => onChange(defaultColor)} />}
			</>}

			renderContent={({ isOpen, onClose }) => <>
				<ColorPicker className='bPlColorControl' color={value || ''} onChangeComplete={c => {
					const alphaToHex = disableAlpha ? '' : ('0' + Math.round(c.rgb.a * 255).toString(16)).slice(-2);
					onChange(c.hex + alphaToHex)
				}} disableAlpha={disableAlpha} />

				{themeColors.length && <div className='themeColors'>
					{themeColors.map(({ color }, index) => <div className='bColorButtonContainer' key={index}>
						<button
							className='bColorButton'
							onClick={() => {
								onChange(color);
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
export default ColorControl;