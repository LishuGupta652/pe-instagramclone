import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './components/Post'
import {db} from './firebase';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => (
        setPosts(snapshot.docs.map(doc => ({
            id: doc.id,
            post: doc.data()
        })))
    ))      
  }, [])

  return (
    <div className="app">
       {/* Header */}
        <div className="app__header">
            <img className="app__headerImage" src="http://2.bp.blogspot.com/-4pBaE9sDqjg/UYNzlT_tL9I/AAAAAAAAZck/PhzqPJx3le8/s1600/Instragram+logo.png" alt="logo" />
        </div>
       
        {posts.map(({id, post}) => (
        <Post key={id} photo={post.photo} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        )
        )}
    </div>
  );
}

export default App;
