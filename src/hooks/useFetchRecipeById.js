import { useEffect, useState} from 'react';
import axios from 'axios';

const useFetchRecipeById = (id) => {
  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = () => {
      axios.get(`https://wq439vspnf.execute-api.us-east-2.amazonaws.com/Prod/recipe/${id}`)
      .then((response) => setData(response.data))
      .catch((err) => { console.log(`Error: ${err}`); setError(err); })
      .finally(() => setLoaded(true))
    };

    fetchData();
  }, []);

  return {
    data,
    loaded,
    error
  };
};

export default useFetchRecipeById;