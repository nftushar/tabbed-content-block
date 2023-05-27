import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelRow, TextControl, Button, Placeholder, ToolbarGroup, ToolbarButton } from '@wordpress/components';

import './MediaControl.scss';


export const InlineMediaUpload = props => {
	const { className, value, types = ['image'], onChange, placeholder = __('Enter URL', 'bplugins') } = props;

	return <PanelRow className={`${className} bplInlineMediaUpload`}>
		<TextControl value={value} onChange={val => onChange(val)} placeholder={placeholder} />

		<MediaUploadCheck>
			<MediaUpload
				allowedTypes={types}
				onSelect={val => onChange(val.url)}
				render={({ open }) => <Button className='button button-primary' onClick={open} icon={'upload'}></Button>}
			/>
		</MediaUploadCheck>
	</PanelRow>
}


export const InlineDetailMediaUpload = props => {
	const { className, value = {}, types = ['image'], onChange, placeholder = __('Enter URL', 'bplugins') } = props;

	return <PanelRow className={`${className} bplInlineMediaUpload`}>
		<TextControl value={value?.url} onChange={url => onChange({ id: null, url, alt: '', title: '' })} placeholder={placeholder} />

		<MediaUploadCheck>
			<MediaUpload
				allowedTypes={types}
				onSelect={({ id, url, alt, title }) => onChange({ id, url, alt, title })}
				render={({ open }) => <Button className='button button-primary' onClick={open} icon={'upload'}></Button>}
			/>
		</MediaUploadCheck>
	</PanelRow>
}


export const BplMediaPlaceholder = props => {
	const { onChange, icon = 'format-image', type = 'image', typeName = '', placeholder = __('Paste or type a video URL', 'bplugins') } = props;

	const [mediaSource, setMediaSource] = useState();

	return <Placeholder className='bplMediaPlaceholder' label={__(`Upload ${typeName || type}`, 'bplugins')}
		instructions={__(`Upload a ${typeName || type} or paste/write ${typeName || type} url to get started.`, 'bplugins')}
		icon={icon}>
		<MediaUploadCheck>
			<MediaUpload
				allowedTypes={[type]}
				onSelect={val => onChange(val)}
				render={({ open }) => <Button isPrimary onClick={open}> {__('Upload', 'bplugins')} </Button>}
			/>
		</MediaUploadCheck>

		<PanelRow className='bplUrlInput'>
			<h3> {__('Or', 'bplugins')} </h3>
			<input
				type='url'
				aria-label={__('URL', 'bplugins')}
				placeholder={placeholder}
				onChange={src => setMediaSource(src.target.value)}
				value={mediaSource}
			/>
			<Button label={__('Apply', 'bplugins')} type='submit' onClick={e => {
				e.preventDefault();
				onChange({ id: null, url: mediaSource, alt: '', title: '' });
				setMediaSource('');
			}} isPrimary>{__('Apply', 'bplugins')}</Button>
		</PanelRow>
	</Placeholder>
}


export const MediaEditControl = props => {
	const { label = __('Edit Image:', 'bplugins'), icon = 'format-image', types = ['image'], value = {}, onChange } = props;

	const onFileSelect = ({ id, url, alt, title }) => onChange({ id, url, alt, title });

	return value?.url && <ToolbarGroup className='bPlToolbar'>
		<MediaUploadCheck>
			<MediaUpload allowedTypes={types} value={value?.id} onSelect={onFileSelect} render={({ open }) => <ToolbarButton label={label} icon={icon} onClick={open} />} />
		</MediaUploadCheck>
	</ToolbarGroup>
};