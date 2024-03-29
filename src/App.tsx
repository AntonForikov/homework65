import AppBar from './components/AppBar/AppBar';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home';
import Page from './containers/Page/Page';
import AddEdit from './containers/AddEdit/AddEdit';
import {useState} from 'react';

function App() {
  const [navRender, setNavRender] = useState(false);

  return (
    <div>
      <AppBar rerender={navRender} />
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pages/:pageName" element={<Page />} />
          <Route path="/pages/admin" element={<AddEdit setRerender={setNavRender} />} />
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
