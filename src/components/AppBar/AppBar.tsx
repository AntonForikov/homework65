import React, {useCallback, useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {PagesApi} from '../../types.d.';
import axiosAPI from '../../axiosAPI';
import Spinner from '../Spinner/Spinner';

const AppBar: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pages, setPages] = useState<string[]>([]);

  const getData = useCallback(async () => {
    try {
      const response = await axiosAPI.get<PagesApi | null>('/pages.json');
      const pagesApi = response.data;

      if (!pagesApi) {
        alert("This endpoint is empty.");
      }

      if (pagesApi) {
        const pageNamesArray = Object.keys(pagesApi);
        setPages(pageNamesArray);
      } else {
        setPages([]);
      }
    } catch {
      alert ('Please check requested URL.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void getData();
  }, [getData]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <div className="container-md">
        <NavLink className="navbar-brand" to="/pages">Pages</NavLink>
      </div>
      {isLoading ? <Spinner/> :
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {pages.map(page => {
            return (
              <li className="nav-item" key={Math.random()}>
                <NavLink className="nav-link" to={`/pages/${page}`}>{page[0].toLocaleUpperCase()+page.slice(1)}</NavLink>
              </li>
            );
          })}
        </ul>
      }

    </nav>
  );
};

export default AppBar;