import React, {useCallback, useEffect, useState} from 'react';
import axiosAPI from '../../axiosAPI';
import Spinner from '../../components/Spinner/Spinner';
import {Post, PostsAPI} from '../../types.d.';
import {Link} from 'react-router-dom';
import {format} from 'date-fns';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);

  const getData = useCallback(async () => {
    try {
      const response = await axiosAPI.get<PostsAPI | null>('/posts.json');
      const postsApi = response.data;

      if (!postsApi) {
        alert("This endpoint is empty.");
      }

      if (postsApi) {
        setPosts(Object.keys(postsApi).map(id => ({
          ...postsApi[id],
          id
        })).reverse());
      } else {
        setPosts([]);
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

  return (<>
    {isLoading ? <Spinner/> :
      <>
        {posts.map(post => {
          return (
            <div key={post.id} className="card mt-3">
              <div className="card-body">
                <span className="text-secondary fs-6">Created at: {format(post.date, "dd.MM.yy HH.mm")}</span>
                <h4>{post.title}</h4>
                <Link className="btn btn-primary" to={`/posts/${post.id}`}>Read more &gt;&gt;</Link>
              </div>
            </div>
          );
        })}
      </>
    }
  </>);
};
export default Home;