import { forwardRef } from 'react';

import { Cx } from '../utils/Q';

const Btn = forwardRef(
	({
		As = "button", 
		kind = "primary", 
		active, 
		block, 
		className, 
		outline, 
		size, 
		close, 
		type, 
		disabled, 
		tabIndex, 
		href, 
		role, 
		onClick, 
		onKeyUp, 
		...etc
	}, 
	ref
) => {
	const isDisabled = e => {
		if(disabled || (As === 'a' && href === '#')){
			e.preventDefault();
			return;
		}
	}
	
	const Click = e => {
		isDisabled(e);
		
		if(onClick) onClick(e);
	}
	
	const KeyUp = e => {
		isDisabled(e);
		
		if((As !== "button" || As !== "a") && tabIndex === "0" && e.key === "Enter"){
			e.target.click();
		}
		
		if(onKeyUp) onKeyUp(e);
	}

	const El = As === 'button' && href ? As = 'a' : As;// NOT FIX...???

	return (
		<El 
			{...etc} 
			ref={ref} 
			className={
				Cx( 
					{ close },
					close || "btn",
					close || `btn${outline ? '-outline' : ''}-${kind}`,
					size ? "btn-" + size : false,
					block ? 'btn-block' : false,
					{ active, disabled: disabled }, 
					className
				) 
			} 
			type={As !== "button" && !type ? undefined : type ? type : "button"} 
			role={As !== "button" && !role ? "button" : role} 
			tabIndex={As !== "button" && disabled && !tabIndex ? -1 : tabIndex} 
			disabled={As === "button" && disabled} 
			aria-disabled={disabled || null} 
			href={href} 
			onClick={Click} 
			onKeyUp={KeyUp} 
		/>
	);
});

export default Btn;	
