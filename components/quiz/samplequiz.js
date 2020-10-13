import React, { Component } from 'react';
import styled from 'styled-components';

import Circle from '../Circle';

class samplequiz extends Component
{
    constructor(props) {

        super(props);
    }

    render(){
        const { status_counttime, time, count} = this.props


        return (
            <>

            <ContentQuiz style={{opacity:'0'}}>
            
         
                <div >
                
                    <img
                        src={'/static/background/BG.png'}
                    />
                       
                </div>

                <div>
                    <h1>???????</h1>
                </div>

                 <GroupButton style={{width:'100%'}}>
                    <button >
                         <IndexChoice>A.</IndexChoice>
                         <ChoiceValue>?????</ChoiceValue>
                    </button>
                    <button >
                         <IndexChoice>B.</IndexChoice>
                         <ChoiceValue>?????</ChoiceValue>
                    </button>
                    <button>
                         <IndexChoice>C.</IndexChoice>
                         <ChoiceValue>?????</ChoiceValue>
                    </button>
                    <button>
                         <IndexChoice>D.</IndexChoice>
                         <ChoiceValue>?????</ChoiceValue>
                    </button>
                </GroupButton>
                

            </ContentQuiz>
            </>
        )
    }
}

export default samplequiz

const ChoiceValue = styled.p`

    flex:1;
    justify-content:center;
    margin:auto;
    
`;

const IndexChoice = styled.p`

    justify-content:left;
    margin:auto;
    margin-left:10px;
`;

const ContentQuiz = styled.div`

    display:flex;
    text-align:center;
    margin:auto;
    margin-top:30px;
    margin-bottom:30px;
    flex-direction:column;
    height: 100vh;

    @media (min-width: 768px) {
       
        margin-top:50px;
    }

   @media (min-width: 1024px) {
        margin-bottom:328px;
             
    }
    @media (min-width: 1025px) {
        margin-bottom:50px;
             
    }

    @media (min-height: 1366px) {
        padding-bottom:20px !important;
             
    }

    

    img{
        
        margin:auto;
       
        width:300px;
        height:200px;
     
        @media (min-width: 375px) {
       
            width:346px;
            height:246px;
        }
        @media (min-width: 768px) {
       
            width:500px;
            height:300px;
        }
        
    }

    div{
        display:flex;
        /* width:100%; */
        margin:auto;
        flex-direction:column;

        button{
            display:flex;
            margin-top:8px;
            margin-bottom:8px;
            height:52px;
            background-color:rgba(0,0,0,0);
            border-width:1px;
            border-color:white;
            border-style:solid;
            align-items:center;
         

            @media (min-width: 768px) {
                margin-top:8px;
                margin-bottom:8px;
            }
        }

        @media (min-width: 768px) {
                margin-top:15px;
             
        }
    }

    h1{
       font-size:26px;
    }

    p{
        color:white;
    }

`;

const GroupButton = styled.button`
    display:flex;
    width: 100%;

    button{
        width: 100%;
    }
`;