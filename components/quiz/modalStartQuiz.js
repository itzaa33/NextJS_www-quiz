import React, { Component } from 'react';

import Link from 'next/link'

import styled from 'styled-components';

import Modal from '../Modal';

import Icon from '../../icons'


class modalStartQuiz extends Component {
    
    constructor(props) {
        super(props);
    }

    render()
    {
        const buntton = this.props.ButtonReaddy
        const { renderScore, statusTakequiz, user } = this.props

        if(!renderScore)
        {
            if (statusTakequiz === false) {

                return (
                       
                    <Modal  open={!statusTakequiz} priority={3} colorbackground={"#1a1a1a"} close={true}>

                        <ContentModal style={{display:'flex',flexDirection:'column'}}>
                            <h1 style={{flexGrow:'1'}}> How to play </h1>

                            <Underline open={true} />

                            <div style={{overflow:'auto'}}>
                                <Div>
                                    <p>ตอบคำถามให้ถูกต้องมากที่สุด</p>
                                    <p>ภายในเวลา 60 วินาที</p>
                                </Div>
    
                                <Div>
                                    <div>
                                        <P>ตอบถูกได้คะแนนข้อละ</P>
                                        <P color={'#0071bc'} style={{ fontWeight: 'bold' }}> +10 คะแนน</P>
                                    </div>
    
                                    <div>
                                        <P>ตอบผิดถูกลดคะแนนข้อละ</P>
                                        <P color={'#c1272d'} style={{ fontWeight: 'bold' }}> -10 คะแนน</P>
                                    </div>
    
                                </Div>
    
                                <Div>
                                    <p>เมื่อเล่นเกมไปแล้วสามารถ</p>
                                    <p>กลับมาเล่นใหม่อีกครั้งได้ตลอดเวลา</p>
                                </Div>
    
                                <Div>
                                    <p>จบเกมแล้วสามารถดูคะแนนรวม</p>
                                    <p>อันดับและสถิติของคุณได้ที่หน้า Profile</p>
                                </Div>
    
                                <Div style={{ marginBottom: '20px' }}>
                                    <p>ถ้าพร้อมแล้วไปเล่นกันเลย</p>
                                </Div>
                            </div>

                            <DivButton>
                                { user ? <Button onClick={ (e) => this.props.getquiz() } disabled={buntton.checkButton}> {buntton.stateButton}</Button> :   

                                   
                                    <ButtonFacebook onClick={ (e) => this.props.login() } > 
                                        <div style={{display:'flex'}}>
                                            <div style={{display:'flex',width:'auto',margin:'auto'}}>

                                                <Icon style = { {fill:'white',paddingRight:'10px'} } icon={'icon-facebook'} color={'#007aff'}  width="24" height="24"/>

                                                <div>
                                                    Login with Facebook 
                                                </div>
                                                 
                                            </div>
                                            
                                        </div>
                                       
                                    </ButtonFacebook>
                                }
                                
                                
                                    <button> 
                                        
                                        <Link href="/" passHref onClick={(e) => { this.props.handleLoder() }}>
                                            <div style={{justifyContent:'center',margin:'auto'}}>
                                                <a style={{color:'white',textDecoration:'none'}}>Back</a> 
                                            </div>
                                        </Link>
                                        
                                    </button>
                                    {/* </a> */}
                                
                                
                            </DivButton>

                        </ContentModal>

                    </Modal>

                )
            }
        }

        return null

    }
}

export default modalStartQuiz


const ContentModal = styled.div`

    max-height:calc(100% - 20px);

    @media (max-width: 360px) {
       
        P{
            font-size:14px !important;
        }

    }
    
    
`;

const Underline = styled.div`
    min-height:1px;
    display:${props => props.open ? "block" : "none"};

    width: 100%;
    height:1px;
    margin-top:10px;
    background-color: rgba(255,255,255,0.5);

`;

const P = styled.p`
        
    color: ${props => props.color};
    display:inline;

`;

const ButtonFacebook = styled.button`
        border-width:1px;
        border-color:rgba(59,89,152,1)!important;
        border-style:solid;
        margin:10px;
        color: white;
        height:40px;
        background-color:rgba(59,89,152,1)!important;

`;

const Button = styled.button`
    background-color:rgba(255,255,255,1) !important;
    height: 55px;
    font-size:16px;
    font-weight:600;
    color: black !important;
    margin:10px;
    border-width:1px;
    border-color:rgba(255,255,255,1)!important;
    border-style:solid;
    
`;

const Div = styled.div`

    margin-bottom:16px;
    margin:10px;

    p{
        margin-top:0px !important;
        margin-bottom:0px;
        font-size:18px;
    }
`;

const DivButton = styled.div`

    display:flex;
    min-height:60px;
    
    flex-direction:column ;

    button{
        border-width:1px;
        border-color:rgba(51,51,51,1);
        border-style:solid;
        margin:10px;
        color: white;
        height:40px;
        background-color:rgba(51,51,51,1);
        cursor:pointer;
    }
    
    @media (max-height: 500px) {
       
        flex-direction:row ;
        button{
            width:50%;
        }
   }
    

`;