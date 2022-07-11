import React from 'react';

type Props = {
    title:string,
    style:React.CSSProperties
}

// Functional component - using lambda function
// If it is a functional component it must have return statement
// In between return you will have JSX code
const HeaderComponent:React.FC<Props> = (props:Props) => {
    return(
        <div>
            <h3 style={ props.style }>{ props.title }</h3>
            <hr/>
        </div>
    )
}
export default HeaderComponent;