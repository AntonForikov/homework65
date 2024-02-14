import React, {useCallback, useEffect, useState} from 'react';
import {Link, Outlet, useNavigate, useParams} from 'react-router-dom';
import axiosAPI from '../../axiosAPI';
import {PostApi} from '../../types.d.';
import Spinner from '../../components/Spinner/Spinner';
import {format} from 'date-fns';

const Post: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<PostApi | null>();
  const [isLoading, setIsLoading] = useState(false);

  const getPost = useCallback(async () => {
    setIsLoading(true);
    const response = await axiosAPI.get<PostApi | null>(`/posts/${params.id}.json`);
    setPost(response.data);
    setIsLoading(false);
  }, [params.id]);

  useEffect(() => {
    void getPost();
  }, [getPost]);

  const deletePost = async () => {
    await axiosAPI.delete('/posts/' + params.id + '.json');
    navigate('/');
  };

  return (
    <>
      {isLoading ? <Spinner/> :
        post && !isLoading ?
          <>
            <div className="card mt-3 text-center">
              <div className="card-body">
                <span className="text-secondary fs-6">Created at: {format(post.date, "dd.MM.yy HH.mm")}</span>
                <h1>{post.title}</h1>
                <h4>{post.description}</h4>
                <Link className="btn btn-success me-2" to={`/posts/${params.id}/edit`}>Edit</Link>
                <button
                  className={"btn btn-danger"}
                  onClick={deletePost}
                >
                  Delete
                </button>
              </div>
            </div>
            <Outlet/>
          </>
          : <h1>No such post!</h1>
      }
    </>
  );
};

export default Post;