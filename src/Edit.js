import { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n'
import { withSelect } from '@wordpress/data';
import { InnerBlocks, Inserter, RichText } from '@wordpress/block-editor';
import './editor.scss';
import { tabInit, getBoxValue } from './utils/function';
import { IconButton } from '@wordpress/components';

import { getBackgroundCSS } from '../../Components/Helper/getCSS';
import Settings from './Settings';


const INNER_BLOCKS_TEMPLATE = [
	['tcb/tab', { title: 'HTML5 Audio Player', mediaType: 'icon', iconClass: 'fab fa-html5' }],
	['tcb/tab', { title: 'HTML5 Video Player', mediaType: 'icon', iconClass: 'fab fa-html5' }],
	['tcb/tab', { title: 'HTML5 Video Player', mediaType: 'icon', iconClass: 'fab fa-html5' }]
];


const Edit = props => {
	const { attributes, setAttributes, clientId, innerBlocks } = props;
	const { tabs, ContentBackgroundColor, BackgroundColor, HoverBackgroundColor, iconColor, icon, DletBtnColor, padding } = attributes;
	const [firstClientId, setFirstClientId] = useState(null)
	console.log(icon);
	function updateTab(index, property, value) {
		const newTabs = [...tabs];
		newTabs[index][property] = value;
		setAttributes({ tabs: newTabs });
	}

	useEffect(() => { clientId && setAttributes({ cId: clientId.substring(0, 10) }); }, [clientId]); // Set & Update clientId to cId

	useEffect(() => {
		const newTabs = innerBlocks?.map(({ clientId, attributes: { title, mediaType, iconClass } }, index) => {
			if(index === 0){
				setFirstClientId(clientId)
			}
			return { clientId, title, mediaType, iconClass };
		});

		setAttributes({ tabs: newTabs });
	}, [innerBlocks]);

	useEffect(() => {
		const listEls = document.querySelectorAll(`#tcbTabbedContent-${clientId} .tabMenu > li`);

		listEls[0] && tabInit(listEls[0], clientId);
	}, [])

	useEffect(() => {
		tabInit(document.querySelector(`#tcbTabbedContent-${clientId} .tabMenu > li`), clientId)
	}, [firstClientId])

	function tabDelete(clientId) {
		wp.data.dispatch('core/editor').removeBlock(clientId);
	}

	return <div id={`wp-block-tcb-tabs-${clientId}`} className='wp-block-tcb-tabs'>

		<style>
			{`
						.wp-block-tcb-tabs .tabMenu li .fa-solid.fa-xmark{
							color: ${DletBtnColor}
						}
						.wp-block-tcb-tabs .tabMenu li i{
							color: ${icon}
						}
						#wp-block-tcb-tabs-${clientId} .tabMenu {
						 padding: ${getBoxValue(padding)}
						}
						#tcb-innerBlock-${clientId}{
							${getBackgroundCSS(ContentBackgroundColor)}
						}
						#wp-block-tcb-tabs-${clientId} .tcbTabbedContent .tabMenu li{
							${getBackgroundCSS(BackgroundColor)}
						}
						#wp-block-tcb-tabs-${clientId} .tcbTabbedContent .tabMenu li.active{
							${getBackgroundCSS(HoverBackgroundColor)} 
						}
	   `}
		</style>

		<Settings attributes={attributes} setAttributes={setAttributes} ></Settings>
		<div id={`tcbTabbedContent-${clientId}`} className="tcbTabbedContent">
			<ul className="tabMenu">
				{tabs.map((item, index) => {
					const { title, iconClass } = item;
					const onListClick = e => {
						e.preventDefault();
						tabInit(e.currentTarget, clientId);
					}

					return <li key={index} onClick={onListClick} className={index == 0 ? "active" : " "}>
						<i onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();

							tabDelete(item.clientId);

							const liEl = e.target.parentElement;
							const isActive = liEl.classList.contains('active');

							if(isActive){
								const nextEl = liEl.nextSibling;
								const prevEl = liEl.previousSibling;

								if(prevEl){
									setTimeout(() => {
										// console.log('prev',prevEl)
										tabInit(prevEl, clientId);
									}, 0);
								}else if(nextEl) {
									setTimeout(() => {
										// console.log('next',nextEl)
										tabInit(nextEl, clientId);
									}, 0);
								}
							}
						}} className="fa-solid fa-xmark" ></i>  
						{iconClass ? <i className={iconClass }></i> : " "}
						<span className="tabLabel">

						<RichText
									tagName="p"
									value={title}
									onChange={(content) => updateTab(index, "title", content)}
									placeholder={__("Enter Title", 'tcb-block-title')}
									inlineToolbar
									allowedFormats={["core/bold", "core/italic"]}
								/>
						</span>
					</li> 
				})} 
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
export default withSelect((select, { clientId }) => {
	const { getBlocks } = select('core/block-editor');

	return {
		innerBlocks: getBlocks(clientId)
	};
})(Edit);