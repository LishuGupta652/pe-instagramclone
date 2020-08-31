import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './components/Post'

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input, Modal } from "@material-ui/core"

// Firebase
import {db, auth} from './firebase';

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
  const [openSignIn, setOpenSignIn] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null)

  useEffect(() => {
      auth.onAuthStateChanged((authUser) => {
          if(authUser) {
              // User has logged in
              console.log(authUser);
              setUser(authUser);
          } else {  
              // user has logged out
              setUser(null);
          }
      })
  }, [user, username])

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => (
        setPosts(snapshot.docs.map(doc => ({
            id: doc.id,
            post: doc.data()
        })))
    ))      
  }, [])

  const signup = (e) => {
        e.preventDefault();

        auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: username
            })
        })
        .catch(err => alert(err.message))

        setOpen(false)
  }

    const signin = (e) => {
        e.preventDefault();

        auth
        .signInWithEmailAndPassword(email, password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: username
            })
        })
        .catch(err => alert(err.message))

        setOpenSignIn(false)
  }

  return (
    <div className="app">
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <form className="app_signup">

                <div style={modalStyle} className={classes.paper}>
                <center>
                        <img className="app__headerImage" src="http://2.bp.blogspot.com/-4pBaE9sDqjg/UYNzlT_tL9I/AAAAAAAAZck/PhzqPJx3le8/s1600/Instragram+logo.png" alt="logo" />
                </center>
                <Input placeholder="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <Input placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <Button type="submit" onClick={signup}>Sign up</Button>
                </div>
            </form>
        </Modal>

        {/* Sign In modal  */}
        <Modal
            open={openSignIn}
            onClose={() => setOpenSignIn(false)}
        >
            <form className="app_signup">

                <div style={modalStyle} className={classes.paper}>
                <center>
                        <img className="app__headerImage" src="http://2.bp.blogspot.com/-4pBaE9sDqjg/UYNzlT_tL9I/AAAAAAAAZck/PhzqPJx3le8/s1600/Instragram+logo.png" alt="logo" />
                </center>
             
                <Input placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <Button type="submit" onClick={signin}>Sign up</Button>
                </div>
            </form>
        </Modal>

    
       {/* Header */}
        <div className="app__header">
            <img className="app__headerImage" src="http://2.bp.blogspot.com/-4pBaE9sDqjg/UYNzlT_tL9I/AAAAAAAAZck/PhzqPJx3le8/s1600/Instragram+logo.png" alt="logo" />
        </div>

        { user ? (
            <Button onClick={() => auth.signOut()}>Log out</Button>
            ) : (
                <div className="app_loginContainer">
                    <Button onClick={() => setOpenSignIn(true)}>Login</Button>
                    <Button onClick={() => setOpen(true)}>Sign up</Button>
                </div>
            )
        }


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
