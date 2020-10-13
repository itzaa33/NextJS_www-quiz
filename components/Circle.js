import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

class Circle extends React.Component {

    constructor(props) {

        super(props);
       
    }
    render()
    {
        const {time, status, count} = this.props
     
        return (
            <Countdown >

                <div >
                  <CountdownNumber>{Math.round(time/100)}</CountdownNumber>
                </div>

                <Svg >
                    <Circle_bar r="40px" cy="47px" cx="47px" count = {count} status = {status}  time = {time}></Circle_bar>
                  
                </Svg>
            </Countdown>
          
        )
    }

}

export default Circle;

const Countdown = styled.div`

    widows:auto;
 
    @media (min-width: 320px) {
        position: absolute;
        right:0px;
        
    }
    @media (min-width: 768px) {
        right: -115px;
    }

    div{
        display:flex;
        width:auto !important;
        margin:0px!important;
        text-align:center;

        @media (min-width: 320px) {
            position: relative;
            height: auto;
            position:absolute;
            height: auto;
            top:2px;
            right:6px

        }

        @media (min-width: 425px) {
            right: 5px;
        }

         @media (min-width: 768px) {
            top:21px;
            right:17px;

        }

       

    }
  
`;


const CountdownNumber = styled.p`
    color: white;
    display: inline-block;
    font-family:'Montserrat';
    font-style:normal;
    margin:auto;
    font-size:14px;
    line-height: 40px;
    width:26px;
    @media (min-width: 768px) {
        width:44px;
        font-size:32px;
    }
    
`;

const Svg = styled.svg`
    position: absolute;
    
    transform: rotateY(-180deg) rotateZ(-90deg);
    right: 0px;
    
    @media (min-width: 320px) {
        width: 40px;
        height: 40px;
        font-size:22px;  
    }

    @media (min-width: 425px) {
        right: 0px;
    }


    @media (min-width: 768px) {
        width: 80px;
        height: 80px;
    }

 
`; 

const Circle_bar = styled.circle`
     
        
        stroke-dashoffset: 0px;
        stroke: white;
        fill: none;
       

    @media (min-width: 320px) {
        stroke-dasharray: ${props => props.status ? (100 * props.time)/6000: 0} 125;
        stroke-width: 5px;
        r:16px;
        cx:19px;
        cy:19px;
        
    }


    @media (min-width: 768px) {
        stroke-dasharray: ${props => props.status ? (207 * props.time)/6000: 0} 250;
        stroke-width: 10px;
        r:33px;
        cx:40px;
        cy:40px;
        
    }
        
`;


