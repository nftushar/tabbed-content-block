import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { BColor, Background } from './Components'



///////////////// Tap Manue ///////////////////////////////

const Settings = ({ attributes, setAttributes }) => {
	
	const {DletBtnColor,iconColor, iconSize, padding, ContentBackgroundColor, BackgroundColor, HoverBackgroundColor, } = attributes;

	return <InspectorControls>
		<PanelBody className='bPlPanelBody' title={__('Tabbed Content', 'stepped-content')}>

		<PanelRow className="mt20">
				<BoxControl
					label={__("Top Menu Paddign", "tcb")}
					values={padding}
					resetValues={{
						"top": "0px",
						"right": "0x",
						"bottom": "0px",
						"left": "0px"
					}}
					onChange={(value) => setAttributes({ padding: value })} />
		</PanelRow>

		<BColor
				label={__("Delete Button Color", "tcb")}
				value={DletBtnColor}
				onChange={(val) =>
					setAttributes({ DletBtnColor: val })
				}
			/>

		<BColor
				label={__("Icon Color", "tcb")}
				value={iconColor}
				onChange={(val) =>
					setAttributes({ iconColor: val })
				}
			/>

			<Background
				label={__("Tab Bg Color", "tcb")}
				value={BackgroundColor}
				onChange={(val) =>
					setAttributes({ BackgroundColor: val })
				}
			/>

			<Background
				label={__("Tab Active Bg Color", "tcb")}
				value={HoverBackgroundColor}
				onChange={(val) =>
					setAttributes({ HoverBackgroundColor: val })
				}
			/>
			<Background
				label={__("Content Bg Color", "tcb")}
				value={ContentBackgroundColor}
				onChange={(val) =>
					setAttributes({ ContentBackgroundColor: val })
				}
			/>


		</PanelBody>
	</InspectorControls>;
};
export default Settings;