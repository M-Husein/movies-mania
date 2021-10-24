import { AUTHOR, EXTERNAL_LINKS } from "../conts/INFOS";

export default function AsideHome(){
  return (
    <aside className="col-md-3">
      <div className="card shadow-sm position-sticky t-80px">
        <div className="card-header bi bi-info-circle"> Info</div>
        <div className="list-group list-group-flush small">
          <div className="list-group-item">Created by {AUTHOR}</div>
          {EXTERNAL_LINKS.map((v, i) => // eslint-disable-next-line
            <a 
              key={i} 
              href={v.url} 
              target="_blank" 
              rel={v.label === "Programmeria" ? undefined : "noopener noreferrer"} 
              className={"list-group-item list-group-item-action bi bi-" + v.i} 
            > {v.label}
            </a>
          )}
        </div>
        <div className="card-body small">
          <p className="mb-0">
            Source Data From :{" "}
            <a href="https://www.omdbapi.com" target="_blank" rel="noopener noreferrer">
              <cite>OMDb API</cite>
            </a>
          </p>
        </div>
      </div>
    </aside>
  );
}
