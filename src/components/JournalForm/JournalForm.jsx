import { useState } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';

function JournalForm({ onSubmit }) {
	const [formValidState, setFormValidState] = useState({
		title: true,
		text: true,
		date: true
	});
	const addJournalItem = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const formProps = Object.fromEntries(formData);
		let isValidForm = true;

		if (!formProps.title?.trim().length) {
			setFormValidState((state) => ({ ...state, title: false }));
			isValidForm = false;
		} else {
			setFormValidState((state) => ({ ...state, title: true }));
			isValidForm = true;
		}

		if (!formProps.text?.trim().length) {
			setFormValidState((state) => ({ ...state, text: false }));
			isValidForm = false;
		} else {
			setFormValidState((state) => ({ ...state, text: true }));
			isValidForm = true;
		}

		if (!formProps.date) {
			setFormValidState((state) => ({ ...state, date: false }));
			isValidForm = false;
		} else {
			setFormValidState((state) => ({ ...state, date: true }));
			isValidForm = true;
		}

		if(!isValidForm) {
			return;
		}
		onSubmit(formProps);
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<input type="text" name="title" className={`${styles.input} ${formValidState.title ? '' : styles.invalid}`} />
			<input type="date" name="date" className={`${styles.input}  ${formValidState.date ? '' :  styles.invalid}`} />
			<input type="text" name="tag" />
			<textarea name="text" cols="30" rows="10" className={`${styles.input}  ${formValidState.text ? '' :  styles.invalid}`}></textarea>
			<Button text="Сохранить" />
		</form>
	);
}

export default JournalForm;