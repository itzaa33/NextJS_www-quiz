import React, { Component } from 'react';
import styled,{keyframes} from 'styled-components';

class renderimageRank extends Component {

    
    constructor(props) {

        super(props);
    }

    render()
    {
        const {index} = this.props

        const index_int = parseInt(index)

        if(index_int === 1)
        {
           return(

            <>
                
                <Rank url ={'/static/rank_img/1st.png'} >
                    <p>{index_int}</p>
                </Rank>
            </>

           ) 
        }
        else if (index_int === 2)
        {
            return(

                <>
                    <Rank url = {'/static/rank_img/2nd.png'}>
                        <p>{index_int}</p>
                    </Rank>
                </>
    
            ) 
        }
        else if (index_int === 3)
        {
            return(

                <>
                    
                    <Rank url ={'/static/rank_img/3rd.png'}>
                        <p>{index_int}</p>
                    </Rank>
                </>
    
               ) 
        }
        else if (index_int > 3 && index_int <= 10)
        {
            return (
                <Rank >
                    <p>{index_int}</p>
                </Rank>
            )
        }
    }

}

export default renderimageRank


const  Rank = styled.div`
    
   
    display:flex;
    margin:auto;
    margin-top:0px;
    margin-left:15px;
    margin-bottom:0px ;
    background-image: ${ props => props.url ? `url(${props.url})` : ''};
    background-repeat:no-repeat;
    background-size:contain;
    background-position:center;


        width:66px;
        height:60px;
        margin-right:10px ;


     @media (min-width: 390px) {

        width:66px;
        height:64px;
        margin-right:10px ;
        
    }
    @media (min-width: 412px) {

        width:76px;
        height:76px;
        margin-left:15px ;
        margin-bottom: 10px ;

    }
   
    p{
        font-weight: 100;
        margin:auto;
        font-family:'Montserrat';
       

        @media (min-width: 360px) {

            font-weight: 50;
            font-size:22px;

        }

        
        @media (min-width: 425px) {

            font-weight: 50;
            font-size:32px;

        }
    }

`;