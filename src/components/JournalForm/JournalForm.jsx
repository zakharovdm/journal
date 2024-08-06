import { useEffect, useReducer } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from './JournalForm.state';

function JournalForm({ onSubmit }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} = formState;

	useEffect(() => {
		let timerId;
		if (!isValid.date || !isValid.text || !isValid.title) {
			timerId = setTimeout(() => {
				dispatchForm({type: 'RESET_VALIDITY'});
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values);
		}
	}, [isFormReadyToSubmit]);

	const addJournalItem = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const formProps = Object.fromEntries(formData);
		dispatchForm({type: 'SUBMIT', payload: formProps});
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div>
				<input
					type="text"
					name="title"
					className={cn(styles.input, styles.title, {
						[styles.invalid]: !isValid.title
					})}
				/>
			</div>
			<label className={cn(styles.label, styles.labelDate)} htmlFor="date">
        Дата
			</label>
			<input
				type="date"
				name="date"
				id="date"
				className={cn(styles.input, styles.date, {
					[styles.invalid]: !isValid.date
				})}
			/>
			<label className={cn(styles.label, styles.labelTag)} htmlFor="tag">
        Метки
			</label>
			<input
				type="text"
				name="tag"
				id="tag"
				className={cn(styles.input, styles.tag)}
			/>
			<textarea
				name="text"
				cols="30"
				rows="10"
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
