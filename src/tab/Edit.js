import { useEffect } from 'react';
import { InnerBlocks } from '@wordpress/block-editor';
import { getBoxValue } from "../utils/function"


import Settings from './Settings';

////////  Tap Manue  ///////////////////////

const Edit = props => {
	const { attributes, setAttributes, clientId } = props;

	const { padding } = attributes;


	useEffect(() => { clientId && setAttributes({ cId: clientId.substring(0, 10) }); }, [clientId]); // Set & Update clientId to cId

	return <>

		<Settings attributes={attributes} setAttributes={setAttributes} />

		<div className='wp-block-tcb-tab' id={`tcbTabbedContentTab-${clientId}`}>
			<InnerBlocks template={[
				['core/heading', {
					content: `The dummy content for Tabx`,
					style: {
						typography: { fontSize: '24px' }
					}
				}]
			]} />
		</div>
	</>;
};
export default Edit;