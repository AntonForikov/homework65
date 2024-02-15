import AppBar from './components/AppBar/AppBar';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home';
import Page from './containers/Page/Page';
import AddEdit from './containers/AddEdit/AddEdit';

function App() {

  return (
    <div>
      <AppBar />
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pages/:pageName" element={<Page />} />
          <Route path="/pages/admin" element={<AddEdit />} />
          {/*<Route path="/posts" element={<Home />} />*/}
          {/*<Route path="/add" element={<AddEdit edit={false} />} />*/}
          {/*<Route path="/posts/:id" element={<Post/>} >*/}
          {/*  <Route path="edit" element={<AddEdit edit={true} />}/>*/}
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
