import { useEffect, useReducer, useRef } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from './JournalForm.state';
import Input from '../Input/Input';

function JournalForm({ onSubmit }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();

	const focusError = (isValid) => {
		switch(true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.text:
			textRef.current.focus();
			break;
		}
	};
	
	useEffect(() => {
		let timerId;
		if (!isValid.date || !isValid.text || !isValid.title) {
			focusError(isValid);
			timerId = setTimeout(() => {
				dispatchForm({ type: 'RESET_VALIDITY' });
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values);
			dispatchForm({ type: 'CLEAR' });
		}
	}, [isFormReadyToSubmit, values, onSubmit]);

	const addJournalItem = (event) => {
		event.preventDefault();
		dispatchForm({ type: 'SUBMIT'});
	};

	const addValue = (event) => {
		const { name, value } = event.target;
		dispatchForm({ type: 'UPDATE_VALUE', payload: { name, value } });
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div>
				<Input
					onChange={addValue}
					ref={titleRef}
					type="text"
					name="title"
					value={values.title}
					isValid={isValid.title}
					appearence='title'
				/>
			</div>
			<label className={cn(styles.label, styles.labelDate)} htmlFor="date">
        Дата
			</label>
			<Input
				onChange={addValue}
				ref={dateRef}
				type="date"
				name="date"
				id="date"
				value={values.date}
				isValid={isValid.date}
				appearence='date'
			/>
			<label className={cn(styles.label, styles.labelTag)} htmlFor="tag">
        Метки
			</label>
			<Input
				onChange={addValue}
				type="text"
				name="tag"
				id="tag"
				value={values.tag}
				appearence='tag'
			/>
			<textarea
				onChange={addValue}
				ref = {textRef}
				name="text"
				cols="30"
				rows="10"
				value={values.text}
				className={cn(styles.input, styles.text, {
					[styles.invalid]: !isValid.text
				})}
			></textarea>
			<div className={styles.innerButton}>
				<Button text="Сохранить" />
			</div>
		</form>
	);
}

export default JournalForm;
