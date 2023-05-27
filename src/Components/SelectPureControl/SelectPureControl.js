/**
 * @props className (optional): 'mt20' (String)
 * @props value: selectedOptions (Array)
 * @props onChange: (Function)
 * @props defaults (optional): { width, height, style, color } (Array)
 * @return Separator Properties (Object)
 */

import { useEffect, useRef } from '@wordpress/element';
// import { __ } from '@wordpress/i18n';

import './SelectPureControl.scss';

const SelectPureControl = props => {
	const { className = '', value, onChange, options = [], SelectPure } = props;

	const selectPureEl = useRef(null);

	useEffect(() => {
		if (selectPureEl.current) {
			selectPureEl.current.innerHTML = '';
			new SelectPure(selectPureEl.current, {
				value,
				onChange: val => onChange(val),
				options,
				multiple: true,
				autocomplete: true,
				icon: 'closeIcon',
				classNames: {
					select: 'bplSelectPure',
					multiselect: 'selectMultiple',
					label: 'selectLabel',
					selectedLabel: 'selectSelectedLabel',
					dropdown: 'selectOptions',
					dropdownShown: 'selectOptionsOpened',
					autocompleteInput: 'selectAutocomplete',
					option: 'selectOption',
					selectedOption: 'selectOptionSelected',
					optionDisabled: 'selectOptionDisabled',
					optionHidden: 'selectOptionHidden',
					placeholder: 'selectPlaceholder',
					placeholderHidden: 'selectPlaceholderHidden'
				}
			});
		}
	}, [selectPureEl]);

	return <div className={className} ref={selectPureEl}></div>;
};
export default SelectPureControl;