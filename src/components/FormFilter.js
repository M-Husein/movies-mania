import HtmlSelect from './HtmlSelect';

export default function FormFilter({
  theme, 
  typeValue, 
  yearValue, 
  onChangeType, 
  onChangeYear, 
  onClearType, 
  onClearYear
}){
  const TYPE_OPTIONS = ["movie", "series", "episode"];

  const yearOptions = () => {
    let now = new Date().getFullYear() + 5;
    return Array.from({ length: now - 1930 }).map((v, i) => now - (i + 1));
  }

  return (
    <div className="card round-top-0">
      <div className="card-header">
        Filter
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label htmlFor="filterType" className="form-label">Type</label>
          <HtmlSelect 
            theme={theme} 
            id="filterType" 
            className="text-capitalize" 
            placeholder="Choose type" 
            isize="sm" 
            options={TYPE_OPTIONS} 
            value={typeValue} 
            onChange={e => onChangeType(e.target.value)} 
            onClear={onClearType} 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="filterYear" className="form-label">Year</label>
          <HtmlSelect 
            theme={theme} 
            id="filterYear" 
            placeholder="Choose year" 
            isize="sm" 
            options={yearOptions()} 
            value={yearValue} 
            onChange={e => onChangeYear(e.target.value)} 
            onClear={onClearYear} 
          />
        </div>
      </div>
    </div>
  );
}