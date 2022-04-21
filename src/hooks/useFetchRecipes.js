import { useEffect, useState} from 'react';
import axios from 'axios';

const useFetchRecipes = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      axios.get('https://wq439vspnf.execute-api.us-east-2.amazonaws.com/Prod/recipes')
      .then((response) => setData(response.data))
      .catch((err) => { console.log(`Error: ${err}`); setError(err); })
      .finally(() => setLoaded(true));
    };

    fetchData();
  }, []);

  return {
    data,
    loaded,
    error
  };
};

export default useFetchRecipes;