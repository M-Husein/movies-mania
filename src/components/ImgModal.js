import ReactDOM from 'react-dom';

import Img from './Img';

export default function ImgModal({
  append = document.body, 
  show = false, 
  src, 
  onClose = () => {}, 
  ...etc
}){
  if(!show) return null;

  return ReactDOM.createPortal(
    <>
      <div 
        className={"modal-backdrop fade opacity-100" + (show ? " show bg-blur" : "")} // o-9
        style={{ backgroundImage: `url(${src})` }} 
        onClick={onClose} 
      />

      <div 
        tabIndex="-1" 
        aria-modal 
        role="dialog" 
        className="pe-none position-fixed inset-0 zi-1050 d-flex flex-column justify-content-center align-item-center p-3" 
      >
        <button 
          type="button" 
          className="pe-auto btn-close btn-close-white bg-light align-self-end" 
          aria-label="Close" 
          onClick={onClose}
        />

        <Img 
          {...etc} 
          src={src} 
          className="d-block h-75vh position-relative shadow" 
          thumb  
          frame="bs" 
          frameClass={"pe-auto flexno m-auto text-center" + (show ? " zoom" : "")} 
          captionClass="badge bg-secondary position-relative shadow" 
        />
      </div>
    </>, 
    append
  );
}