import React, {useCallback, useEffect, useState} from 'react';
import Spinner from '../../components/Spinner/Spinner';
import axiosAPI from '../../axiosAPI';
import {useNavigate, useParams} from 'react-router-dom';

interface Props {
  edit: boolean
}

const Add: React.FC<Props> = ({edit}) => {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<PostApi>({
    title: '',
    description: '',
    date: '',
  });

  const postChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;

    setPost((prevState) => ({
      ...prevState,
      [name]: value,
      date: new Date().toISOString()
    }));
  };

  if (edit) {
    const setCurrentPost = useCallback(async  () => {
        const currentPost = await axiosAPI.get<PostApi | null>(`/posts/${params.id}.json`);
        if (currentPost.data) {
          setPost(currentPost.data);
        }
      }, [params.id]);

    useEffect(() => {
      void setCurrentPost();
    }, [setCurrentPost]);
  }

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!edit) {
        await axiosAPI.post('/posts.json', post);
      } else if (edit) {
        await axiosAPI.put('/posts/' + params.id + '.json', post);
      }
    } catch {
      alert ('Please check URL.');
    } finally {
      setLoading(false);
    }
    setPost(prevState => ({...prevState, post: '', date: ''}));
    navigate('/');
  };

  return (<>
    {
      loading ? <Spinner/> :
        <>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1"
                   checked/>
            <label className="form-check-label" htmlFor="exampleRadios1">
              Default radio
            </label>
          </div>
          <form className="mt-2" onSubmit={onFormSubmit}>
            <div className="d-flex align-items-center">
              <label htmlFor="title">{edit ? 'New Title:' : 'Title:'} </label>
              <input
                type="text"
                className="form-control mx-3"
                id="title"
                placeholder="Title"
                name="title"
                value={post.title}
                onChange={postChange}
                required
              />
            </div>
            <div className="d-flex flex-column align-items-center mt-3">
              <label htmlFor="description">{edit ? 'New Post:' : 'Post:'}</label>
              <textarea
                className="form-control my-3"
                id="description"
                placeholder="Description"
                name="description"
                value={post.description}
                onChange={postChange}
                required
              />
              <button type="submit" className="btn btn-primary">{edit ? 'Edit' : 'Add post'}</button>
            </div>
          </form>
        </>

    }
  </>);
};

export default Add;