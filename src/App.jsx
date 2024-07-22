import { useState } from 'react';
import Header from './components/Header/Header';
import Body from './layouts/Body/Body';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import JournalList from './components/JournalList/JournalList';
import JournalItem from './components/JournalItem/JournalItem';
import JournalForm from './components/JournalForm/JournalForm';
import CardButton from './components/CardButton/CardButton';
import './App.css';

const INITIAL_DATA = [
	{
		id: 1,
		title: 'Подготовка к обновлению курсов',
		text: 'Горные походы открывают удивительные природные ландшафты',
		date: new Date()
	},
	{
		id: 2,
		title: 'Поход в годы',
		text: 'Думал, что очень много времени',
		date: new Date()
	}
];
function App() {
	const [posts, setPosts] = useState(INITIAL_DATA);

	const addPost = (post) => {
		setPosts(oldPosts => [...oldPosts, {
			text: post.text,
			title: post.title,
			date: new Date(post.date),
			id: Math.max(...oldPosts.map(i => i.id)) + 1
		}]);
	};

	return (
		<div className="app">
			<LeftPanel>
				<Header />
				<JournalAddButton />
				<JournalList>
					{posts.map((el) => {
						return (
							<CardButton key={el.id}>
								<JournalItem
									title={el.title}
									text={el.text}
									date={el.date}
								/>
							</CardButton>
						);
					})}
				</JournalList>
			</LeftPanel>
			<Body>
				<JournalForm  onSubmit={addPost}/>
			</Body>
		</div>
	);
}

export default App;
