import React, {useCallback, useEffect, useState} from 'react';
import axiosAPI from '../../axiosAPI';
import Spinner from '../../components/Spinner/Spinner';
import {PageApi, PagesApi} from '../../types.d.';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pages, setPages] = useState<PageApi[]>([]);

  // const getData = useCallback(async () => {
  //   try {
  //     const response = await axiosAPI.get<PagesApi | null>('/pages.json');
  //     const pagesApi = response.data;
  //
  //     if (!pagesApi) {
  //       alert("This endpoint is empty.");
  //     }
  //
  //     if (pagesApi) {
  //       const pageNamesArray = Object.keys(pagesApi);
  //       console.log(pageNamesArray);
  //       setPages(pageNamesArray.map(pageName => ({
  //         ...pagesApi[pageName],
  //         pageName: pageName
  //       })));
  //       // setPages(Object.keys(pagesApi).map(pageNames => ({
  //       //   ...pagesApi[pageNames],
  //       //   pageNames
  //       // })));
  //
  //     } else {
  //       setPages([]);
  //     }
  //   } catch {
  //     alert ('Please check requested URL.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  //   }, []);
  //
  // useEffect(() => {
  //   void getData();
  // }, [getData]);

  return (<>
    {/*{isLoading ? <Spinner/> :*/}
      <>
        {/*{posts.map(post => {*/}
        {/*  return (*/}
        {/*    <div key={post.id} className="card mt-3">*/}
        {/*      <div className="card-body">*/}
        {/*        <span className="text-secondary fs-6">Created at: {format(post.date, "dd.MM.yy HH.mm")}</span>*/}
        {/*        <h4>{post.title}</h4>*/}
        {/*        <Link className="btn btn-primary" to={`/posts/${post.id}`}>Read more &gt;&gt;</Link>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  );*/}
        {/*})}*/}
      </>
    {/*}*/}
  </>);
};
export default Home;