import { useState } from 'react';
import { Link } from 'react-router-dom';

import Btn from '../Btn';
import Img from '../Img';

import { srcImg } from '../../api';

export default function CardList({
  data = {}, 
  onClick = () => {}, 

}){
  const { imdbID, Title, Poster, Year } = data;
  const [imgSrc, setImgSrc] = useState(srcImg(imdbID));

  return (
    <div className="card h-100 shadow-sm overflow-hidden card-1">
      <Img 
        frame 
        frameClass="overflow-hidden czoomin" 
        alt={Title} 
        src={imgSrc} 
        className="card-img-top h-300px of-contain position-relative zi-2 shadow-sm" 
        wrapProps={{
          onClick
        }}
        onError={() => setImgSrc(Poster)}
      >
        <div className="position-absolute inset-0 bg-light bg-blur" style={{ backgroundImage: `url(${imgSrc})` }} />
      </Img>

      <div className="card-body d-flex flex-column">
        <h5 className="mb-4">
          <Link to={"/movie/" + imdbID} className="text-decoration-none text-dark">{Title}</Link>
        </h5>
        <p className="card-text d-flex align-items-center mt-auto">
          <span className="badge rounded-pill bg-secondary me-auto">{Year}</span>

          <Btn As={Link} outline size="sm" to={"/movie/" + imdbID}>Detail</Btn>
        </p>
      </div>
    </div>
  );
}
