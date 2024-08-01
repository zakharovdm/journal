import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Body from './layouts/Body/Body';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import JournalList from './components/JournalList/JournalList';
import JournalForm from './components/JournalForm/JournalForm';
import './App.css';

function App() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('data'));
		if (data) {
			setPosts(
				data.map((item) => ({
					...item,
					date: new Date(item.date)
				}))
			);
		}
	} ,[]);

	useEffect(() => {
		if (posts.length) {
			localStorage.setItem('data', JSON.stringify(posts));
		}
	}, [posts]);

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
