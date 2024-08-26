import { useContext, useEffect, useReducer, useRef } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';

function JournalForm({ onSubmit, selectedPost, deletePost }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();
	const { userId } = useContext(UserContext);

	const focusError = (isValid) => {
		switch (true) {
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
			dispatchForm({ type: 'SET_VALUE', payload: { userId } });
		}
	}, [isFormReadyToSubmit, values, onSubmit, userId]);

	useEffect(() => {
		dispatchForm({ type: 'SET_VALUE', payload: { userId } });
	}, [userId]);

	const addJournalItem = (event) => {
		event.preventDefault();
		dispatchForm({ type: 'SUBMIT' });
	};

	const addValue = (event) => {
		const { name, value } = event.target;
		dispatchForm({ type: 'SET_VALUE', payload: { [name]: value } });
	};

	const onDeletePost = () => {
		deletePost(selectedPost.id);
		dispatchForm({type: 'CLEAR'});
		dispatchForm({ type: 'SET_VALUE', payload: { userId } });
	};

	useEffect(() => {
		if(!selectedPost) {
			dispatchForm({type: 'CLEAR'});
			dispatchForm({ type: 'SET_VALUE', payload: { userId } });
		}
		dispatchForm({ type: 'SET_VALUE', payload: { ...selectedPost } });
	}, [selectedPost]);

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div className={styles.titleInner}>
				<Input
					onChange={addValue}
					ref={titleRef}
					type="text"
					name="title"
					value={values.title}
					isValid={isValid.title}
					appearence="title"
				/>
				{selectedPost?.id && <Button type="button" className={styles.deleteButton} onClick={onDeletePost}>
					<img src="/archive.svg" alt="Кнопка удаления" />
				</Button>}
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
				value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''}
				isValid={isValid.date}
				appearence="date"
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
				appearence="tag"
			/>
			<textarea
				onChange={addValue}
				ref={textRef}
				name="text"
				cols="30"
				rows="10"
				value={values.text}
				className={cn(styles.input, styles.text, {
					[styles.invalid]: !isValid.text
				})}
			></textarea>
			<div className={styles.innerButton}>
				<Button type="submit" className={styles.accent}>Сохранить</Button>
			</div>
		</form>
	);
}

export default JournalForm;
