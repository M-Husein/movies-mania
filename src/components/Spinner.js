import { Cx } from "../utils/Q";

export default function Spinner({
  type = "border", 
  kind = "dark", 
  size, 
  style, 
  ...etc
}){
  const sizeNan = isNaN(parseInt(size));
  const sizeStyle = size && !sizeNan ? size : undefined;

  return (
    <div 
      {...etc} 
      role="status" 
      className={
        Cx("spinner-" + type, { 
          ["text-" + kind]: kind, 
          ["spinner-" + type + "-" + size]: type && size && sizeNan
        })
      } 
      style={{
        ...style, 
        width: sizeStyle, 
        height: sizeStyle
      }}
    />
  );
}
