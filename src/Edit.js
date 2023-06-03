import { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n'
import { withDispatch, withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose'
import { BlockControls, InnerBlocks, Inserter, RichText } from '@wordpress/block-editor';
import './editor.scss';
import { tabInit, getBoxValue } from './utils/function';
import { IconButton, ToolbarItem, Toolbar, Button, Dropdown } from '@wordpress/components';
import { getBackgroundCSS, getColorsCSS, getTypoCSS } from './Components/utils/getCSS';
import Settings from './Settings';
import { IconControl } from './Components';



const INNER_BLOCKS_TEMPLATE = [
	['tcb/tab', { title: 'HTML5 Audio Player', mediaType: 'icon', iconClass: 'fab fa-html5' }],
	['tcb/tab', { title: 'HTML5 Video Player', mediaType: 'icon', iconClass: 'fab fa-html5' }],
	['tcb/tab', { title: 'HTML5 Video Player', mediaType: 'icon', iconClass: 'fab fa-html5' }]
];


const Edit = props => {
	const { attributes, setAttributes, clientId, innerBlocks, getBlock, getBlockAttributes, updateBlockAttributes, removeBlock } = props;
	const { tabColors, tabActiveColors, icon, tabsPadding, titleTypo, tabs, contentBG } = attributes;

	// {console.log(icon)}

	const [firstClientId, setFirstClientId] = useState(null)
	const [isOpen, setIsOpen] = useState(false);
	const [activeClientId, setActiveClientId] = useState(false);
	const [titleValue, setTitleValue] = useState({});
	const [iconValue, setIconValue] = useState({});
	const [tabAttribute, setTabAttribute] = useState({})


	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};
	// console.log(icon);
	// function updateTab(index, property, value) {
	// 	const newTabs = [...tabs];
	// 	newTabs[index][property] = value;
	// 	setAttributes({ tabs: newTabs });
	// }

	useEffect(() => { clientId && setAttributes({ cId: clientId.substring(0, 10) }); }, [clientId]); // Set & Update clientId to cId

	useEffect(() => {
		const newTabs = innerBlocks?.map(({ clientId, attributes: { title, mediaType, icon } }, index) => {
			if (index === 0) {
				setFirstClientId(clientId)
			}
			return { clientId, title, mediaType, icon };
		});

		setAttributes({ tabs: newTabs });
	}, [innerBlocks]);

	useEffect(() => {
		const listEls = document.querySelectorAll(`#tcbTabbedContent-${clientId} .tabMenu > li`);

		listEls[0] && tabInit(listEls[0], clientId);
	}, [])

	useEffect(() => {
		tabInit(document.querySelector(`#tcbTabbedContent-${clientId} .tabMenu > li`), clientId)
	}, [firstClientId]);

	useEffect(() => {
		const block = getBlock(activeClientId);
		setTabAttribute(block?.attributes)
		setTitleValue(block?.attributes?.title || {})
		setIconValue(block?.attributes?.icon || {})
	}, [activeClientId])


	useEffect(() => {
		const newAttributes = { ...tabAttribute };
		newAttributes.icon = iconValue;
		updateBlockAttributes(activeClientId, newAttributes)
	}, [iconValue])

	useEffect(() => {
		const newAttributes = { ...tabAttribute };
		newAttributes.title = titleValue;
		updateBlockAttributes(activeClientId, newAttributes)
	}, [titleValue])
	// console.log(iconColor);

	return <div id={`wp-block-tcb-tabs-${clientId}`} className='wp-block-tcb-tabs'>
		<style>
			{`

			${getTypoCSS(``, titleTypo)?.googleFontLink}
			${getTypoCSS(`#wp-block-tcb-tabs-${clientId} li .tabLabel`, titleTypo)?.styles}

		             	#wp-block-tcb-tabs-${clientId} .tcbTabbedContent li.tab-item-icon .menuIcon i {
							font-size:${icon.size};
							color:${icon.color}
						}
						#wp-block-tcb-tabs-${clientId} .tcbTabbedContent li.active .menuIcon i {
							color:${icon.activeColor}
							
						}
						.editor-styles-wrapper .block-editor-block-list__layout.is-root-container p{

						}
						#wp-block-tcb-tabs-${clientId} .tcbTabbedContent .tabMenu li{
							${getColorsCSS(tabColors)}
						}

						#wp-block-tcb-tabs-${clientId} .tcbTabbedContent .tabMenu li.active{
							${getColorsCSS(tabActiveColors)}
						}

						#wp-block-tcb-tabs-${clientId} .tabMenu {
						 padding: ${getBoxValue(tabsPadding)}
						}
						#tcb-innerBlock-${clientId}{
							${getBackgroundCSS(contentBG)}
						}
	        `}


		</style>
		<BlockControls>
			<Toolbar label="Options">
				<Dropdown
					popoverProps={{ placement: 'bottom-start' }}
					contentClassName="tcbTabContentPopover"
					renderToggle={({ onToggle }) => {
						return <ToolbarItem icon="edit" as={Button} onClick={onToggle}></ToolbarItem>
					}}
					renderContent={() => {
						return <IconControl className='mt20' value={iconValue} onChange={val => {
							setIconValue(val)
						}} isSize={false} />
					}}
					isOpen={isOpen}
					onClose={toggleDropdown}
				/>
			</Toolbar>
		</BlockControls>

		<Settings attributes={attributes} setAttributes={setAttributes}></Settings>

		<div id={`tcbTabbedContent-${clientId}`} className="tcbTabbedContent">
			<ul className="tabMenu">
				{tabs.map((tab, index) => <Tab key={index} getBlockAttributes={getBlockAttributes} updateBlockAttributes={updateBlockAttributes} removeBlock={removeBlock} clientId={clientId} setActiveClientId={setActiveClientId} tab={tab} index={index} />)}

				{/* {tabs.map((item, index) => {
					const { title, icon } = item;
					const onListClick = e => {
						e.preventDefault();
						tabInit(e.currentTarget, clientId);
						setActiveClientId(item.clientId);
					}

					return <li key={index} onClick={onListClick} className={`tab-item${item.clientId} ${index == 0 ? "active" : " "}`}>
						<i onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();

							tabDelete(item.clientId);

							const liEl = e.target.parentElement;
							const isActive = liEl.classList.contains('active');

							if (isActive) {
								const nextEl = liEl.nextSibling;
								const prevEl = liEl.previousSibling;

								if (prevEl) {
									setTimeout(() => {
										tabInit(prevEl, clientId);
									}, 0);
								} else if (nextEl) {
									setTimeout(() => {
										tabInit(nextEl, clientId);
									}, 0);
								}
							}
						}} className="fa-solid fa-xmark" ></i>
						{icon?.class ? <i className={icon?.class}></i> : " "}
						<span className="tabLabel">

							<RichText
								tagName="p"
								value={titleValue}
								onChange={(content) => setTitleValue(content)}
								placeholder={__("Enter Title", 'tcb-block-title')}
								inlineToolbar
								allowedFormats={["core/bold", "core/italic"]}
							/>
						</span>
					</li>
				})} */}
			</ul>

			<div className='tcb-innerBlock' id={`tcb-innerBlock-${clientId}`} >

				<InnerBlocks allowedBlocks={['b-temp/tab']} template={INNER_BLOCKS_TEMPLATE} renderAppender={() =>
					<Inserter rootClientId={clientId}
						isAppender
						renderToggle={({ onToggle, disabled }) => <IconButton
							className='bTempAddTab'
							onClick={onToggle}
							disabled={disabled}
							label={__('Add New Tab', 'b-temp')}
							icon='plus-alt' >
							{__('Add New Tab', 'b-temp')}  </IconButton>}
					/>
				} />
			</div>
		</div>
	</div>;
};

const Tab = ({ getBlockAttributes, updateBlockAttributes, removeBlock, clientId, setActiveClientId, tab, index }) => {
	const { clientId: childId, title, icon } = tab;

	const [childAttr, setChildAttr] = useState({});
	const [titleValue, setTitleValue] = useState(title);

	useEffect(() => {
		setChildAttr(getBlockAttributes(childId));
	}, [childId]);

	useEffect(() => {
		const newAttr = { ...childAttr };
		newAttr.title = titleValue;
		updateBlockAttributes(childId, newAttr)
	}, [titleValue, childAttr]);

	const onListClick = e => {
		e.preventDefault();
		tabInit(e.currentTarget, clientId);
		setActiveClientId(childId);
	}

	return <li key={index} onClick={onListClick} className={`tab-item-icon tab-item${childId} ${index == 0 ? "active" : " "}`}>
		<i onClick={(e) => {
			e.preventDefault();
			e.stopPropagation();

			removeBlock(childId);

			const liEl = e.target.parentElement;
			const isActive = liEl.classList.contains('active');

			if (isActive) {
				const nextEl = liEl.nextSibling;
				const prevEl = liEl.previousSibling;

				if (prevEl) {
					setTimeout(() => {
						tabInit(prevEl, clientId);
					}, 0);
				} else if (nextEl) {
					setTimeout(() => {
						tabInit(nextEl, clientId);
					}, 0);
				}
			}
		}} className="fa-solid fa-xmark" ></i>

		{icon?.class ? <span className='menuIcon' > <i className={icon?.class}></i> </span> : ""}

		<span className="tabLabel">
			<RichText
				tagName="p"
				value={titleValue}
				onChange={(content) => setTitleValue(content)}
				placeholder={__("Enter Title", 'tcb-block-title')}
				inlineToolbar
				allowedFormats={["core/bold", "core/italic"]}
			/>
		</span>
	</li>
}


export default compose([
	withSelect((select, { clientId }) => {
		const { getBlocks, getBlock, getBlockAttributes } = select('core/block-editor');

		return {
			innerBlocks: getBlocks(clientId),
			getBlock,
			getBlockAttributes,
		};
	}),
	withDispatch(dispatch => {
		const { updateBlockAttributes } = dispatch('core/block-editor');
		const { removeBlock } = dispatch('core/editor');

		return { updateBlockAttributes, removeBlock }
	})
])(Edit)