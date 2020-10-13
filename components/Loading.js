
import React, { Component } from 'react';
import styled from 'styled-components';
var Loader = require('react-loader');


class Loading extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            Open: true,
        }
    }

    HandleOpen = () =>{
        this.setState({Open : !this.state.Open})
    }

    Loading = () => {

        const {open} = this.props

        if(open)
        {
            return (

                <Div open={open} >

                    <Loader loaded={false} lines={12} length={15} width={10} radius={30}
                        corners={1} rotate={0} direction={1} color="#fff" speed={1}
                        trail={60} shadow={false} hwaccel={false} className="spinner"
                        zIndex={2e9} top="50%" left="50%" scale={1.00}
                        loadedClassName="loadedContent" />

                </Div>
            )
        }
   
    }

    render()
    {
        return (

            <div>
                {this.Loading()}
            </div>
        )
    }

}

    

export default Loading;

const Div = styled.div`
    display:flex;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.47);
    z-index:5001;
    transition: 0.15s;
    opacity: 1;

    ${props => !props.open && `
        opacity: 0;
        pointer-events: none;
    `}

`;


