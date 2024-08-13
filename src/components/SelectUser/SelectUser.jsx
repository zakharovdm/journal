import { useContext } from 'react';
import { UserContext } from '../../context/user.context';

function SelectUser() {
	const { userId } = useContext(UserContext);
	return (
		<select name="user" id="user" value={userId}>
			<option value="1">Антон</option>
			<option value="2">Вася</option>
		</select>
	);
}

export default SelectUser;
