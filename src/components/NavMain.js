import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';// useHistory

import Img from './Img';
import Btn from './Btn';
import Spinner from './Spinner';
import FormFilter from './FormFilter';
import { debounce, getParam } from '../utils/Q';
import { getLists } from '../api';

export default function NavMain({
  theme = "dark", 
  onChangeTheme, 
}){
  // let history = useHistory();
  // let path = history.location.pathname;
  const searchKey = getParam("q");
  const [loadSearch, setLoadSearch] = useState(false);
  const [errorSearch, setErrorSearch] = useState();
  const [searchValue, setSearchValue] = useState(searchKey || "");
  const [searchResult, setSearchResult] = useState([]);
  const [typeValue, setTypeValue] = useState("movie");
  const [yearValue, setYearValue] = useState("");

  // eslint-disable-next-line
	const debouncedSave = useCallback(
		debounce((val) => {
      if(val.length > 0){
        setLoadSearch(true);
        let params = {
          s: val
        };
        if(typeValue) params.type = typeValue;
        if(yearValue) params.y = yearValue;

        const errMessage = () => setErrorSearch(navigator.onLine ? "Failed get data" : "Your internet is offline");

        getLists(params).then(res => {
          if(res?.data?.Response === "True"){
            setSearchResult(res.data.Search);
            // history.replace(path + "?search=" + encodeURIComponent(val));
          }else{
            setSearchResult([]);
            // history.replace(path);
            errMessage();
          }
        })
        .catch(errMessage)
        .then(() => setLoadSearch(false));
      }else{
        setSearchResult([]);
        setErrorSearch(null);
        // history.replace(path);
      }
    }, 1000), 
		[typeValue, yearValue]
	);

	const onSearch = (e) => {
    let val = e.target.value;
		setSearchValue(val);
    debouncedSave(val.trim());
	}

  const onClearSearch = () => {
    if(searchValue.length > 0){
      setSearchValue("");
      setSearchResult([]);
      setErrorSearch(null);
      // history.replace(path);
    }
  }

  const switchTheme = theme === "dark" ? "light":"secondary";

  return (
    <nav 
      id="navMain" 
      className={`navbar sticky-top shadow-sm navbar-${theme} bg-${theme}`}
    >
      <div className="container">
        <Link to="/" className="navbar-brand">
          <Img 
            src="/img/logo.svg" 
            alt="Logo" 
            w="34" 
            h="28" 
            className="d-inline-block align-text-top"
          /> Movie Mania
        </Link>

        <div className="d-flex">
          <select 
            className="form-select form-select-sm text-capitalize w-auto me-1" 
            value={theme} 
            onChange={e => onChangeTheme(e.target.value)}
          >
            {["dark", "light"].map(v => <option key={v} value={v}>{v}</option>)}
          </select>

          <div className="d-flex position-relative col focus-within-1" tabIndex="-1">
            <div className="input-group input-group-sm">
              <div className="btn-group position-static dd-hover" tabIndex="-1">
                <Btn As="div" size="sm" kind={switchTheme} outline className="bi bi-filter" />
                <ul className="dropdown-menu dropdown-menu-end t-100 w-100 py-0 border-0 shadow">
                  <FormFilter 
                    typeValue={typeValue} 
                    yearValue={yearValue} 
                    onChangeType={setTypeValue} 
                    onChangeYear={setYearValue} 
                    onClearType={() => setTypeValue("")} 
                    onClearYear={() => setYearValue("")} 
                  />
                </ul>
              </div>

              <input 
                type="text" 
                inputMode="search" 
                className="form-control" 
                placeholder="Search" 
                autoComplete="off" 
                id="navSearch" 
                value={searchValue} 
                onChange={onSearch} 
              />
              <Btn 
                As="label" 
                outline 
                kind={switchTheme}  
                htmlFor="navSearch" 
                className={"w-34px " + (loadSearch ? "cwait" : "bi bi-" + (searchValue.length > 0 ? "x" : "search"))} 
                onClick={onClearSearch} 
              >
                {loadSearch && <Spinner kind={switchTheme} size="sm" />}
              </Btn>
            </div>

            {((searchResult || []).length > 0 || errorSearch) && 
              <div 
                className={"dropdown-menu t-100 w-100 round-top-0 bgclip-border shadow " + (errorSearch ? "p-0":"pb-0")} 
              >
                <div 
                  className="small pb-2 ovyauto ovscroll-contain border-bottom" 
                  style={{ maxHeight: '300px' }} // 50vh
                >
                  {(searchResult || []).map((v, i) => 
                    <Link 
                      key={i} 
                      to={"/movie/" + v.imdbID} 
                      title={v.Title} 
                      className="dropdown-item text-truncate" 
                      onClick={() => document.activeElement.blur()}
                    >
                      {v.Title}
                    </Link>
                  )}
                </div>

                {errorSearch ? 
                  <div className="alert alert-danger mb-0 text-center">{errorSearch}</div>
                  : 
                  <Link 
                    to={"/search/?q=" + encodeURIComponent(searchValue)} 
                    className="dropdown-item text-center" 
                    onClick={() => document.activeElement.blur()}
                  >
                    More
                  </Link>
                }
              </div>
            }
          </div>
        </div>
      </div>
    </nav>
  );
}
