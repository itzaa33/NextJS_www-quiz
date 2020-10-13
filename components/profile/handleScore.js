import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import RenderImageRank from '../profile/renderImageRank';
import Loader from 'react-loader';
import Icon from '../../icons';
import Link from 'next/link';


class handleScore extends Component {

    constructor(props) {

        super(props);

    }


    renderHighScore = (data_HighScore, user) => {
        try {

            var index = 0;

            if (!!data_HighScore && !!data_HighScore.rank) {
                index = parseInt(data_HighScore.rank);
            }

            if (user != null && !!data_HighScore && !!data_HighScore.point && !!data_HighScore.rank) {

                return (
                    <Content>
                        <Container>
                            <Row animation={true}>

                                <div>
                                    <Thumbnail src={`${data_HighScore.photoURL}?type=normal`} />
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Name>{data_HighScore.name}</Name>
                                </div>

                                <RenderImageRank index={index} />

                            </Row>

                            <Row animation={true}>
                                <DivScore>
                                    <p>High Score</p>
                                    <Score>{data_HighScore.point}</Score>
                                </DivScore>

                                <DivScore>
                                    <p>Success Rate</p>
                                    <Score>{data_HighScore.success_rate}%</Score>
                                </DivScore>

                                <DivScore>
                                    <p>Plays</p>
                                    <Score>{data_HighScore.form}</Score>
                                </DivScore>
                            </Row>
                            <Row >
                                <DivButton>

                                    <ButtonPlay style={{ marginLeft: '0px', marginRight: '0px' }}>
                                        <Link href="/quiz" passHref onClick={() => { this.props.handleLoder() }}>

                                            <div style={{justifyContent:'center',margin:'auto'}}>
                                                <a>
                                                    Play Now!
                                                </a>
                                            </div>

                                        </Link>
                                    </ButtonPlay>

                                    <DivRowButton>
                                        <button style={{ marginLeft: '0px' }} >
                                            <Link href="/" passHref onClick={() => { this.props.handleLoder() }}>
                                                <div style={{justifyContent:'center',margin:'auto'}}>
                                                    <a>
                                                        Back
                                                    </a>
                                                </div>
                                            </Link>
                                        </button>

                                        <button style={{ marginRight: '0px', backgroundColor: '#3a5a8f', borderColor: '#3a5a8f' }}
                                            disabled={!this.props.statusLoadImge}
                                            onClick={(e) => this.props.sherefacebook()
                                            }>
                                            <div>
                                                <div style={{ display: 'flex', width: 'auto' }}>
                                                    {this.props.statusLoadImge ?

                                                        <Icon style={{ fill: 'white', paddingRight: '10px' }}
                                                            icon={'icon-facebook'}
                                                            color={'#007aff'}
                                                            width="24" height="24" />

                                                        :

                                                        <div style={{ padding: '10px', position: 'relative', width: '40px' }}>
                                                            <Loader loaded={false} lines={10} length={3} width={5} radius={8}
                                                                corners={1} rotate={0} direction={1} color="#fff" speed={1}
                                                                trail={60} shadow={false} hwaccel={false} className="spinner"
                                                                zIndex={2e9} top="50%" left="50%" scale={1.00}
                                                                loadedClassName="loadedContent" />
                                                        </div>}

                                                    {this.props.statusLoadImge ? 'Share to Facebook' : 'Procssing'}
                                                </div>
                                            </div>

                                        </button>

                                    </DivRowButton>

                                </DivButton>
                            </Row>
                        </Container>

                    </Content>
                )
            }
            else {

                return (
                    <Content>
                        <Container>
                            <Row animation={true}>

                                <div>
                                    <Thumbnail src={data_HighScore ? `${data_HighScore.photoURL}?type=normal` : '/static/default-image.png'} />
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Name>{data_HighScore ? data_HighScore.name : '????'}</Name>
                                </div>

                                <RenderImageRank index={index} />

                            </Row>

                            <Row animation={true}>
                                <DivScore>
                                    <p>High Score</p>
                                    <Score>{!!data_HighScore ? data_HighScore.point : '00'}</Score>
                                </DivScore>

                                <DivScore>
                                    <p >Success Rate</p>
                                    <Score>{data_HighScore ? data_HighScore.success_rate : '0.00'}%</Score>
                                </DivScore>

                                <DivScore>
                                    <p>Plays</p>
                                    <Score>{data_HighScore ? data_HighScore.form : '0'}</Score>
                                </DivScore>
                            </Row>
                            <Underline style={{ width: '90%', margin: 'auto', marginBottom: '40px' }} />

                            <Row >
                                <DivButton>

                                    <ButtonPlay style={{ marginLeft: '0px', marginRight: '0px' }} >
                                        <Link href="/quiz" passHref onClick={() => { this.props.handleLoder() }}>
                                            <div style={{justifyContent:'center'}}>
                                                <a>
                                                    Play Now!
                                                </a>
                                            </div>
                                        </Link>
                                    </ButtonPlay>
                                    <DivRowButton>
                                        <button style={{ marginLeft: '0px', marginRight: '0px' }}>
                                            <Link href="/" passHref onClick={() => { this.props.handleLoder() }}>
                                                <div style={{justifyContent:'center'}}>
                                                    <a>
                                                        Back
                                                    </a>
                                                </div>
                                            </Link>
                                        </button>
                                    </DivRowButton>

                                </DivButton>
                            </Row>
                        </Container>

                    </Content>
                )
            }

        }
        catch (err) {

            console.log("renderHighScore err =" + err)
        }
    }


    render() {
        const { URL_id_user, user, data_HighScore } = this.props

        if (user != null) {
            if (URL_id_user === user.uid && data_HighScore && data_HighScore.point !== undefined) {
                return (
                    <div>
                        {data_HighScore != null ? this.renderHighScore(data_HighScore, user) : "รอการอัพเดตข้อมูล 4-5 นาที"}
                    </div>
                )
            }
            else {
                return (
                    <div>
                        {this.renderHighScore(data_HighScore, null)}
                    </div>
                )

            }
        }
        else {

            return (
                <div>
                    {this.renderHighScore(data_HighScore, null)}
                </div>
            )
        }
    }

}

export default handleScore

const Content = styled.div`
    
    display:flex;
    margin:auto;
    padding-top:38px;
    padding-bottom:72px;
    background:url("/static/background/main_prize-BG.png");
    background-position:center;
    background-repeat:no-repeat;
    background-size:cover;

    @media (min-height: 813px) {
        padding-top:130px !important;
        padding-bottom:214px !important;
    }
    @media (min-height: 1366px) {
        padding-top:214px  !important;
        padding-bottom:472px  !important;
    }
    @media (min-width: 745px) {
        padding-top:100px;
        padding-bottom:130px;
    }
`;

const Container = styled.div`
    display:flex;
    flex-direction:column;
    margin:auto;

    width:100%;
    max-width:1024px;

    @media (min-width: 768px) {
       
        padding:0 20px;

    }
   
`;

const Row = styled.div`
    width:90%;
    margin-left:10px;
    margin-right:10px;
    margin-bottom:60px;
    display:flex;
    flex-direction:column;
    margin:auto; 
    justify-content:space-between;
    font-family:'Montserrat', 'sans-serif';

    div{
      
        margin:auto;
        text-align:center;

        @media (max-width:744px) {
            margin-bottom:20px;
        }
    }

    @media (min-width:745px) {
        width:100%;
        flex-direction:row;
        margin-left:0px;
        margin-right:0px;
        margin-bottom:60px;
    }

    @keyframes zoomInDown {
        from {
            opacity: 0;
            -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);
            transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);
            -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
            animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
        }

        60% {
            opacity: 1;
            -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);
            transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);
            -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
            animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
        }
    }

    animation:${props => props.animation ? 'zoomInDown' : ''} 2s;


`;

const Thumbnail = styled.img`

    width:80px;
    height:80px;
    margin:auto;
    padding: 2px;
    background: red;
    background: linear-gradient(to bottom right, red , blue);



    @media (min-width:745px) {
        width:78px;
        height:78px;
        margin-right: 20px;
        margin-top:5px;
        margin-bottom:5px;
    }
        
`;

const DivButton = styled.div`

    display:flex;
    
    flex-direction:column ;
    width:100%;

    div{
        
        width:100%;
        display:flex;
        flex-direction:row;
        margin:auto;
        
      
    }

    button{
        width:100%;
        border-width:1px;
        border-style:solid;
        border-color:white;
        margin:10px;
        color: white;
        height:54px;
        background-color:rgba(0,0,0,0);
        cursor:pointer;
        @media (max-width:744px) {
            margin-left:0px;
            margin-right:0px;
        }
    }

    
    @media (min-width:768px) {
        
        max-width:515px;
        justify-content:center;
    }
`;

const ButtonPlay = styled.button`

        width:100%;
        border-width:1px;
        border-style:solid;
        border-color:white;
        margin:10px;
        font-size:18px !important;
        font-weight:600 !important;
        color: black !important;
        height:54px;
        background-color:rgba(255,255,255,1) !important;
        cursor:pointer;
        @media (max-width:744px) {
            margin-left:0px;
            margin-right:0px;
        }
`;

const Name = styled.p`
    font-weight:600;
    font-size:22px;
    margin:0px;
    align-items:center;

    @media (min-width:745px) {
        font-size:28px;
    }
`;


const DivScore = styled.div`
    @media (max-width:744px) {
        display:flex;
        margin:auto;
        text-align:center;
        flex-direction:row;
        
    }
    p{
        margin:auto;
        text-align:center;

        @media (max-width:744px) {
            width:132px;
            margin:auto;
            text-align:left;
            align-items:left;
        }
    }

`;
const Score = styled.p`
    font-size:44px;
    margin:auto;
    margin-top:10px;
    @media (max-width:744px) {
        width:125px !important;
        font-size:28px;
        margin:auto;
        text-align:left;
        align-items:left;
    }
`;

const Underline = styled.div`

    width: 100%;
    height:1px;
    margin-top:10px;
    background-color: rgba(255,255,255,0.5);

`;

const DivRowButton = styled.div`

    @media (max-width:744px) {
        flex-direction:column !important;
        
    }

`;