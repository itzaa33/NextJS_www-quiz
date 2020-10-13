import React, { Component } from 'react';
import styled from 'styled-components';

import Icon from '../../icons'

class RenderImage extends Component {
    constructor(props) {

        super(props);

        this.renderImageRank_Share = this.renderImageRank_Share.bind(this);
        this.renderHighScoreShare = this.renderHighScoreShare.bind(this);
        this.renderDescriptionScoreShare = this.renderDescriptionScoreShare.bind(this)
        
    }

    render() {
        const {user, data_HighScore} = this.props
        const index = parseInt(data_HighScore.rank);

        if ( user !== null && data_HighScore !== null) 
        {
            var point = false
            if( parseInt(data_HighScore.point) >= 0 )
            {
                point = true
            }
        
            return (
                <Share_image  id="renderImage" name="renderImage"  >

                    <Midground>

                        <Divimg_profile image = {data_HighScore.photoURL}>
                            <Div >
                                
                                    {this.renderImageRank_Share(index)}

                            </Div>
                        </Divimg_profile>

                        <Div_Score_share>
    
                            <Div>
                                <HighScoreShare >
                                    <div style={{
                                         display:'flex',
                                         flexDirection:'row',
                                         margin:'auto',
                                    }}> 
                                        { this.renderHighScoreShare(data_HighScore.point,point)}
                                    </div> 
                                </HighScoreShare>

                                <Des_score>
                                        <Div_Successrateshare>
                                                {/*  */}
                                            <div style={{display:'flex',flexDirection:'row',margin:'auto'}}>
                                                {this.renderDescriptionScoreShare(data_HighScore.success_rate+'%')}
                                            </div>
                                            
                                        </Div_Successrateshare>
                                        <Div_Playshare>
                                        {/*  */}
                                            <div style={{display:'flex',flexDirection:'row',margin:'auto'}}>
                                                {this.renderDescriptionScoreShare(data_HighScore.form)}
                                            </div>
                                        </Div_Playshare>
                                </Des_score>
                            
                            </Div>
    
                        </Div_Score_share>
                    </Midground>
                </Share_image>
            )
        }

        return null
    }

    renderHighScoreShare(score,color)
    {
        const arr = []

        if(score !== undefined)
        {
            const str =  score.toString();
            
            if(color)
            {
               for(let i = 0; i < str.length; i++ )
               {
                   let svg = "b-b-"+str[i]
                   arr.push( <Icon icon={svg} color={'#007aff'} width='44' height='80'/> )
               }
            }
            else
            {
                for(let i = 0; i < str.length; i++ )
               {
                   let svg = "r-b-0"
                    let style = {}
    
                   if(str[i] === '-')
                   {
                    svg = "r-b-m"
                    style['width'] = 24
                    style['marginLeft'] = -32
                   }
                   else
                   {
                    svg = "r-b-"+str[i]
                   }
                   
                   arr.push( <Icon style={style} icon={svg} color={'#ed1c24'}  width='44' height='80'/> )
               }
            }
    
        }
        else
        {
            arr.push( <Icon icon={"b-b-0"} color={'#007aff'} width='44' height='80'/> )
        }
       
        return arr
    }

    renderDescriptionScoreShare(score)
    {
        
        const arr = []
        if(score !== undefined)
        {
            const str =  score.toString();

            for(let i = 0; i < str.length; i++ )
            {
                var svg = "w-n-0"
                if(str[i] === '%')
                {
                    svg = "w-n-p"
                    arr.push( <Icon icon={svg} width="14" height="24" /> )
                }
                else if(str[i] === '.')
                {
                    svg = "w-n-d"
                    arr.push(   <div style ={{marginRight:'4px',marginTop:'9px'}}>
                                    <Icon icon={svg} width="12" height="12" />
                                </div> )
                }
                else
                {
                    svg = "w-n-"+str[i]
                    arr.push( <Icon icon={svg} width="14" height="24" /> )
                }

                
            }
        }
        else{
                arr.push( <Icon icon={"w-n-0"} width="14" height="24" /> )
                arr.push( <Icon icon={"w-n-0"} width="14" height="24" /> )
        }

        return arr
    }

    renderImageRank_Share(index)
    {

        const str = index.toString()

        const arr = []
        
        for(let i = 0; i<str.length;i++)
        {
            const svg = "/static/Montserrat-SVG/SVG/w-n-"+str[i]+".svg"

            arr.push(<> <Num_Share key = {'Num_Share'+str[i]} src ={`${svg}`} /> </>)
        }
        
       
        if(index === 1)
        {
           return(

            <>
                <Div_rank_Share url ={'/static/rank_img/1st.png'} >
            
                    <div>
                        {arr}
                    </div>    

                </Div_rank_Share>
            </>

           ) 
        }
        else if (index === 2)
        {
            return(

                <>
                    <Div_rank_Share url = {'/static/rank_img/2nd.png'}>

                        <div>
                            {arr}
                        </div>    

                    </Div_rank_Share>

                </>
    
            ) 
        }
        else if (index === 3)
        {
            return(

                <>  
                    <Div_rank_Share url ={'/static/rank_img/3rd.png'}>
                        
                    <div>
                        {arr}
                    </div>    
                        
                    </Div_rank_Share>
                </>
    
               ) 
        }
        else  if (index > 3 && index <= 10)
        {
            return (
                <Div_rank_Share  url ={'/static/rank_img/4-10.svg'}>
                    <div 
                        // style={{paddingTop:'19px'}}
                    >
                        {arr}
                    </div>    
                </Div_rank_Share>
            )
        }

        
        
    }

    // render() {
    //     return(
    //         <>
    //             {this.renderImage()}
    //         </>
    //     )
    // }
}

const Midground = styled.div`
    background-image:url('/static/background/midground.png');
    background-position:center;
    background-repeat:no-repeat;
    background-size:cover;
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction:row;
`;

const Div_Successrateshare = styled.div`
    display:flex;
    align-items:center;
    text-align:center;
    float:left;
    padding-left:85px;
    width:100px;
`;

const Div_Playshare = styled.div`
    float:right;
    padding-left:0px;
    padding-right:88px;
    width: 72px;

    display:flex;
    align-items:center;
    text-align:center;
`;

const Num_Share = styled.img`
    width:40px;
    height:66px;
  
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

const Des_score = styled.div`
    /* padding-top:55px; */
    width:100%;
    position: absolute;
    bottom: 24px;
`;

const Share_image = styled.div`
    left:0;
    background-color:white;
    width: 600px;
    height: 314px;
    display:flex;
    font-family:'Montserrat', 'sans-serif';
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

const Divimg_profile = styled.div`
    width: 250px;
    height: 314px;
    background:url(${props => props.image+"?type=large"});
    background-repeat:no-repeat;
    background-size:cover;
    background-position:center;
    display:flex;
    
`;

const Div_Score_share = styled.div`
    width: 350px;
    height: 314px;
    background:url(${props => props.image+"?type=large"});
    background-repeat:no-repeat;
    background-size:cover;
    background-position:center;
    display:flex;
    
    
`;

const  Div_rank_Share = styled.div`
    
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

       img
       {
           margin: auto;
       }
    }


`;



export default RenderImage;
