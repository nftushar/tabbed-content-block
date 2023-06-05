import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, __experimentalUnitControl as UnitControl, __experimentalBoxControl as BoxControl } from '@wordpress/components';

import { BColor, Background, ColorsControl, Typography } from './Components'
import { produce } from 'immer';
import { emUnit, pxUnit } from './Components/utils/options';


const Settings = ({ attributes, setAttributes }) => {
	const { tabsPadding, tabColors, tabActiveColors, titleTypo, icon, contentBG } = attributes;
	const { size: iconSize, color, activeColor } = icon;

	return (
		<InspectorControls>
			{/* Tab/Menu Panel */}
			<PanelBody className='bPlPanelBody' title={__('Tab/Menu', 'stepped-content')}>
				<BoxControl
					label={__("Padding", "tcb")}
					values={tabsPadding}
					resetValues={{
						"top": "0px",
						"right": "0px",
						"bottom": "0px",
						"left": "0px"
					}}
					onChange={(value) => setAttributes({ tabsPadding: value })} />
			</PanelBody>

			{/* Tab Panel */}
			<PanelBody className="bPlPanelBody" title={__("Tab", "tcb")} initialOpen={false}>
				<ColorsControl label={__("Colors", "tcb")} value={tabColors} onChange={val => setAttributes({ tabColors: val })} defaults={{ color: '#333', bgType: 'gradient', gradient: 'linear-gradient(to right, #e7f5dd, #f1f9eb, #f8fff1, #e4eedc, #d5e3cb)' }} />

				<ColorsControl label={__("Active Colors", "tcb")} value={tabActiveColors} onChange={val => setAttributes({ tabActiveColors: val })} defaults={{ color: '#333', bgType: 'gradient', gradient: 'linear-gradient(to right, #019447, #f1f9eb, #10d56d, #e4eedc, #dbeccd)' }} />

				<Typography
					label={__("Title Typography", "tcb")}
					value={titleTypo}
					onChange={(val) => setAttributes({ titleTypo: val })}
					produce={produce}
				/>

				<UnitControl label={__("Icon Size", "tcb")} labelPosition='left' value={iconSize} onChange={val => setAttributes({ icon: { ...icon, size: val } })} units={[pxUnit(), emUnit()]} />

				<BColor label={__("Icon Color", "tcb")} value={color} onChange={val => setAttributes({ icon: { ...icon, color: val } })} />
				<BColor label={__("Icon Active Color", "tcb")} value={activeColor} onChange={val => setAttributes({ icon: { ...icon, activeColor: val } })} />
			</PanelBody>

			{/* Content Panel */}
			<PanelBody className='bPlPanelBody' title={__('Content', 'stepped-content')} initialOpen={false}>
				<Background
					label={__("Background", "tcb")}
					value={contentBG}
					onChange={(val) =>
						setAttributes({ contentBG: val })
					}
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Settings;
