import React, { Component } from 'react';
import styled from 'styled-components';



class Modal extends React.Component {

    constructor(props) {

        super(props);

        this.state = this.initialState;
        
        this.state = {
            Open: true,
        }
    }

    HandleOpen = () =>{
        this.setState({Open : !this.state.Open})
    }

    Modal = () => {

        const {open,close,colorbackground,priority} = this.props
        
        if( open &&this.state.Open)
        {
            return (

                <Div open={open} priority = {priority}>

                    <Content  background = { colorbackground }>
                        
                        <BtnClost open = {close} onClick={this.HandleOpen}></BtnClost>
                        
                         {this.props.children}
                    </Content>
                    

                    {/* <Backdrop open = {open} /> */}
                </Div>
            )
        }
   
    }

    render()
    {
        return (

            <div>
                {this.Modal()}
            </div>
        )
    }

}

    

export default Modal;


const Div = styled.div`
    display:flex;
    
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.85);
    z-index: ${props => 5000 / props.priority} ;
    transition: 0.15s;
    opacity: 1;

    align-items:center;
    
    ${props => !props.open && `
        opacity: 0;
        pointer-events: none;
    `}

`;

const Content = styled.div`
    max-height:calc(100% - 20px);
    position:relative;
    display:flex;
    margin: auto;
    background: ${props => props.background};
    color: white;
    padding:10px;
    z-index:200;
    border-radius:6px;
    text-align:center;
    
    h1{
        font-size:24px;
        margin-top:20px;

    }
    p{
        margin-top:26px;
        
    }
    
     @media (max-width: 640px) {

        p{
            margin-top:14px;
        
        }
        h1{
            font-size:22px;
            margin-top:20px;
        }
    }
    
    
`;

const BtnClost = styled.button`
    width:30px;
    height:30px;
    right:10px;
    position:absolute;
    border:0px;
    background: url("/static/close-window.png");
    background-repeat: no-repeat;
    background-size:cover;
    cursor:pointer;
    display:${props => props.open ? 'none' : ''}
   
`;


