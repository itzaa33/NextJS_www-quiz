import React, { Component } from 'react';
import styled from 'styled-components';
import DateUtil from '../../utils/DateTime'

class ExplainReward extends Component {

    constructor(props) {

        super(props);
    }

    render() {

        const { Time_Start, Time_End, Rewards } = this.props

        return (
            <>
                <DivRewardFontLeft>

                    <div>
                        <h1 style={{marginTop:'40px'}}>Prize of the week</h1>
                        <Date>{DateUtil.formatDate(Time_Start)} - {DateUtil.formatDate(Time_End)}</Date>
                    </div>

                    <br />

                    <SpanReward>

                        {
                            Rewards.map((item) => {

                                if ( !!item && !!item.name && !!item.rank) {
                                    return (
                                        <div key={'Rewards rank = '+item.rank}>
                                            <li>อันดับ {item.rank}</li>
                                            <p> : {item.name}</p>
                                        </div>
                                    )
                                }

                            })

                        }


                    </SpanReward>

                </DivRewardFontLeft>


                <DivRewardFontRight>

                    <GroupDivReward>

                        {
                            !!Rewards[0] && !!Rewards[0].uri &&
                            <DivReward url={Rewards[0].uri}>
                                <img src={'/static/reward/rank/medals-01.png'} />
                            </DivReward>
                        }


                        {
                            !!Rewards[1] && !!Rewards[1].uri &&
                            <DivReward url={Rewards[1].uri}>
                                <img src={'/static/reward/rank/medals-02.png'} />
                            </DivReward>
                        }

                    </GroupDivReward>

                    <GroupDivReward>

                        {
                            !!Rewards[2] && !!Rewards[2].uri &&
                            <DivReward url={Rewards[2].uri}>
                                <img src={'/static/reward/rank/medals-03.png'} />
                            </DivReward>
                        }

                        {
                            !!Rewards[3] && !!Rewards[3].uri &&
                            <DivReward url={Rewards[3].uri}>
                                <img src={'/static/reward/rank/medals-04.png'} />
                            </DivReward>
                        }

                    </GroupDivReward>


                </DivRewardFontRight>
            </>
        )
    }
}

export default ExplainReward

const DivLeft = styled.div`
    width:50% ;
    margin-left:200px;
    color: white;
    /* margin-bottom:40px; */
    

    p{
        margin:0px;
       
    }
    div{
        /* margin-bottom:16px; */
    }

    @media (max-width: 1365px) {
        width:95%;
        margin:auto;

        h1{
            font-size:28px;
        }
    }

 
`;

const GroupDivReward = styled.div`

    width:100%;

    justify-content:center;

    @media (min-width: 768px) {
        justify-content:left;
    }
`;


const DivRewardFontRight = styled.div`

    display:flex;
    position:relative;
    justify-content:flex-end;
    /* width:auto; */
    align-items:center;
    margin-right:300px;
    margin-top:100px;

    width:50% ;
    color: white; 
    margin:15px;
    margin-left:100px;

    p{
        margin:0px;
       
    }

  
    
    table{

        border-collapse: collapse;
        width: 100%;

        @media (max-width: 1365px) {

            width: 100%;
            margin:auto;

        }
    }
    th{
        text-align: left;
    }
    td{
        padding: 5px;
        text-align: center;

        p{
            font-family:'Montserrat';
            font-size:18px;
            text-align:center;
            margin:auto;

        }

        img{

            width: 50px;
            display:flex;
            margin:auto;
        }

        cursor:pointer;
    }
    tr{
        
        &:nth-child(even){
            background-color: #ffffff47;
            width:inherit;
        }
        &:hover
        {
            background-color:#747171
        }
    }


    div{
        display:flex;
        flex-direction:row;


        @media (max-width: 1365px ) {
            
            margin-bottom:10px;
        }
    }

    @media (max-width: 640px) {
        
        flex-direction:column;
        margin-bottom:10px;
    }

     @media (max-width: 1365px) {
        width:95%;
      
        width:auto;
        margin:auto ;
        margin-bottom:10px;

        h1{
            font-size:28px;
        }
    
    }
    @media (min-width: 1366px) {
        margin-right:200px;
        margin-bottom:-60px;
    }
    @media (min-width: 1920px) {
        margin-right:200px;
    
    }

`;

const DivReward = styled.div`
    margin:auto;
    width: 100px;
    height: 100px;
    margin:10px;
    background-image: url(${ props => props.url});
    background-position:center;
    background-size:cover;
    background-repeat:no-repeat;
   
    img{
        position:absolute;
        width:70px;
        margin-top:98px;
        margin-left:90px;

        @media (max-width: 1365px) {
            width:56px;
            margin-top:65px;
            margin-left:54px;

        }

        @media (min-width: 1366px ) {

            width:60px;
            margin-top:70px;
            margin-left:62px;

        }

        @media (min-width: 1920px ) {

            width:72px;
            margin-top:94px;
            margin-left:90px;

        }
    }
 

    @media (min-width: 1336px   ) {
        width: 110px;   
        height: 110px;
        margin-right:30px ;
    }

    
    @media (min-width: 1920px   ) {
        width: 150px;   
        height: 150px;
        margin-right:40px ;
    }
   
`;


const DivRewardFontLeft = styled.div`
    width:50% ;
    margin-left:200px;
    color: white;
    flex-grow:1;
    margin-bottom:20px !important;

    p{
        margin:0px;
       
    }


    @media (max-width: 1365px) {
        width:95%;
        margin:auto;

        h1{
            font-size:28px;
        }
    }

    @media (min-width: 1366px   ) {
        margin-bottom:0 !important;
    }
`;

const Date = styled.p`
    font-size:15px;

    @media (min-width: 375px ) {
        font-size:16px;
    }
`;
const SpanReward = styled.span`
    text-align:center;

    li{
        display:inline;
        text-decoration:underline;
    }
    p{
        display:inline;
        
    }

    div{
        margin-bottom:10px;
    }

    @media (max-width: 425px) {
        font-size:15px;
        text-align:left;
        
    }
    @media (min-width: 1366px) {
        text-align:left;
        
    }
    @media (min-width: 1980px) {
        text-align:left;
        
    }
    
`;
