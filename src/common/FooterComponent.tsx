import React from 'react';

type Props = {
    children:string
}

const FooterComponent:React.FC<Props> = (props:Props) => {
    const currentDate:string = new Date().toDateString();
    return(
        <div>
            <hr/>
            <p style={{ textAlign:"center" }}>{ props.children }&nbsp;-&nbsp;{ currentDate }</p>
        </div>
    )
}
export default FooterComponent;

// class => className; for => htmlFor; text-align, background-color => textAlign, backgroundColor
// JSX can have only one root tag