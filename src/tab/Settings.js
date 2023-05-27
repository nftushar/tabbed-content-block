import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TextControl, } from '@wordpress/components';
import { Label, BtnGroup, IconControl, InlineMediaUpload, Background } from '../Components'
// import { Background } from '../Components'

import { mediaTypes } from '../utils/options';

const Settings = ({ attributes, setAttributes }) => {
	const { title, mediaType, iconClass, imgURL, iconColor, backgroundColor } = attributes;


	return <InspectorControls>
		<PanelBody className='bPlPanelBody' title={__('Tcb', 'stepped-content')}>
			<Label className='mb5'>{__('Title:', 'tcb')}</Label>
			<TextControl value={title} onChange={val => setAttributes({ title: val })} />



			{/* <PanelRow className='mt20'>
				<Label className=''>{__('Media Type:', 'tcb')}</Label>
				<BtnGroup value={mediaType} onChange={val => setAttributes({ mediaType: val })} isTextIcon={true} options={mediaTypes} />
			</PanelRow> */}

			{/* {'icon' === mediaType ? <IconControl className='mt20' value={{ class: iconClass }} onChange={val => setAttributes({ iconClass: val?.class })} isSize={false} isColor={false} /> : <>
				<Label>{__('Image:', 'tcb')}</Label>
				<InlineMediaUpload value={imgURL} onChange={val => setAttributes({ imgURL: val })} placeholder={__('Enter Image URL', 'tcb')} />
			</>} */}
			<IconControl className='mt20' value={{ class: iconClass }} onChange={val => setAttributes({ iconClass: val?.class })} isSize={false} isColor={false} />

		</PanelBody>
	</InspectorControls>;
};
export default Settings;