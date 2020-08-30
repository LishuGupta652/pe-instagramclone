import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './components/Post'

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from "@material-ui/core"

// Firebase
import {db} from './firebase';

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes  = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false)

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => (
        setPosts(snapshot.docs.map(doc => ({
            id: doc.id,
            post: doc.data()
        })))
    ))      
  }, [])

  const signup = (e) => {

  }

  return (
    <div className="app">
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <div style={modalStyle} className={classes.paper}>
                <h2>I am a model</h2>
            </div>
        </Modal>

    
       {/* Header */}
        <div className="app__header">
            <img className="app__headerImage" src="http://2.bp.blogspot.com/-4pBaE9sDqjg/UYNzlT_tL9I/AAAAAAAAZck/PhzqPJx3le8/s1600/Instragram+logo.png" alt="logo" />
        </div>

        <Button onClick={() => setOpen(true)}>Sign up</Button>


        <div className="posts">
            {posts.map(({id, post}) => (
            <Post key={id} photo={post.photo} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
            )
            )}
        </div>
    </div>
  );
}

export default App;
