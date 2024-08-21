import './Button.css';

function Button({children, className, ...props}) {
	const cl = `button ${className ? className : ''}`;

	return (
		<button {...props} className={cl}>{children}</button>
	);
}

export default Button;