/**
 * @props className (optional): 'mt20' (String)
 * @props label (optional): 'Background' (String)
 * @props background (required): { type, color, gradient, image, position, attachment, repeat, size, overlayColor } (Object)
 * @props onChange (required): (Function)
 * @props defaults (optional): { type, color, gradient, image, position, attachment, repeat, size, overlayColor } (Object)
 */

import { __ } from '@wordpress/i18n';
import { Button, PanelRow, Dropdown, __experimentalGradientPicker, GradientPicker, __experimentalAlignmentMatrixControl as AlignmentMatrixControl, SelectControl } from '@wordpress/components';
const Gradient = __experimentalGradientPicker || GradientPicker;

import { Label, BColor, BtnGroup, InlineDetailMediaUpload } from '../index';
import { gradients } from '../utils/options';
import { bgTypes, attachments, repeats, sizes } from './options';

const Background = props => {
	const { className = '', label = __('Background', 'bplugins'), value = {}, onChange, defaults = {}, isSolid = true, isGradient = true, isImage = true } = props;

	const defaultVal = { type: 'solid', color: '#000000b3', gradient: 'linear-gradient(135deg, #4527a4, #8344c5)', image: {}, position: 'center center', attachment: 'initial', repeat: 'no-repeat', size: 'cover', overlayColor: '#000000b3' }

	const getDefault = property => defaults?.[property] || defaultVal[property];
	const setDefault = property => onChange({ ...value, [property]: getDefault(property) });

	const getValue = property => value?.[property] || getDefault(property);
	const setValue = (property, val) => onChange({ ...value, [property]: val });
	const resetValue = property => <Button icon='image-rotate' className='bPlResetVal' onClick={() => setDefault(property)} />

	return <PanelRow className={`bPlDropdown ${className}`}>
		<Label className='mb5'>{label}</Label>

		<Dropdown className='bPlDropdownContainer' contentClassName='bPlDropdownPopover' position='bottom right'
			renderToggle={({ isOpen, onToggle }) => <Button icon='edit' onClick={onToggle} aria-expanded={isOpen} />}
			renderContent={() => <>
				{/* Type */}
				<PanelRow>
					<Label className=''>{__('Type:', 'bplugins')}</Label>
					<BtnGroup value={getValue('type')} onChange={val => setValue('type', val)} options={false === isSolid ? bgTypes.filter(b => b.value !== 'solid') : false === isGradient ? bgTypes.filter(b => b.value !== 'gradient') : false === isImage ? bgTypes.filter(b => b.value !== 'image') : bgTypes} />
				</PanelRow>

				{'solid' === getValue('type') && isSolid && <BColor className='mt20' label={__('Color:', 'bplugins')} value={getValue('color')} onChange={val => setValue('color', val)} defaultColor={getDefault('color')} />}

				{'gradient' === getValue('type') && isGradient && <Gradient className='mt20' value={getValue('gradient')} onChange={val => setValue('gradient', val)} gradients={gradients} />}

				{'image' === getValue('type') && isImage && <>
					<Label className='mb5'>{__('Image', 'bplugins')}</Label>
					<InlineDetailMediaUpload types={['image']} value={getValue('image')} onChange={val => setValue('image', val)} />

					<PanelRow>
						<Label className=''>{__('Position', 'bplugins')}</Label>
						<AlignmentMatrixControl value={getValue('position')} onChange={val => setValue('position', val)} />
						{value?.position && value?.position !== getDefault('position') && resetValue('position')}
					</PanelRow>

					<PanelRow>
						<Label className=''>{__('Attachment:', 'bplugins')}</Label>
						<SelectControl value={getValue('attachment')} onChange={val => setValue('attachment', val)} options={attachments} />
						{value?.attachments && value?.attachments !== getDefault('attachments') && resetValue('attachments')}
					</PanelRow>

					<PanelRow>
						<Label className=''>{__('Repeat:', 'bplugins')}</Label>
						<SelectControl value={getValue('repeat')} onChange={val => setValue('repeat', val)} options={repeats} />
						{value?.repeat && value?.repeat !== getDefault('repeat') && resetValue('repeat')}
					</PanelRow>

					<PanelRow>
						<Label className=''>{__('Size:', 'bplugins')}</Label>
						<SelectControl value={getValue('size')} onChange={val => setValue('size', val)} options={sizes} />
						{value?.size && value?.size !== getDefault('size') && resetValue('size')}
					</PanelRow>

					<BColor className='mt20' label={__('Overlay Color:', 'bplugins')} value={getValue('overlayColor')} onChange={val => setValue('overlayColor', val)} defaultColor={getDefault('overlayColor')} />
				</>}
			</>}
		/>
	</PanelRow>
};
export default Background;