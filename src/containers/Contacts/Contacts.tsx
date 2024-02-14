import React, {useCallback, useEffect, useState} from 'react';
import {Contacts} from '../../types.d.';
import axiosAPI from '../../axiosAPI';
import Spinner from '../../components/Spinner/Spinner';

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contacts | null>();
  const [isLoading, setIsLoading] = useState(false);

  const getContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axiosAPI.get('/contacts.json');
      if (response.data) {
        setContacts(response.data);
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
    void getContacts();
  }, [getContacts]);


  return (
    <>
      {isLoading ? <Spinner/> :
        !isLoading && contacts ?
          <div className="card d-flex align-items-center m-auto mt-3" style={{width: "27rem"}}>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{contacts.country}, {contacts.city}</li>
              <li className="list-group-item">Address: {contacts.address}</li>
              <li className="list-group-item">Tel: {contacts.tel}</li>
              <li className="list-group-item">Email: {contacts.email}</li>
              <li className="list-group-item">Phone: {contacts.tel}</li>
            </ul>
          </div> : <h1>There is no contacts in firebase.</h1>
      }
    </>
  );
};

export default Contacts;