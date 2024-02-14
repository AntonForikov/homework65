import React, {useCallback, useEffect, useState} from 'react';
import axiosAPI from '../../axiosAPI';
import {useParams} from 'react-router-dom';
import {PageApi} from '../../types.d.';
import Spinner from '../../components/Spinner/Spinner';

const Page: React.FC = () => {
  const param = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [pageContent, setPageContent] = useState<PageApi | null>();

  const getPageData = useCallback( async () => {
    try {
      setIsLoading(true);
      const response = await axiosAPI.get<PageApi | null>('/pages/' + param.pageName + '.json');
      const pageApi = response.data;
      if (!pageApi) {
        alert("This endpoint is empty.");
      }

      if (pageApi) {
        setPageContent(pageApi);
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
        <div>
          <h1 className="text-center">{pageContent.title}</h1>
          <p>{pageContent.content}</p>
        </div> : <h1>No data in database for this page!</h1>
      }
    </>
  );
};

export default Page;