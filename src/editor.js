import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import './tab/index';

import metadata from '../block.json';
import Edit from './Edit';
import './editor.scss';

registerBlockType(metadata.name, {
	edit: Edit,

	save: () => <InnerBlocks.Content />
})
