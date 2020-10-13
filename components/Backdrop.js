import React, { Component } from 'react';
import styled from 'styled-components';


const Backdrop = ( props ) =>
{
    const {open} = props

    if(open)
    {
        return(
            <div>
                <Divbackdrop/>
            </div>
         )
    }
   
}

export default Backdrop;

const Divbackdrop = styled.div`
   position: fixed;
    top:0;
    width:100%;
    height:100%;
    background: rgba(0,0,0,0.3);
    z-index:100;
`;

