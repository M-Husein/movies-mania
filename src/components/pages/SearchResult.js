import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import Btn from '../Btn';
import CardList from '../card/CardList';
import AsideInfo from '../AsideInfo';
import ImgModal from '../ImgModal';
import { getParam } from '../../utils/Q';
import { getLists } from '../../api';
import { TOTAL_PAGES } from '../../conts/config';

export default function SearchResult(){
  const source = axios.CancelToken.source();
  const searchKey = getParam("q");
  const [error, setError] = useState();
  const [load, setLoad] = useState(false);
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState({});

  const [pageNum, setPageNum] = useState(1);
	const [lastElement, setLastElement] = useState(null);

  const observer = useRef(
		new IntersectionObserver((entries) => {
			const first = entries[0];
			if (first.isIntersecting) {
				setPageNum((no) => no + 1);
			}
		})
	);

  const errMessage = () => setError(navigator.onLine ? "Failed get data" : "Your internet is offline");

  const getMovies = () => {
    if(searchKey){
      setLoad(false);

      getLists({
        type: "movie", 
        page: pageNum, 
        s: searchKey
      }, source.token).then(r => {
        if(r?.data?.Response === "True"){
          const data = r.data;
          setList([...list, ...data.Search]);
        }else{
          errMessage();
        }
      })
      .catch(errMessage)
      .then(() => setLoad(true));
    }
	}

	useEffect(() => {
		if (pageNum <= TOTAL_PAGES) {
			getMovies();
		}

    return () => {
      source.cancel();
    }
    // eslint-disable-next-line
	}, [pageNum]);

  useEffect(() => {
		const currentElement = lastElement;
		const currentObserver = observer.current;

		if (currentElement) {
			currentObserver.observe(currentElement);
		}

		return () => {
			if (currentElement) {
				currentObserver.unobserve(currentElement);
			}
		};
	}, [lastElement]);

  const renderLoadCard = () => [1, 2, 3].map((v) => 
    <div key={v} className="col-md-4">
      <div className="card shadow-sm" aria-hidden>
        <div className="card-img-top placeholder h-300px" />
        <div className="card-body">
          <h5 className="card-title placeholder-glow">
            <span className="placeholder col-6" />
          </h5>
          <p className="card-text placeholder-glow">
            {[7, 4, 4, 6, 8].map((v, i) => 
              <span key={i} className={"placeholder col-" + v} />
            )}
          </p>
          <div className="btn btn-primary disabled placeholder col-3" />
        </div>
      </div>
    </div>
  );

  if(!searchKey){
    return (
      <div className="d-flex flex-column justify-content-center align-items-center h-75vh">
        <h1 className="h4 bi bi-info-circle"> Please type movie name</h1>
        <Btn As="label" htmlFor="navSearch" className="bi bi-search"> Search</Btn>
      </div>
    );
  }

  return (
    <>
      {error ? 
        <div className="alert alert-danger">
          {error}
        </div>
        : 
        <div className="row">
          <div className="col-md-9">
            <div className="row row-cols-1 g-4">
              <h1 className="col lead mb-0">Search Result For : <span className="badge bg-primary">{searchKey}</span></h1>

              {(list || []).map((item, i) => 
                <div 
                  key={i} 
                  className="col-md-4" 
                  ref={i === list.length - 1 && load && pageNum <= TOTAL_PAGES ? setLastElement : undefined} 
                >
                  <CardList 
                    data={item} 
                    onClick={() => {
                      setDataModal(item);
                      setShowModal(true);
                    }}
                  />
                </div>
              )}

              {!load && renderLoadCard()}
            </div>
          </div>

          <AsideInfo />
        </div>
      }

      <ImgModal 
        show={showModal} 
        src={dataModal.Poster} 
        alt={dataModal.Title} 
        caption={dataModal.Title} 
        onClose={() => setShowModal(false)} 
      />
    </>
  );
}
