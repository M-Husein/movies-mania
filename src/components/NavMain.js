import { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Img from './Img';
import Btn from './Btn';
import FormFilter from './FormFilter';
import { debounce } from '../utils/Q';
import { getLists } from '../api';

export default function NavMain({
  theme = "dark", 
  onChangeTheme, 
}){
  let history = useHistory();
  let path = history.location.pathname;
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [typeValue, setTypeValue] = useState("movie");
  const [yearValue, setYearValue] = useState("");

  // eslint-disable-next-line
	const debouncedSave = useCallback(
		debounce((val) => {
      if(val.length > 0){
        let params = {
          s: val
        };
        if(typeValue) params.type = typeValue;
        if(yearValue) params.y = yearValue;

        getLists(params).then(res => {
          if(res?.data?.Response === "True"){
            setSearchResult(res.data.Search);
            history.replace(path + "?search=" + encodeURIComponent(val));
          }else{
            history.replace(path);
          }
        });
      }else{
        setSearchResult([]);
        history.replace(path);
      }
    }, 1000), 
		[typeValue, yearValue]
	);

	const onSearch = (e) => {
    let val = e.target.value;
		setSearchValue(val);
    debouncedSave(val.trim());
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
            w="30" 
            h="24" 
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
                <ul className="dropdown-menu dropdown-menu-end t-100 w-100 py-0 border-0 shadow-sm">
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
                type="search" 
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
                className="bi bi-search" // bi bi-x
              />
            </div>

            {(searchResult || []).length > 0 && 
              <div 
                className="dropdown-menu t-100 w-100 shadow-sm ovyauto" 
                style={{ maxHeight: '50vh' }}
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
            }
          </div>
        </div>
      </div>
    </nav>
  );
}
