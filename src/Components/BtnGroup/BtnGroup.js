/**
 * @props className (optional): 'mt20' (String)
 * @props value (String)
 * @props onChange: (Function)
 * @return Value (String)
 */

import { Button, ButtonGroup, Tooltip } from '@wordpress/components';

const BtnGroup = props => {
	const { className, value, onChange, options, isIcon = false, isTextIcon = false, size } = props;

	return <ButtonGroup className={`bPlBtnGroup ${className || null}`}>
		{Object.values(options).map(obj => <Tooltip key={obj.value} text={obj.label} position='top'>
			<Button
				icon={isIcon ? obj?.icon : null}
				isPrimary={value === obj.value}
				aria-pressed={value === obj.value}
				isSmall={size === 'small' ? true : false}
				isMedium={size === 'small' ? false : true}
				onClick={() => onChange(obj.value, obj.def && obj.def)}
			>{isTextIcon ? obj.icon : isIcon ? '' : obj.label}</Button>
		</Tooltip>)}
	</ButtonGroup>
};
export default BtnGroup;