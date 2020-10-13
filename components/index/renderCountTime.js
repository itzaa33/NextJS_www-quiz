import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link'

import padStart from 'pad-start';

class renderCountTime extends Component {
    constructor(props) {
        super(props);

        this.state =
            {
                count_time: this.countTime(this.props.date_quiz),

            }

    }

    startgame = () => {
        const user = this.props.user;

        if (user) {
            return (

                <ButtonCountTime>
                    <Link href="/quiz" passHref onClick={() => { this.props.handleLoder() }} >
                        <div style={{justifyContent:'center',margin:'auto'}}>
                            <a>
                                Play Now!
                            </a>
                        </div>
                    </Link>
                </ButtonCountTime>

            );
        }
    }

    countTime = (time) => {
        const DAY_MS = 86400000
        const HOUR_MS = 3600000
        const MIN_MS = 60000
        const SEC_MS = 1000

        const d = Math.floor(time / DAY_MS)
        const h = Math.floor(time % DAY_MS / HOUR_MS)
        const m = Math.floor(time % DAY_MS % HOUR_MS / MIN_MS)
        const s = Math.floor(time % DAY_MS % HOUR_MS % MIN_MS / SEC_MS)

        // const dd = d.toString().padStart(2, '0')
        // const hh = h.toString().padStart(2, '0')
        // const mm = m.toString().padStart(2, '0')
        // const ss = s.toString().padStart(2, '0')

        const dd = padStart(d.toString(), 1, '0')
        const hh = padStart(h.toString(), 2, '0')
        const mm = padStart(m.toString(), 2, '0')
        const ss = padStart(s.toString(), 2, '0')

        const count_time = {
            dd: dd,
            hh: hh,
            mm: mm,
            ss: ss,
        }
        // console.log('d = '+count_time.dd+' h = '+count_time.hh +' m = '+count_time.mm+' s = '+count_time.ss)

        return count_time;
    }


    componentWillMount() {
        const { date_quiz } = this.props

        if (!!date_quiz && !!date_quiz[0] && !!date_quiz[0].Time_End) {

            const time_quiz = date_quiz[0].Time_End
            const date_time = new Date(time_quiz)



            const year = date_time.getFullYear()
            const month = date_time.getMonth()
            const day = date_time.getDate()
            const hour = date_time.getHours()
            const min = date_time.getMinutes()
            const sec = date_time.getSeconds()

            const target = new Date(year, month, day, hour, min, sec)

            let time = target - new Date()
            let count_time = this.countTime(time)
            this.setState({ count_time: count_time })
        }

    }

    render() {
        const { date_quiz } = this.props
        if (!!date_quiz && !!date_quiz[0] && !!date_quiz[0].Time_End) {
            const time_quiz = date_quiz[0].Time_End
            const date_time = new Date(time_quiz)



            const year = date_time.getFullYear()
            const month = date_time.getMonth()
            const day = date_time.getDate()
            const hour = date_time.getHours()
            const min = date_time.getMinutes()
            const sec = date_time.getSeconds()

            const target = new Date(year, month, day, hour, min, sec)


            setInterval(() => {
                const time = target - new Date()

                let last_count_time = this.countTime(time)

                if (this.state.count_time.ss != last_count_time.ss) {
                    this.setState({ count_time: last_count_time })

                }

            }, 1000)


            const { count_time } = this.state

            var check_count = false

            if (parseInt(count_time.dd) > 1) {
                check_count = true
            }


            return (

                <DivCounttime>
                    <div style={{ flex: '1' }} />

                    <div>
                        <ul>
                            <span>
                                <p>End quiz of this week in</p>

                                <Blod2> {count_time.dd} </Blod2>

                                <p>{check_count ? 'days' : 'day'}</p>
                            </span>

                            <Blod style={{ margin: '20px' }}> {count_time.hh} : {count_time.mm} : {count_time.ss}</Blod>

                            {this.startgame()}
                        </ul>
                    </div>

                </DivCounttime>
            )
        }
        else {

            return (

                <DivCounttime>

                    <div style={{ flex: '1' }} />
                    <div >

                        <ul>

                            <span>
                                <p>End quiz of this week in</p>
                                <Blod2> 0 </Blod2>
                                <p>day</p>
                            </span>

                            <Blod> 00 : 00 : 00</Blod>

                        </ul>

                    </div>


                </DivCounttime>
            )

        }

    }

}

export default renderCountTime

const Blod = styled.p`

    font-family:'Montserrat';
    font-weight:bold;
   
    @media (min-width: 320px) {
        font-size:34px !important;
    }
    @media (min-width: 425px) {
                font-size:40px !important;
    }
    @media (min-width: 768px) {
                font-size:50px !important;
    }
    @media (min-width: 1024px) {
        font-size:${props => props.weight};
    }


`;


const Blod2 = styled.p`

    font-family:'Montserrat';
    font-weight:bold;
   

    @media (min-width: 320px) {
        font-size:20px !important;
    }
    @media (min-width: 425px) {
                font-size:26px !important;
    }
    @media (min-width: 768px) {
                font-size:30px !important;
    }
    @media (min-width: 1024px) {
        font-size:${props => props.weight};
    }


`;

const DivCounttime = styled.div`

    
    width:100%;
    height:268px;
    display:flex;
    align-items:center;
    color: #ffffff;
    background-image:url('/static/background/main_banner-BG.png');
    background-repeat:no-repeat;
    background-size:cover;
    background-position:center;

    @keyframes bounceLeft 
    {
        0% {
            opacity: 0;
            /* transform: translateX(2000px); */
        }
        100% {
            opacity: 1;
            /* transform: translateX(0); */
        }
        
    }

    div{

        animation: bounceLeft 1s;
        @media (max-width: 1023px) {
                width:100%;
            }
    }

    span{
       
        margin:auto;
        p{
            display:inline;

            @media (min-width: 320px) {
                font-size:16px;
            }
            @media (min-width: 425px) {
                font-size:20px ;
             }
             @media (min-width: 768px) {
                font-size:30px ;
             }
   
        }

        @media (min-width: 1024px) {
            margin:20px;
        }

    }

    ul{

        margin:0px;
        padding:0px;
        text-align:center;
    
        @media (min-width: 1024px) {
            margin:auto;
            margin-right:220px;
            padding:0px;
        }

    }

    @media (min-width: 768px) {
            height: 290px;
    }
    @media (min-width: 1025px) {
            height: 400px;
    }
    
`;

const Button = styled.button`
    width:400px;
    height: 45px;
    background-color:rgba(0,0,0,0);
    border-color:white;
    border-style:solid;
    border-width:1px;
    color:white;
    align-items:center;
    margin:20px;
    

    @media (max-width: 1365px) {
        width:240px;
    }

`;

const ButtonCountTime = styled.button`

    width:170px;
    height:42px;
    background-color:rgba(255,255,255,1);
    cursor:pointer;
    border-color:rgba(255, 255, 255, 1);
    border-width:2px;
    font-family:'Montserrat';
    font-size:18px;
    font-weight:600;
    color:black;

    border-color:white;
    border-style:solid;
    border-width:1px;
    align-items:center;
    margin:20px;
    

    @media (min-width: 376px) {
        width:50%;
        height:60px !important; 
        font-size:26px;
    }
    

    @media (min-width: 1025px) {
        width:65%;
        height:55px !important; 
        font-size:24px;
    }

    @media (max-width: 1365px) {
        width:240px;
    }
    

   @keyframes pulse {
        from {
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }

        50% {
            -webkit-transform: scale3d(1.3, 1.3, 1.3);
            transform:  scale3d(1.3, 1.3, 1.3);
        }

        to {
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }
    }

    animation:pulse 2s;

    
`;
