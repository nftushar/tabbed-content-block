import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { BColor, Background,ColorsControl, Typography } from './Components'
import { produce } from 'immer';




///////////////// Tap Manue ///////////////////////////////

const Settings = ({ attributes, setAttributes }) => {

	const {tabColors, tabActiveColors, DletBtnColor, padding, ContentBackgroundColor, BackgroundColor, titleTypo, titleColor } = attributes;

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

			<Background
				label={__("Tab Bg Color", "tcb")}
				value={BackgroundColor}
				onChange={(val) =>
					setAttributes({ BackgroundColor: val })
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

		<PanelBody className="bPlPanelBody" title={__("Tab", "tcb")} initialOpen={false}>
			<ColorsControl value={tabColors} onChange={val => setAttributes({ tabColors: val })} defaults={{ color: '#333', bgType: 'gradient', gradient: 'linear-gradient(to right, #e7f5dd, #f1f9eb, #f8fff1, #e4eedc, #d5e3cb)' }} />
		</PanelBody>

		{/* tabActiveColors */}
		<PanelBody className="bPlPanelBody" title={__("Active Tab", "tcb")} initialOpen={false}>
			<ColorsControl value={tabActiveColors} onChange={val => setAttributes({ tabActiveColors: val })} defaults={{ color: '#333', bgType: 'gradient', gradient: 'linear-gradient(to right, #019447, #f1f9eb, #10d56d, #e4eedc, #dbeccd)' }} />
		</PanelBody>

		{/* start */}
		<PanelBody className="bPlPanelBody" title={__("Title", "tcb")} initialOpen={false}>
			<Typography
				label={__("Typography", "tcb")}
				value={titleTypo}
				onChange={(val) => setAttributes({ titleTypo: val })}
				produce = {produce}
			/>

			<BColor
				label={__("Color", "tcb")}
				value={titleColor}
				onChange={(val) =>
					setAttributes({ titleColor: val })
				}
			/>
		</PanelBody>
		{/* end  */}
	</InspectorControls>;
};
export default Settings;