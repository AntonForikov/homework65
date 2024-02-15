import React, {useCallback, useEffect, useState} from 'react';
import axiosAPI from '../../axiosAPI';
import {useParams} from 'react-router-dom';
import {PageApi, PagesApi} from '../../types.d.';
import Spinner from '../../components/Spinner/Spinner';

const Page: React.FC = () => {
  const param = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [pageContent, setPageContent] = useState<PageApi | null>();

  const getPageData = useCallback( async () => {
    try {
      setIsLoading(true);
      const response = await axiosAPI.get<PagesApi | null>('/pages/' + param.pageName + '.json');
      const pageApi = response.data;
      if (!pageApi) {
        alert("This endpoint is empty.");
      }

      if (pageApi) {
        const id = Object.keys(pageApi).toString();
        const result = pageApi[id];
        setPageContent(result);
      }
    } catch {
      alert ('Please check requested URL.');
    } finally {
      setIsLoading(false);
    }
  }, [param.pageName]);

  useEffect(() => {
    void getPageData();
  }, [getPageData]);


  return (
    <>
      {isLoading ? <Spinner/> : pageContent ?
        <div className="text-center">
          <h1>{pageContent.title[0].toUpperCase()}{pageContent.title.slice(1)}</h1>
          <p>{pageContent.content}</p>
        </div> : <h1>No data in database for this page!</h1>
      }
    </>
  );
};

export default Page;