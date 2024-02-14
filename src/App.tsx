import AppBar from './components/AppBar/AppBar';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home';
import Add from './containers/Add/Add';
import About from './containers/About/About';
import Contacts from './containers/Contacts/Contacts';
import Post from './containers/Post/Post';

function App() {

  return (
    <div>
      <AppBar />
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/add" element={<Add edit={false} />} />
          <Route path="/posts/:id" element={<Post/>} >
            <Route path="edit" element={<Add edit={true} />}/>
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
