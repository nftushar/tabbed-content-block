import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, } from '@wordpress/components';
import { Label, IconControl } from '../Components'


const Settings = ({ attributes, setAttributes }) => {
	const { title, iconClass } = attributes;


	return <InspectorControls>
		<PanelBody className='bPlPanelBody' title={__('Tabbed Content', 'stepped-content')}>
			<Label className='mb5'>{__('Title:', 'tcb')}</Label>
			<TextControl value={title} onChange={val => setAttributes({ title: val })} />
			<IconControl className='mt20' value={{ class: iconClass }} onChange={val => setAttributes({ iconClass: val?.class })} isSize={true} isColor={true} />
		</PanelBody>
	</InspectorControls>;
};
export default Settings;