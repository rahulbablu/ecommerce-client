import React, { useEffect } from 'react';
import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import './Search.scss';

const Search = ({searchValue}) => {

    const { data } = useFetch(`/products?populate=*`);

  const [searched, setSearched] = useState([]);

    useEffect(() => {
        const debouncing = setTimeout(() => {
          setSearched(
            data.filter((item) => {
             return (item.attributes.title+item.attributes.desc+item.attributes+item.attributes.sub_categories.data[0].attributes.title)
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            })
          );
        }, 1000);
        return () => clearInterval(debouncing);
    }, [searchValue, data]);


  return (
    <div className='search'>
      {searched.map(item => (
        <div className="searchItem" key={item.id}>
          <img src={process.env.REACT_APP_UPLOAD_URL+item.attributes.img?.data.attributes.url} alt='' />
          <div className="info">
            <h5>{item.attributes.title}</h5>
            <h6>in {item.attributes.sub_categories.data[0].attributes.title}</h6>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Search