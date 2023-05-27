import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
import { MediaUpload, MediaUploadCheck, MediaPlaceholder } from '@wordpress/block-editor';
import { Button, withNotices, TextControl, SelectControl, PanelRow, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { isBlobURL } from '@wordpress/blob';

import './ImageControl.scss';
import { Label } from '../index';
import { getImageSizes } from '../utils/functions';


export const ImageHolderControl = props => {
	const { className, label = __('Image:', 'bplugins'), value = {}, onChange } = props;

	const onImageSelect = ({ id, url, alt, title }) => onChange({ ...value, id, url, alt, title });

	return <div className={className}>
		<Label className='mb5'>{label}</Label>

		<div className='editImageHolder'>
			<div className='mediaControl'>
				<MediaUpload allowedTypes={['image']} value={value?.id} onSelect={onImageSelect} render={({ open }) =>
					!value.url ? <div className='btnControl'>
						<Button icon='upload' onClick={open}>{__('Upload', 'bplugins')}</Button>
					</div> : <div className='btnControl'>
						<Button icon='controls-repeat' onClick={open}>{__('Replace', 'bplugins')}</Button>
						<Button icon='exit' onClick={() => onChange({})} className='btnRed'>{__('Remove', 'bplugins')}</Button>
					</div>} />
			</div>

			<img src={value?.url} alt={value?.alt || value?.title} />
		</div>
	</div>
};


export const ChangeImageData = withSelect((select, props) => {
	const { value } = props;

	return {
		image: value?.id ? select('core').getMedia(value?.id) : null,
		imageSizes: select('core/block-editor').getSettings().imageSizes
	}
})(props => {
	const { className, value = {}, onChange, image, imageSizes } = props;

	const setValue = (property, val) => onChange({ ...value, [property]: val });

	return <div className={className}>
		{value?.url && !isBlobURL(value?.url) && <>
			<Label className='mb5'>{__('Alt Text (Alternative Text):', 'bplugins')}</Label>
			<TextControl value={value?.alt} onChange={val => setValue('alt', val)} />
		</>}

		{value?.id && 0 !== getImageSizes(image, imageSizes)?.length && <PanelRow>
			<Label className=''>{__('Select Size:', 'bplugins')}</Label>
			<SelectControl value={value?.url} onChange={val => setValue('url', val)} options={getImageSizes(image, imageSizes)} />
		</PanelRow>}
	</div>
});


export const ImageEditControl = props => {
	const { label = __('Edit Image:', 'bplugins'), value = {}, onChange } = props;

	const onImageSelect = ({ id, url, alt, title }) => onChange({ ...value, id, url, alt, title });

	return value?.url && <ToolbarGroup className='bPlToolbar'>
		<MediaUploadCheck>
			<MediaUpload allowedTypes={['image']} value={value?.id} onSelect={onImageSelect} render={({ open }) => <ToolbarButton label={label} icon='format-image' onClick={open} />} />
		</MediaUploadCheck>
	</ToolbarGroup>
};


export const ImagePlaceholder = withNotices(props => {
	const { label = __(' Image:', 'bplugins'), icon = 'format-image', value = {}, onChange, noticeOperations, noticeUI } = props;

	const onImageSelect = ({ id, url, alt, title }) => onChange({ ...value, id, url, alt, title });

	return <MediaPlaceholder labels={{ title: label }} icon={icon} allowedTypes={['image']} accept='image/*' onSelect={onImageSelect} onSelectURL={val => onChange({ ...value, id: null, url: val, alt: '', title: '' })} onError={val => noticeOperations.createErrorNotice(val)} notices={noticeUI} />
});