import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import * as ShortenerService from '../../services/shortener.service';

const Redirect = () => {
  const [error, setError] = useState({message: null})
  const params = useParams();
  const shortCode = params.shortCode

  useEffect(() => {
    console.log(shortCode)
    if(!shortCode) return
    ShortenerService.getRedirect({shortCode})
    .then(res=> res.json())
    .then((data)=> {
      if(data.error) {
        setError(data.error)
      }
      window.location.href = data.data.longUrl;
    })

  }, []);
  return <div>
    <div>{error.message}</div>
    
    </div>;
};

export default Redirect;
