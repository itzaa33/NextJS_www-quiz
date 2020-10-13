
import React, { Component } from 'react';
import styled from 'styled-components';


class RenderImage extends Component {
    constructor(props) {

        super(props);

    }

    render()
    {
        const {user, data_HighScore} = this.props
       

        if ( !!user  && !!data_HighScore) 
        {

            const index = parseInt(data_HighScore.rank);
            var point = false
            
            if( parseInt(data_HighScore.point) >= 0 )
            {
                point = true
            }
        
            return (
                <Share  id="renderImage" name="renderImage"  >

                    <Midground>
                        <ImageProfile image = {data_HighScore.photoURL}>
                            <Div >
                                
                                {this.renderImageRank_Share(index)}

                            </Div>
                        </ImageProfile>

                        <ScoreShare>
    
                            <Div>
                                <HighScoreShare >
                                    <div style={{
                                         display:'flex',
                                         flexDirection:'row',
                                         margin:'auto',
                                    }}> 
                                        <Score color = {point}>{ data_HighScore.point}</Score>
                                    </div> 
                                </HighScoreShare>

                                <DescriptionScore>
                                        <SuccessRate>
                                         
                                            <div>
                                                <p>{data_HighScore.success_rate+'%'}</p>
                                            </div>
                                            
                                        </SuccessRate>
                                        <Takequiz>
                                  
                                            <div>
                                                <p>{data_HighScore.form}</p>
                                            </div>
                                        </Takequiz>
                                </DescriptionScore>
                            
                            </Div>
    
                        </ScoreShare>
                    </Midground>
                </Share>
            )
        }
        else
        {
            return null
        }
    }

   
    renderImageRank_Share = (index) =>
    {
        
        // const st = "https://firebasestorage.googleapis.com/v0/b/quiz-3507b.appspot.com/o/ComponentImageShare%2F1st.png?alt=media&token=8f201fa6-1b98-4d42-88ab-008f8f2b1350"
        // const nd = "https://firebasestorage.googleapis.com/v0/b/quiz-3507b.appspot.com/o/ComponentImageShare%2F2nd.png?alt=media&token=f37856da-7454-47f3-864d-3effd1082d8a"
        // const rd = "https://firebasestorage.googleapis.com/v0/b/quiz-3507b.appspot.com/o/ComponentImageShare%2F3rd.png?alt=media&token=22d07415-75f7-4ead-8a57-1cc77b900cfe"
        // const th = "https://firebasestorage.googleapis.com/v0/b/quiz-3507b.appspot.com/o/ComponentImageShare%2F4-10IE.png?alt=media&token=1b202f6d-06f2-4f3a-8dbe-db73e89067d1"
       
        if(index === 1)
        {
           return(

            <>
                <RankImage url ={'/static/rank_img/1st.png'} >
            
                    <div >
                       <p>{index}</p> 
                    </div>    

                </RankImage>
            </>

           ) 
        }
        else if (index === 2)
        {
            return(

                <>
                    <RankImage url = {'/static/rank_img/2nd.png'}>

                        <div>
                        <p>{index}</p> 
                        </div>    

                    </RankImage>

                </>
    
            ) 
        }
        else if (index === 3)
        {
            return(

                <>  
                    <RankImage url ={'/static/rank_img/3rd.png'}>
                        
                    <div>
                        <p>{index}</p> 
                    </div>    
                        
                    </RankImage>
                </>
    
               ) 
        }
        else  if (index > 3 && index <= 10)
        {
            return (
                <RankImage  url = {'/static/rank_img/4-10IE.png'}>
                    <div>
                        <p>{index}</p> 
                    </div>    
                </RankImage>
            )
        }

        
        
    }
}

export default RenderImage;

const Score = styled.p`
    font-size:72px;
    font-weight:600;
    color:${props => props.color ? "#007aff" :"#ed1c24"};
`;

const Midground = styled.div`
    background-image:url("/static/background/midground.png");
    /* background-image:url("https://firebasestorage.googleapis.com/v0/b/quiz-3507b.appspot.com/o/ComponentImageShare%2Fmidground.png?alt=media&token=d251375d-fb5a-4262-98b9-033f05ba93e2"); */
    background-position:center;
    background-repeat:no-repeat;
    background-size:cover;
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction:row;
`;

const SuccessRate = styled.div`
    display:flex;
    align-items:center;
    text-align:center;
    float:left;
    padding-left:85px;
    width:100px;
    div{
        display:flex;
        flex-direction:row;
        margin:auto;

        p{
            font-weight:600;
            font-size:22px;
            margin-bottom:10px;
        }
    }
`;

const Takequiz = styled.div`
    float:right;
    padding-left:0px;
    padding-right:88px;
    width: 72px;

    display:flex;
    align-items:center;
    text-align:center;

    div{
        display:flex;
        flex-direction:row;
        margin:auto;

        p{
            font-weight:600;
            font-size:22px;
            margin-bottom:10px;
        }
    }
`;

const HighScoreShare = styled.div`
    display:flex;
    text-align:center;
    flex-direction:row;
    /* width:115px;
    padding-top:126px;
    padding-left:116px; */

    padding: 0;
    margin: auto;

`;

const DescriptionScore = styled.div`
    /* padding-top:55px; */
    width:100%;
    position: absolute;
    bottom: 9px;
`;

const Share = styled.div`
    left:0;
    background-color:white;
    width: 600px;
    height: 314px;
    display:flex;
    font-family:'Montserrat', 'sans-serif';
    /* background: url("https://firebasestorage.googleapis.com/v0/b/quiz-3507b.appspot.com/o/ComponentImageShare%2Fmain_prize-BG.png?alt=media&token=137f4afd-759e-4fd7-8e0b-fa962350e0e4"); */
    background: url("/static/background/main_prize-BG.png");
    background-position:center;
    background-repeat:no-repeat;

`;

const Div = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;

    position: relative;
`;

const ImageProfile = styled.div`
    width: 250px;
    height: 314px;
    background:${props => props.image ? `url(${props.image}?type=large)` : "/static/default-image.png"};
    background-repeat:no-repeat;
    background-size:cover;
    background-position:center;
    display:flex;
    
`;

const ScoreShare = styled.div`
    width: 350px;
    height: 314px;

    /* background:url(${props => props.image ? props.image+"?type=large" : "/static/default-image.png"}); */
    background-repeat:no-repeat;
    background-size:cover;
    background-position:center;
    display:flex;
    
`;

const  RankImage = styled.div`
    
    width:100px;
    height:100px;
    /* display:flex;
    flex-direction:row; */
    position:relative;
    margin:auto;
    margin-bottom:0px;
    text-align:center;
    align-items:center;
    background-image: ${ props => props.url ? `url(${props.url})` :'none'};
    background-repeat:no-repeat;
    background-size:cover;

    div{
        position:absolute;
        text-align:center;
        /* width:80px;
        height:58px; */
        /* padding-left:6px;
        padding-top:13px; */
       
       width: 100%;
       height: 100%;
       padding: 0;

       display: flex;

       p
       {
            font-size:62px;
            margin:auto;
            font-weight:500;
            margin-bottom:11px;
       }
    }


`;

