import React, {useCallback, useEffect, useState} from 'react';
import {About} from '../../types.d.';
import axiosAPI from '../../axiosAPI';
import Spinner from '../../components/Spinner/Spinner';

const About: React.FC = () => {
  const [about, setAbout] = useState<About | null>();
  const [isLoading, setIsLoading] = useState(false);

  const getAbout = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axiosAPI.get('/about.json');
      if (response.data) {
        setAbout(response.data);
      } else {
        alert('Please check endpoint.');
      }
    } catch {
      alert('Please check URL.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void getAbout();
  }, [getAbout]);


  return (
    <>
      {isLoading ? <Spinner/> :
        !isLoading && about ?
          <>
            <h1 className="text-center">About Us</h1>
            <div className="alert alert-primary" role="alert">
              {about.content}
            </div>
          </> : <h1>There is no info about us in firebase.</h1>
      }
    </>
  );
};

export default About;