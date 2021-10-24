import { forwardRef } from 'react';
import { Cx, setClass } from '../utils/Q';

const Img = forwardRef(
	({
    alt = "", 
		loading = "lazy",
		drag = false, 
		wrapAs = "div", 
		wrapProps, 
    w, 
		h, 
		fluid, 
		thumb, 
		circle, 
		round, 
		className, 
		frameClass, 
		frame, 
		frameClassPrefix = "img-frame", 
		caption, 
		captionClass, 
		onLoad, 
		onError, 
		children, 
		...etc
	}, 
	ref
) => {
	const bsFigure = frame === 'bs';
	const As = bsFigure ? "figure" : wrapAs;
	
	const setCx = et => {
		setClass(et, "ava-loader", "remove");
	}
	
	const Load = e => {
		setCx(e.target);
		
		if(onLoad) onLoad(e);
	}
	
	// DEV: 
	const Error = e => {
		let et = e.target;
		
		setCx(et);
		
		et.src = "data:image/svg+xml,%3Csvg width='300' height='150' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMidYMid slice' style='font-family:sans-serif;font-size:5rem;text-anchor:middle'%3E%3Crect width='100%25' height='100%25' fill='%23b3d6f4'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' fill='%23777' dy='.3em'%3E?%3C/text%3E%3C/svg%3E";
	
		if(onError) onError(e);
		
		return;
	}

	const img = () => (
		<img 
			{...etc}
      ref={ref}  
      loading={loading} 
			alt={alt} 
			width={w} 
			height={h} 
			className={
				Cx("ava-loader", {
          'img-fluid': fluid, 
					'img-thumbnail': thumb,
					'rounded-circle': circle,
					'rounded': round,
					'figure-img': bsFigure, 
				}, className)
			}
			draggable={drag} 
			onError={Error} 
			onLoad={Load} 
		/>
	);
	
	if(frame){
		return (
			<As 
				{...wrapProps} 
				className={
					Cx(frameClassPrefix, {
						'figure': bsFigure
					}, frameClass)
				}
			>
				{img()}

				{(bsFigure && caption) && 
					<figcaption className={Cx("figure-caption", captionClass)}>
						{caption}
					</figcaption>
				}

				{children}
			</As>
		)
	}

  return img();
});

export default Img;

