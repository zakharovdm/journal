import { useEffect, useReducer } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from './JournalForm.state';

function JournalForm({ onSubmit }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;

	useEffect(() => {
		let timerId;
		if (!isValid.date || !isValid.text || !isValid.title) {
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
	}, [isFormReadyToSubmit]);

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
				<input
					onChange={addValue}
					type="text"
					name="title"
					value={values.title}
					className={cn(styles.input, styles.title, {
						[styles.invalid]: !isValid.title
					})}
				/>
			</div>
			<label className={cn(styles.label, styles.labelDate)} htmlFor="date">
        Дата
			</label>
			<input
				onChange={addValue}
				type="date"
				name="date"
				id="date"
				value={values.date}
				className={cn(styles.input, styles.date, {
					[styles.invalid]: !isValid.date
				})}
			/>
			<label className={cn(styles.label, styles.labelTag)} htmlFor="tag">
        Метки
			</label>
			<input
				onChange={addValue}
				type="text"
				name="tag"
				id="tag"
				value={values.tag}
				className={cn(styles.input, styles.tag)}
			/>
			<textarea
				onChange={addValue}
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
