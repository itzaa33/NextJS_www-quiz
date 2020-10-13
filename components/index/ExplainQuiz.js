import React, { Component } from 'react';
import styled from 'styled-components';

class ExplainQuiz extends Component {

    constructor(props) {

        super(props);
    }

    render() {

        return (
            <>
                <li>
                    <h1>About MAZSA Quiz Game </h1>
                    <div>
                        <p style={{ display: 'inline' }}>
                            ผู้เล่นสามารถเข้ามาตอบคำถามและทาย quiz เกี่ยวกับกีฬากี่รอบก็ได้ต่อวันโดยจะจัดอันดับใหม่ทุกเดือน
                            ซึงผู้ที่มีคะแนนสูงสุดลำดับที่ 1-10 จะได้รับรางวัลที่กำหนดในแต่ละเดือน โดยการเรียงลำดับคะแนนดูจากคะแนนรวมที่ทำได้

                                        </p>
                        <Btnaccordions accordions={this.props.accordions1} onClick={this.props.handleAccordions1} ></Btnaccordions>
                        <Accordions accordions={this.props.accordions1}>
                            หากคะแนนเท่ากันจะดูจาก เปอร์เซ็นการทำถูก หากเท่ากันอีกจะเทียบที่เวลาในการทำ quiz ว่าใครเร็วกว่ากัน เมื่อประกาศผลรางวัลแล้ว
                            ผู้เล่นต้องทำการติดต่อยืนยันตัวเพื่อรับรางวัลภายใน 7 วัน ไม่เช่นนั้นถือว่าสละสิทธิ์
                        </Accordions>

                    </div>
                    <Underline open={true} />

                </li>

                <li>
                    <h1>Rules & How to Play</h1>
                    <p>ตอบคำถามให้ถูกต้องมากที่สุดภายในเวลา 60 วินาที </p>
                    <p>ตอบถูกได้คะแนนข้อละ +10 คะแนน </p>
                    <p>ตอบผิดถูกลดคะแนนข้อละ -10 คะแนน </p>
                    <div />
                    <p>เมื่อเล่นเกมไปแล้วสามารถกลับมาเล่นใหม่ได้ตลอดเวลา </p>
                    <p>จบเกมแล้วสามารถดูคะแนนรวมอันดับและ สถิติของคุณได้ที่หน้า Profile </p>
                    <div />
                    <Btnaccordions accordions={this.props.accordions2} onClick={this.props.handleAccordions2} ></Btnaccordions>
                    <Accordions accordions={this.props.accordions2}>
                        ผู้เล่นสมารถเข้ามาตอบคำถามและทาย quiz เกี่ยวกับกีฬากี่รอบก็ได้ต่อวันโดยจะจัดอันดับใหม่ทุกสัปดาห์
                        ซึงผู้ที่มีคะแนนสูงสุดลำดับที่ 1-10 จะได้รับรางวัลที่กำหนดในแต่ละเดือน โดยการเรียงลำดับคะแนนดูจากคะแนนรวมที่ทำได้
                        หากตะแนนเท่ากันจะดูจาก เปอร์เซ็นการทำถูก หากเท่ากันอีกจะเทียบที่เวลาในการทำ quiz ว่าใครเร็วกว่ากัน เมื่อประกาศผลรางวัลแล้ว
                        ผู้เล่นต้องทำการติดต่อยืนยันตัวเพื่อรับรางวัลภายใน 7 วัน ไม่เช่นนั้นถือว่าสละสิทธิ์
                    </Accordions>

                    <Underline open={false} />
                </li>
            </>
        )
    }
}

export default ExplainQuiz

const Underline = styled.div`

    min-height:1px;
    display:${props => props.open ? "block" : "none" };

    width: 100%;
    height:1px;
    margin-top:10px;
    margin-bottom:10px;
    background-color: rgba(255,255,255,0.5);

     @media (max-width: 1365px) {
        display:block;
    }
`;

const Accordions = styled.p`
    display:inline;
     @media (max-width: 1365px) {
         margin:20px !important;
        display:${props => props.accordions? 'none':'block'};
    }
`;

const Btnaccordions = styled.button`

    display:none;

 @media (max-width: 1365px) {
        display:block;
        width:32px;
        height:32px;
        margin:auto;
        margin-top:10px;
        background:${props => props.accordions? 'url("/static/arrowdown.png")': 'url("/static/arrowup.png")'} ;
        background-repeat: no-repeat;
        background-size:cover;
        background-position:center;
        border:none;

        cursor:pointer;
    }
`;
        
const A = styled.a`
    width:266px;
    height: 40px;
    display:grid;
    background-color:#ffffff00;
    border-color:white;
    color:white;
    margin:20px;
    margin-left:0px;
    border-style:solid;
    border-width:1px;
    text-align:center;
    align-content:center;
    text-decoration:none;

    :hover{
        opacity:0.6
    };

    @media (max-width: 1365px) {
        width:220px;
        height:40px;
        margin:auto;
    }

    
`;