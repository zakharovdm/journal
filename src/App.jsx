import { useState } from 'react';
import Header from './components/Header/Header';
import Body from './layouts/Body/Body';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import JournalList from './components/JournalList/JournalList';
import JournalForm from './components/JournalForm/JournalForm';

import './App.css';

const INITIAL_DATA = [
	// {
	// 	id: 1,
	// 	title: 'Подготовка к обновлению курсов',
	// 	text: 'Горные походы открывают удивительные природные ландшафты',
	// 	date: new Date()
	// },
	// {
	// 	id: 2,
	// 	title: 'Поход в годы',
	// 	text: 'Думал, что очень много времени',
	// 	date: new Date()
	// }
];
function App() {
	const [posts, setPosts] = useState(INITIAL_DATA);

	const addPost = (post) => {
		setPosts((oldPosts) => [
			...oldPosts,
			{
				text: post.text,
				title: post.title,
				date: new Date(post.date),
				id: oldPosts.length > 0 ? Math.max(...oldPosts.map((i) => i.id)) + 1 : 1
			}
		]);
	};

	return (
		<div className="app">
			<LeftPanel>
				<Header />
				<JournalAddButton />
				<JournalList items={posts} />
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addPost} />
			</Body>
		</div>
	);
}

export default App;
