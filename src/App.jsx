import Header from './components/Header/Header';
import Body from './layouts/Body/Body';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import JournalList from './components/JournalList/JournalList';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalStorage } from './hooks/use-localstorage.hook';
import './App.css';
import { UserContext } from './context/user.context';
import { useState } from 'react';

function mapItems(items) {
	if (!items) {
		return [];
	}

	return items.map((i) => ({ ...i, date: new Date(i.date) }));
}

function App() {
	const [items, setItems] = useLocalStorage('data');
	const [userId, setUserId] = useState(1);

	const addPost = (post) => {
		setItems([
			...mapItems(items),
			{
				text: post.text,
				title: post.title,
				date: new Date(post.date),
				id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1
			}
		]);
	};

	return (
		<UserContext.Provider value={{ userId, setUserId }}>
			<div className="app">
				<LeftPanel>
					<Header />
					<JournalAddButton />
					<JournalList items={mapItems(items)} />
				</LeftPanel>
				<Body>
					<JournalForm onSubmit={addPost} />
				</Body>
			</div>
		</UserContext.Provider>
	);
}

export default App;
