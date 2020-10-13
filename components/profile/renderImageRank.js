import React, { Component } from 'react';
import styled,{keyframes} from 'styled-components';

class renderimageRank extends Component {

    
    constructor(props) {

        super(props);
    }

    render()
    {
        const {index} = this.props

        if(index === 1)
        {
           return(

            <>
                
                <DivRank url ={'/static/rank_img/1st.png'} >

                    <PRank >Rank</PRank>
                    <PNumber>{index}</PNumber>

                </DivRank>
            </>

           ) 
        }
        else if (index === 2)
        {
            return(

                <>
                    <DivRank url = {'/static/rank_img/2nd.png'}>

                        <PRank >Rank</PRank>
                        <PNumber>{index}</PNumber>

                    </DivRank>

                </>
    
            ) 
        }
        else if (index === 3)
        {
            return(

                <>  
                    <DivRank url ={'/static/rank_img/3rd.png'}>
                        
                        <PRank >Rank</PRank>
                        <PNumber>{index}</PNumber>
                        
                    </DivRank>
                </>
    
               ) 
        }
        else  if (index > 3 && index <= 10)
        {
            return (
                <DivRank >
                    
                        <PRank >Rank</PRank>
                        <PNumber>{index}</PNumber>
                        
                </DivRank>
            )
        }
        else
        {
            return (
                
                <DivRank >
                    
                        <PRank >Rank</PRank>
                        <PNumber>{index}</PNumber>
                        
                </DivRank>
            )
        }
    }

}

export default renderimageRank

const  DivRank = styled.div`
    
    width:100px;
    height:100px;
    display:flex;
    flex-direction:column;
    margin:auto;
    margin-bottom:0px;
    background-image: ${ props => props.url ? `url(${props.url})` :''};
    background-repeat:no-repeat;
    background-size:cover;

    @media (min-width: 745px) {
        width:100px;
        height:100px;
        margin-left:100px !important;
    }


`;

const PRank = styled.p`
    margin:auto;
    font-size:12px;
    margin-top:-12px;

`;

const PNumber = styled.p`
    font-size:60px;
    margin:auto;
    
    @media (min-width:745px) {
        font-size:55px;
        margin-top:-14px;
    }
`;
