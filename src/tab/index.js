import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import metadata from '../../tab/block.json';
import Edit from './Edit';

registerBlockType(metadata, {
	edit: Edit,

	save: () => <InnerBlocks.Content />
});