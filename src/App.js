import React, {useState} from 'react';
import './App.css';
import Post from './components/Post'
function App() {
  const [posts, setPosts] = useState([
      {username: "Lishu Gupta", caption: "Ambivert", imageUrl: "https://unsplash.it/200/200", photo:"https://avatars.dicebear.com/api/human/2.svg"},
      {username: "Inward Looking", caption: "Tranquility", imageUrl: "https://unsplash.it/300/300", photo:"https://avatars.dicebear.com/api/human/3.svg"},
      {username: "RandomUser", caption: "Hail IN the air", imageUrl: "https://unsplash.it/320/300", photo:"https://avatars.dicebear.com/api/human/322.svg"},
  ]);

  return (
    <div className="app">
       {/* Header */}
        <div className="app__header">
            <img className="app__headerImage" src="http://2.bp.blogspot.com/-4pBaE9sDqjg/UYNzlT_tL9I/AAAAAAAAZck/PhzqPJx3le8/s1600/Instragram+logo.png" alt="logo" />
        </div>
       
        {posts.map(post => (
        <Post photo={post.photo} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        )
        )}
    </div>
  );
}

export default App;
