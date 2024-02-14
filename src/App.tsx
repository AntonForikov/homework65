import AppBar from './components/AppBar/AppBar';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home';
import Page from './containers/Page/Page';

function App() {

  return (
    <div>
      <AppBar />
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pages/:pageName" element={<Page />}/>
          {/*<Route path="/posts" element={<Home />} />*/}
          {/*<Route path="/add" element={<Add edit={false} />} />*/}
          {/*<Route path="/posts/:id" element={<Post/>} >*/}
          {/*  <Route path="edit" element={<Add edit={true} />}/>*/}
          {/*</Route>*/}
          {/*<Route path="/about" element={<About />} />*/}
          {/*<Route path="/contacts" element={<Contacts />} />*/}
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
