import { forwardRef } from 'react';
import styles from './Input.module.css';
import cn from 'classnames';

const Input = forwardRef(function Input({ className, isValid = true, appearence, ...props }, ref) {
	return (
		<input
			ref={ref}
			{...props}
			className={cn(className, styles.input, {
				[styles.invalid]: !isValid,
				[styles.title]: appearence === 'title',
				[styles.date]: appearence === 'date',
				[styles.tag]: appearence === 'tag'
			})}
		/>
	);
});

export default Input;
