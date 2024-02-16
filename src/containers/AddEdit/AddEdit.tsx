import React, {useCallback, useEffect, useState} from 'react';
import Spinner from '../../components/Spinner/Spinner';
import axiosAPI from '../../axiosAPI';
import {PageApi, PagesApi} from '../../types.d.';
import {useNavigate} from 'react-router-dom';

const initial: PageApi = {
  title: '',
  content: ''
};

interface Props {
  setRerender: (render: boolean) => void
}
const AddEdit: React.FC<Props> = ({setRerender}) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [pagesNames, setPagesNames] = useState<string[]>([]);
  const [targetPage, setTargetPage] = useState<PageApi>(initial);
  const [selectedPageName, setSelectedPageName] = useState('');
  const [edit, setEdit] = useState(true);
  const [newPageName, setNewPageName] = useState('');
  const [pageId, setPageId] = useState('');


  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosAPI.get<PagesApi | null>('/pages.json');
      const pagesData = response.data;

      if (!pagesData) {
        alert('This endpoint is empty.');
      }

      if (pagesData) {
        setPagesNames(Object.keys(pagesData));
      }
    } catch {
      alert('Please check requested URL.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void getData();
  }, [getData]);

  const getPageData = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      setSelectedPageName(e.target.value);
      setLoading(true);
      const response = await axiosAPI.get<PagesApi | null>('/pages/' + e.target.value + '.json');
      const pagesData = response.data;

      if (!pagesData) {
        alert('This endpoint is empty.');
      }

      if (pagesData) {
        const id = Object.keys(pagesData).toString();
        const result = pagesData[id];
        setPageId(id);
        setTargetPage(result);
      }
    } catch {
      alert('Please check requested URL.');
    } finally {
      setLoading(false);
    }
  };

  const newPageOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value} = e.target;
    setNewPageName(value);
  };

  const pageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;

    setTargetPage((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const changeMode = () => {
    setEdit(!edit);
    setNewPageName('');
    setTargetPage(initial);
    setSelectedPageName('');
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!edit) {
        await axiosAPI.post('/pages/' + newPageName + '.json', targetPage);
        navigate('/pages/' + newPageName);
        setRerender(true);
      } else if (edit) {
        await axiosAPI.put(`/pages/${selectedPageName}/${pageId}.json`, targetPage);
        navigate('/pages/' + selectedPageName);
      }
    } catch {
      alert('Please check URL.');
    } finally {
      setLoading(false);
    }
  };

  return (<>
  <div className='d-flex align-items-center'>
    <h1>{edit ? 'Edit page' : 'Add new page'}</h1>
    <div className="form-check form-switch ms-auto">
      <label className="form-check-label" htmlFor="edit">Edit mode</label>
      <input
        className="form-check-input"
        type="checkbox" role="switch"
        id="edit"
        onChange={changeMode}
        checked={edit}/>
    </div>
  </div>
    <form className="mt-2" onSubmit={onFormSubmit}>
      {edit ?
        <select
          className="form-select form-select-lg mb-3"
          onChange={getPageData}
          required
          value={selectedPageName}
        >
          <option value="">--Select edited page--</option>
            {pagesNames.map(pageName => {
              return (
                <option
                  value={pageName}
                  key={Math.random()}
                >
                  {pageName[0].toUpperCase()}{pageName.slice(1)}
                </option>);
            })}
          </select> :
          <>
            <div className="form-group my-3">
              <label htmlFor="newPageName">New page name:</label>
              <input
                type="text"
                className="form-control"
                id="newPageName"
                name="newPageName"
                placeholder="New page name"
                value={newPageName}
                onChange={newPageOnChange}
                required
              />
            </div>
          </>
        }

        {loading ? <Spinner/> : <>
          {targetPage &&
            <>
              <div className="form-group">
                <label htmlFor="title">{edit ? 'Edit page title:' : 'New page title'}</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  placeholder="Titile"
                  value={targetPage.title}
                  onChange={pageChange}
                  required
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="content">{edit ? 'Edit page content:' : 'New page content'}</label>
                <textarea
                  className="form-control"
                  id="content"
                  name="content"
                  placeholder="Content"
                  value={targetPage.content}
                  onChange={pageChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">{edit ? 'Edit page' : 'Add page'}</button>
            </>
          }
        </>}
      </form>
    </>);
};

export default AddEdit;