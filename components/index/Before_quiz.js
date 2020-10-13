import React, { Component } from 'react';
import styled from 'styled-components';
import Loading from '../Loading';



class Before_quiz extends Component {

    constructor(props) {

        super(props);


        this.state = {
            status_loading:false,
        }

    }

    getHigthscoreBefore = () =>
    {
       const {data_quizBefore} = this.props
     

            var arr = []
            let index = 1;

            const data_rank = data_quizBefore
          
            if(data_rank !== undefined)
            { 
                data_rank.forEach(items => {
                    
                    arr.push(
                        <tr key={items.id.toString() + '-' + index.toString()}
                        style={{margin:'5px 0px',height:'60px'}}>
                            <td>
                                {this.renderImageRank(index)}
                            </td>
                            <td>
                                {items.name}
                            </td>
                        </tr>
                    )
    
                    index++
                });


            }

            return arr

    }

    renderImageRank = (index) => 
    {
        
        if(index === 1)
        {
           return(

            <>
                
                <DivRank url ={'/static/rank_img/1st.png'} >
                    <p>{index}</p>
                </DivRank>

            </>

           ) 
        }
        else if (index === 2)
        {
            return(

                <>
                    <DivRank url = {'/static/rank_img/2nd.png'}>
                        <p>{index}</p>
                    </DivRank>
                </>
    
            ) 
        }
        else if (index === 3)
        {
            return(

                <>
                    
                    <DivRank url ={'/static/rank_img/3rd.png'}>
                        <p>{index}</p>
                    </DivRank>
                </>
    
               ) 
        }
        else
        {
            return (
                <DivRank >
                    <p>{index}</p>
                </DivRank>
            )
        }     
    }



    render()
    {
        var data = this.getHigthscoreBefore()

        const { status_loading } = this.state
      
        if( !!data || data.length > 0)
        {
            return (
                
                <>
                    <table style={{margin:'auto'}}>
                        {data}
                    </table>
                    <Loading open = { status_loading }/>
                </>
            )
        }
        else
        {
            return (
                <>
                    <p>
                        ไม่มีข้อมูล
                    </p> 
                    <Loading open = { status_loading }/>
                </>
            )
        }
    }
}

export default Before_quiz

const  DivRank = styled.div`
    
    width:50px;
    height:50px;
    display:flex;
    margin:auto;
    margin-bottom:0px !important;
    background-image: ${ props => props.url ? `url(${props.url})` : ''};
    background-repeat:no-repeat;
    background-size:cover;

    p{
        margin:auto;
    }
  
     @media (max-width: 1365px) {

        width:40px;
        height:40px;
        
    }

`;