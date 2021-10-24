import { forwardRef, Fragment, useState } from "react";
import Btn from "./Btn";

import { Cx } from '../utils/Q';

const HtmlSelect = forwardRef(
	({
		prefixCls = "htmlSelect form-select", 
		className, 
		wrapClass, 
		isize, 
		value, 
		defaultValue, 
		options, 
		placeholder, 
		clear = true, 
		onChange = () => {}, 
		onClear = () => {}, 
		disabled, 
		theme = "secondary", 
		...etc		
	}, 
	ref
) => {
  const [val, setVal] = useState(value || defaultValue);
	const Wrap = clear ? "div" : Fragment;
	const wrapProps = clear ? { 
    className: Cx("wrapHtmlSelect input-group", { ["input-group-" + isize]: isize }, wrapClass), 
    "aria-label": val ? undefined : placeholder
  } : {};

	const Change = e => {
		setVal(e.target.value);
		onChange(e);
	}

	const Clear = (e) => {
		if(defaultValue || !value){
			let select = e.target.previousElementSibling;
			if(select){
				select.value = "";// DEVS: Options
        select.selectedIndex = 0;
      }
		}
		setVal(null);
		onClear(e);
	}

  const parseTitle = () => {
    if(val){
      let getVal = options.find(f => (f.value || f) + "" === val + "");
      if(getVal){
        return getVal.label || getVal;
      }
    }
    return placeholder;// undefined
  }

	const renderOption = (v, i) => (
		<option 
			key={i} 
			value={v.value || v} 
			disabled={v.disabled} 
			title={v.label}
		>
			{v.label || v}
		</option>
	);

	return (
		<Wrap {...wrapProps}>
			<select 
				{...etc} 
				ref={ref} 
				className={Cx(prefixCls, { ["form-select-" + isize]: isize && !clear }, className)} 
				disabled={disabled} 
        title={parseTitle()} 
				value={value} 
				defaultValue={defaultValue} 
				onChange={Change} 
			>
				{placeholder && <option className="d-none" aria-hidden>{placeholder}</option>}

				{Array.isArray(options) && options.map((item, idx) => 
					item.options ? 
						<optgroup key={idx} label={item.label}>
							{item.options.map(renderOption)}
						</optgroup>
						: 
						renderOption(item, idx)
				)}
			</select>
			
			{(clear && val) && 
				<Btn 
					outline 
					kind={theme} 
					onClick={Clear} 
					disabled={disabled} 
					tabIndex="-1" 
					className="bi bi-x" 
				/>
			}
		</Wrap>
	);
});

export default HtmlSelect;

