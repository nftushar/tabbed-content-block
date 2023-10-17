import { useEffect } from 'react';
import { InnerBlocks } from '@wordpress/block-editor';

import Settings from './Settings';

////////  Tap Manue  ///////////////////////

const Edit = (props) => {
	const { attributes, setAttributes, clientId } = props;

	useEffect(() => {
		clientId && setAttributes({ cId: clientId.substring(0, 10) }); // Set & Update clientId to cId
	}, [clientId]);

	return <>
		<Settings attributes={attributes} setAttributes={setAttributes} />
		<div className='wp-block-tcb-tab' id={`tcbTabContentTab-${clientId}`}>
			<InnerBlocks
				template={[
					[
						'core/paragraph',
						{
							content: `AA In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available 
								In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available
								In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available`,
							style: {
								typography: { fontSize: '15px' },
							},
						},
					],
				]}
			/>
		</div>
	</>
};

export default Edit;
