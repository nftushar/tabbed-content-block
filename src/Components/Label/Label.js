const Label = props => {
	const { className = 'mt20 mb5', htmlFor, children } = props;

	return <label className={`bPlLabel ${className}`} htmlFor={htmlFor}>{children}</label>
};
export default Label;