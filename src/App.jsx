import Header from './components/Header/Header';
import Body from './layouts/Body/Body';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import JournalList from './components/JournalList/JournalList';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalStorage } from './hooks/use-localstorage.hook';
import { UserContextProvider } from './context/user.context.jsx';
import { useState } from 'react';
import './App.css';

function mapItems(items) {
	if (!items) {
		return [];
	}
	return items.map((i) => ({ ...i, date: new Date(i.date) }));
}

function App() {
	const [items, setItems] = useLocalStorage('data');
	const [selectedPost, setSelectedPost] = useState(null);

	const addPost = (post) => {
		if (!post.id) {
			setItems([
				...mapItems(items),
				{
					...post,
					date: new Date(post.date),
					id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1
				}
			]);
		} else {
			setItems([...mapItems(items).map((i) => {
				if (i.id === post.id) {
					return {...post};
				} 
				return i;
			})]);
		}
	};

	const deletePost = (post) => {
		setItems([(items).filter((i) => i.id !== post.id)]);
	};

	return (
		<UserContextProvider>
			<div className="app">
				<LeftPanel>
					<Header />
					<JournalAddButton clearForm={() => setSelectedPost(null)} />
					<JournalList items={mapItems(items)} setSelectedPost={setSelectedPost} />
				</LeftPanel>
				<Body>
					<JournalForm onSubmit={addPost} selectedPost={selectedPost} deletePost={deletePost} />
				</Body>
			</div>
		</UserContextProvider>
	);
}

export default App;
