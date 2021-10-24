import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';

import Img from '../Img';
import { getDetail, getLists } from '../../api';

export default function MovieDetail(){
  const { ID } = useParams();
  const [error, setError] = useState();
  const [loadDetail, setLoadDetail] = useState(false);
  const [loadRelated, setLoadRelated] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const [dataRelated, setDataRelated] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    if(ID){
      const errMessage = () => setError(navigator.onLine ? "Failed get data" : "Your internet is offline");
      getDetail({ 
        i: ID, 
        plot: "full", 
      }, source.token)
      .then(r => {
        if(r && r.data && r.data.Response === "True"){
          let detail = r.data;
          setDataDetail(detail);

          let [first, second] = detail.Title.split(" ");

          getLists({
            s: first + (second ? " " + second : "")
          }).then(res => {
            if(res && res.data && res.data.Response === "True"){
              setDataRelated(res.data.Search);
            }
          })
          .catch(errMessage)
          .then(() => setLoadRelated(true));
        }
      })
      .catch(errMessage)
      .then(() => setLoadDetail(true));
    }

    return () => {
      if(ID) source.cancel();
    }
  }, [ID]);

  const renderInfo = (label, value) => (
    <>
      <dt className="col-md-2">{label}</dt>
      <dd className="col-md-10">{value}</dd>
    </>
  );

  return error ? 
    <div className="alert alert-danger">
      {error}
    </div>
    : 
    <div className="row">
      <div className="col-md-9">
        {loadDetail ? 
          <>
            <div className="row g-0">
              <Img 
                thumb 
                className="shadow-sm" 
                frame="bs" 
                frameClass="col-md-4"
                alt={dataDetail.Title} 
                src={dataDetail.Poster} 
              />

              <div className="col-md-8 px-3">
                <h1>{dataDetail.Title}</h1>
                <p className="border-top pt-2">{dataDetail.Plot}</p>

                <dl className="row border-top pt-2">
                  {renderInfo("Genre", dataDetail.Genre)}
                  {renderInfo("Director", dataDetail.Director)}
                  {renderInfo("Writer", dataDetail.Writer)}
                  {renderInfo("Stars", dataDetail.Actors)}
                </dl>
              </div>
            </div>

            <h4>Details</h4>
            <hr/>
            <dl className="row">
              {renderInfo("Released date", dataDetail.Released)} 
              {renderInfo("Country", dataDetail.Country)} 
              {renderInfo("Official site", dataDetail.Website !== "N/A" ? <a href={dataDetail.Website} target="_blank" rel="noopener noreferrer">Website</a> : "N/A")}
              {renderInfo("Language", dataDetail.Language)} 
              {renderInfo("IMDb Rating", dataDetail.imdbRating)} 
              {renderInfo("IMDb Votes", dataDetail.imdbVotes)} 
              {renderInfo("Awards", dataDetail.Awards)} 
            </dl>
          </>
          : 
          <div className="row g-0 h-100">
            <div className="col-md-4 placeholder-glow h-100">
              <div className="rounded placeholder w-100 h-400px" />
            </div>

            <div className="col-md-8 px-3">
              <div className="card-text placeholder-glow d-flex flex-column">
                <div className="h1 placeholder col-5" />
                <div className="placeholder col mb-2" />
                <div className="placeholder col mb-2" />
                <div className="placeholder col" />
              </div>
            </div>
          </div>
        }
      </div>

      <div className="col-md-3">
        <div className="card shadow-sm position-sticky zi-1">
          <div className="card-header">
            Related
          </div>

          <div className={"list-group list-group-flush" + (loadRelated ? "" : " placeholder-glow")}>
            {loadRelated ? 
              (dataRelated || []).filter(f => f.Title !== dataDetail.Title).map((v, i) => 
                <Link 
                  key={i} 
                  to={"/movie/" + v.imdbID} 
                  onClick={() => setLoadDetail(false)} 
                  className="list-group-item list-group-item-action"
                >
                  <div className="d-flex align-items-center">
                    <Img 
                      w={40} 
                      h={40} 
                      round 
                      frame 
                      frameClass="flex-shrink-0" 
                      className="of-cover" 
                      alt={v.Title} 
                      src={v.Poster} 
                    />
                    <small className="flex-grow-1 ms-3">
                      {v.Title}
                    </small>
                  </div>
                </Link>
              )
              : 
              [1, 2, 3].map(v => 
                <div key={v} className="list-group-item">
                  <div className="placeholder placeholder-lg col-12" />
                </div>  
              )
            }
          </div>
        </div>
      </div>
    </div>;
}

// 