import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import Link from 'next/link'
import ImageRank from '../quiz/renderImageRank'

class renderScore extends Component {


    constructor(props) {

        super(props);
    }

    render() {

        const { BestScore, LastScore, totalQuiz, user, HightScore, dataScore } = this.props

        return (
            <ContentScore>

                <GroupProfile className="bounceInLeft">
                    <Thumbnail src={`${user.photoURL}` + '?type=normal'} />

                    <Name>{user.displayName}</Name>

                    <ImageRank index={HightScore.rank} />

                </GroupProfile>

                <div className="zoomIn">
                    <CircleScore>
                        <ScoreFont>SCORE</ScoreFont>
                        <Score>{BestScore}</Score>
                    </CircleScore>
                </div>

                <DivScore>
                    <DescriptionScore>

                        <div>
                            <p style={{
                                width: '145px',
                                textAlign: 'left',
                                alignItems: 'left'
                            }}>
                                Do quiz:
                        </p>
                            <p style={{
                                width: '60px',
                                textAlign: 'left',
                                alignItems: 'left',
                                fontWeight: '600',
                            }}>
                                {totalQuiz}
                            </p>
                        </div>

                        <div>
                            <p style={{
                                width: '145px',
                                textAlign: 'left',
                                alignItems: 'left'
                            }}>
                                Correct:
                        </p>
                            <p style={{
                                width: '60px',
                                textAlign: 'left',
                                alignItems: 'left',
                                fontWeight: '600',
                            }}>
                                {dataScore.true_quiz}
                            </p>
                        </div>

                    </DescriptionScore>

                    <DescriptionScore >
                        <div>
                            <p style={{
                                width: '145px',
                                textAlign: 'left',
                                alignItems: 'left'
                            }}>
                                Best Score:
                        </p>
                            <p style={{
                                width: '60px',
                                textAlign: 'left',
                                alignItems: 'left',
                                fontWeight: '600',
                            }}>
                                {BestScore}
                            </p>
                        </div>

                        <div>
                            <p style={{
                                width: '145px',
                                textAlign: 'left',
                                alignItems: 'left'
                            }}>
                                Last Score:
                        </p>
                            <p style={{
                                width: '60px',
                                textAlign: 'left',
                                alignItems: 'left',
                                fontWeight: '600',
                            }}>
                                {LastScore}
                            </p>
                        </div>

                    </DescriptionScore>

                </DivScore>
                <div style={{ flexDirection: 'column', width: '100%', maxWidth: '500px' }}>
                    <ButtonPlay>
                        <Link href="/quiz" passHref >
                            <div style={{justifyContent:'center',margin:'auto'}}>
                                <a>
                                    Play Again
                                </a>
                            </div>
                        </Link>
                    </ButtonPlay>

                    <Button>
                        <Link href={'/profile?id_user=' + user.uid} passHref onClick={(e) => { this.props.handleLoder() }}>
                            <div style={{justifyContent:'center',margin:'auto'}}>
                                <a>
                                    Go to Profile
                                </a>
                            </div>
                        </Link>
                    </Button>

                </div>

            </ContentScore>
        )
    }

}

export default renderScore

const GroupProfile = styled.div`

    display:flex;
    width:95%;
    max-width:600px;

    @media (min-width: 767px) {
        
        width:100%;
    }
`;

const Name = styled.p`

    margin:auto;

    font-size:16px;

    @media (min-width: 768px) {
        
        font-size:22px;
    }
`;

const DivScore = styled.div`

    width:100%;
    display:flex;
    
    @media (max-width: 767px) {
        
        flex-direction:column;
    }

    @keyframes bounceInRight {
        from,
        60%,
        75%,
        90%,
        to {
            -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        from {
            opacity: 0;
            -webkit-transform: translate3d(3000px, 0, 0);
            transform: translate3d(3000px, 0, 0);
        }

        60% {
            opacity: 1;
            -webkit-transform: translate3d(-25px, 0, 0);
            transform: translate3d(-25px, 0, 0);
        }

        75% {
            -webkit-transform: translate3d(10px, 0, 0);
            transform: translate3d(10px, 0, 0);
        }

        90% {
            -webkit-transform: translate3d(-5px, 0, 0);
            transform: translate3d(-5px, 0, 0);
        }

        to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
    }

    animation:bounceInRight 2s;

`;

const Thumbnail = styled.img`

    width:76px;
    height:76px;
    margin-right: 15px;
    margin-top:5px;
    margin-bottom:5px;
    padding: 2px;
    background: red;
    background: linear-gradient(to bottom right, red , blue);

    
    @media (max-width: 425px) {

        width:50px;
        height:50px;
        margin-right: 15px;
        margin-left:10px;

    }
 
        
`;


const CircleScore = styled.div`

    width:280px;
    height:280px ;
    flex-direction:column;
    background-image:url('/static/circle.svg');
    background-repeat:no-repeat;
    background-size:cover;
    
    p{
        font-family:'Montserrat';
        font-style:normal;
    }
`;

const ScoreFont = styled.p`

    font-size:30px;
    
`;

const Score = styled.p`

    font-size:100px;
    margin:0px;
    
`;

const ContentScore = styled.div`

    width:100%;
    max-width:1024px;
    display:flex;
    text-align:center;
    margin:auto;
    margin-top:50px;
    margin-bottom:30px;
    flex-direction:column;

    div{

        display:flex;
        margin:auto;
        margin-bottom:20px;

        @keyframes zoomIn 
        {
            from {
                opacity: 0;
                -webkit-transform: scale3d(0.3, 0.3, 0.3);
                transform: scale3d(0.3, 0.3, 0.3);
            }

            50% {
                opacity: 1;
            }
        }

        @keyframes bounceInLeft{
            from,
            60%,
            75%,
            90%,
            to {
                -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
                animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            }

            0% {
                opacity: 0;
                -webkit-transform: translate3d(-3000px, 0, 0);
                transform: translate3d(-3000px, 0, 0);
            }

            60% {
                opacity: 1;
                -webkit-transform: translate3d(25px, 0, 0);
                transform: translate3d(25px, 0, 0);
            }

            75% {
                -webkit-transform: translate3d(-10px, 0, 0);
                transform: translate3d(-10px, 0, 0);
            }

            90% {
                -webkit-transform: translate3d(5px, 0, 0);
                transform: translate3d(5px, 0, 0);
            }

            to {
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
            }
        }

        &.zoomIn{
            animation:zoomIn 2s;
        }
        &.bounceInLeft{
            animation:bounceInLeft 2s;
        }
    }
    
`;

const DescriptionScore = styled.div`

    flex-direction:column;
    margin:auto;
   
    @media (max-width: 767px) {

        margin:0px !important;

    }

    p{
        font-size:20px;
        margin:5px;
    }
`;

const Button = styled.button`
    background-color:rgba(1,1,1,0) !important;
    height: 55px;
    font-size:16px;
    color: white;
    margin:10px;
    border-width:1px;
    border-color:white;
    border-style:solid;
    
`;


const ButtonPlay = styled.button`

    background-color:rgba(255,255,255,1) !important;
    height: 55px;
    font-size:18px;
    font-weight:600;
    color: black;
    margin:10px;
    border-width:1px;
    border-color:rgba(255,255,255,1);
    border-style:solid;
    
`;