import Btn from '../Btn';

export default function NotFound(){
  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-75vh">
      <h1>Not Found</h1>
      <Btn As="a" href="/">Back to Home</Btn>
    </div>
  );
}