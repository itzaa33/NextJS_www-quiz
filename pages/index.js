import React, { Component } from 'react';
import styled,{keyframes} from 'styled-components';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Router from 'next/router'
import OnlyGuest from '../hocs/onlyGuest';
import axios from 'axios';
import BeforeQuiz from '../components/index/Before_quiz'
import RenderRank from '../components/index/renderRank'
import RenderCountTime from '../components/index/renderCountTime'
import ExplainQuiz from '../components/index/ExplainQuiz'
import ExplainReward from '../components/index/ExplainReward'
import Modal from '../components/Modal'


class Page extends Component {


    static async getInitialProps() {

        const getHigthscoreBefore = 'https://asia-northeast1-quiz-3507b.cloudfunctions.net/getHigthscoreBefore?rank=10';
        const apiurl = 'https://asia-northeast1-quiz-3507b.cloudfunctions.net/getHigthscore?rank=10';
        const apiurlgetQuizsTitle = 'https://asia-northeast1-quiz-3507b.cloudfunctions.net/getQuizsTitle';

        const p1 = axios.get(apiurl)
        const p2 = axios.get(apiurlgetQuizsTitle)
        const p3 = axios.get(getHigthscoreBefore)
        
        const query = await Promise.all([p1, p2, p3])
        
        return {
            data_rank : !!query[0].data ? query[0].data : null,
            date_quiz : query[1].data,
            data_quizBefore : query[2].data
        }
    }

    constructor(props) {

        super(props);

        this.state =
        {

            submitting: false,
            sending: false,

            accordions1:true,
            accordions2:true,
            status_loading:false,
            OpenModal:false,

        }
        
    }

    
    
    handleModal = () =>
    {
        this.setState({OpenModal : !this.state.OpenModal})
    }

    handleAccordions1 = () =>
    {
        this.setState({accordions1 : !this.state.accordions1})
    }
    handleAccordions2 = () =>
    {
        this.setState({accordions2 : !this.state.accordions2})
    }

    handleLoder= () => {
        this.setState({status_loading:true})
    }
    
    // RouterProfile = (id) =>
    // {
        
    //     this.handleLoder()

    //     Router.push('/profile?id_user='+id)

    // }

    render() {
        const { user, date_quiz, data_quizBefore } = this.props;
        
        const {accordions1, accordions2, OpenModal, status_loading} = this.state

        return (
            
            <Header user={user}>
                <>

                    <RenderCountTime 
                        { ...this.props } 
                        handleLoder = {this.handleLoder}
                    />
    
                    <Content>

                        <DivLeft>
                                
                            <ExplainQuiz
                                accordions1 = { accordions1}
                                accordions2 = { accordions2}
                                handleAccordions1 = { this.handleAccordions1 }
                                handleAccordions2 = { this.handleAccordions2 }
                            />

                        </DivLeft>

                        <DivRigth>
                            <div>
                                <h1>Top Rank</h1>
                                
                                <RenderRank
                                    { ...this.props }
                                    handleLoder = {this.handleLoder}
                                    
                                />

                            </div>

                        </DivRigth>

                    </Content>

                    <ContentReward>

                        <>

                            {
                                !!date_quiz && !!date_quiz[0] && !!date_quiz[0].Rewards ?
                                    
                                <div>

                                    <GroupReward>

                                        <ExplainReward
                                            Time_Start = {date_quiz[0].Time_Start}
                                            Time_End = {date_quiz[0].Time_End}
                                            Rewards = {date_quiz[0].Rewards}
                                        />

                                    </GroupReward>

                                    <Button onClick={ (e) => this.handleModal() }>
                                                                    
                                        ดูรายชื่อผู้ได้รับรางวัล

                                    </Button>  
                                </div>

                                :

                                <OldReward>

                                    <h1>ประกาสผลรางวัลสัปดาห์ก่อน</h1>

                                    <Button onClick={ (e) => this.handleModal() }>
                                    
                                        ดูรายชื่อผู้ได้รับรางวัล
                                
                                    </Button>

                                </OldReward>
                            }
                            
                        </>

                    </ContentReward>

                    <Modal  open={OpenModal}  priority = {1} colorbackground = {"#1a1a1a"} close={true}>

                            <BtnClost onClick={(e) => this.handleModal() }></BtnClost>

                        <div style = {{padding:'10px 25px'}} >

                            <ContentModal>

                                <h1> ลำดับผู้ทำคะแนนสูงสุดสัปดาห์ก่อน </h1>

                                <Underline open={true} />

                                <div style={{overflow:'auto'}}>
                                    <BeforeQuiz {...this.props} />
                                </div>

                            </ContentModal>
                            
                        </div>
                      
                    </Modal>

                    <Loading open = {status_loading}/>
          
                </>

            </Header>
        )
    }

}


Page = OnlyGuest(Page, '/');


export default Page;


const ContentModal = styled.div`

    display:flex;
    flex-direction:column;
    max-height:calc(100% );

    @media (max-width: 360px) {
       
        P{
            font-size:14px !important;
        }

    }
    
`;

const BtnClost = styled.button`
    width:30px;
    height:30px;
    position:absolute;
    border:0px;
    right:12px;
    background: url("/static/close-window.png");
    background-repeat: no-repeat;
    background-size:cover;
    float:right;
    cursor:pointer;
   
`;


const Underline = styled.div`

    min-height:1px;

    width: 100%;
    height:1px;
    margin-top:10px;
    margin-bottom:10px;
    background-color: rgba(255,255,255,0.5);

     @media (max-width: 1365px) {
        display:block;
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


const DivLeft = styled.div`
    width:50% ;
    margin-left:200px;
    color: white;
    margin-bottom:40px;
    

    p{
        margin:0px;
       
    }
    div{
        margin-bottom:16px;
    }

    @media (max-width: 1365px) {
        width:95%;
        margin:auto;

        h1{
            font-size:28px;
        }
    }

 
`;


const GroupReward = styled.div`
    display:flex;
    margin-bottom:10px;


    @media (max-width: 1365px) {

        flex-direction:column;

    }

`


const DivRigth = styled.div`

    width:50% ;
    color: white;
    margin-bottom:40px;
    justify-content:flex-end;
    margin:15px;
    margin-top:0;
    margin-right:200px;
    margin-left:100px;

    

    p{
        margin:0px;
       
    }
    div{
        margin-bottom:16px;
    }

    div{
        display:flex;
        flex-direction:column;
        
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
        padding:0 5px;
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

    @media (max-width: 1365px) {
        width:95%;
        margin:auto;

        h1{
            font-size:28px;
        }
    }


`;


const Content = styled.div`
    
    width:100%;
    /* position:relative; */
    display:flex;
    background: #5c0303; /* For browsers that do not support gradients */
    background: -webkit-linear-gradient(left, #5c0303 , #060653); /* For Safari 5.1 to 6.0 */
    background: -o-linear-gradient(right, #5c0303, #060653); /* For Opera 11.1 to 12.0 */
    background: -moz-linear-gradient(right, #5c0303, #060653); /* For Firefox 3.6 to 15 */
    background: linear-gradient(to right, #5c0303 , #060653); /* Standard syntax (must be last) */


    li{
        list-style-type: none;
    }

     @media (max-width: 1365px) {
        flex-direction:column;
        width:100%;
        text-align:center;
    }

`;

const ContentReward = styled.div`

width:100%;
    /* position:relative; */
    display:flex;
    background: #5c0303; /* For browsers that do not support gradients */
    background: -webkit-linear-gradient(left, #5c0303 , #060653); /* For Safari 5.1 to 6.0 */
    background: -o-linear-gradient(right, #5c0303, #060653); /* For Opera 11.1 to 12.0 */
    background: -moz-linear-gradient(right, #5c0303, #060653); /* For Firefox 3.6 to 15 */
    background: linear-gradient(to right, #5c0303 , #060653); /* Standard syntax (must be last) */



    flex-direction:column;
    background-image: url('/static/background/main_prize-BG.png');
    background-repeat:no-repeat;
    background-size:cover;
    background-position:center;
    h1{
        
        margin-bottom:0px;
    }
    p{
        margin-bottom:10px
    }

    li{
        list-style-type: none;
    }

    Button{
        
        cursor:pointer;

        @media (max-width: 1365px) {
            
            align-items:center;  
            margin:10px;
            margin-bottom:20px;
            width:80%;
        }

         @media (min-width: 1366px) {
            
            align-items:center;  
            margin:10px;
            margin-bottom:20px;
            width:350px;
            margin-left:200px ;
            margin-bottom:65px;
        }

    }

      @media (max-width: 425px) {
        flex-direction:column;
        
    }

    @media (max-width: 1365px) {
        flex-direction:column;
        width:100%;
        text-align:center;
    }


`;

const OldReward = styled.div`

    h1{

        margin-bottom:20px !important;
        font-size:24px;
       
    }

    @media (max-width: 425px) {
        
        h1{
            
            font-size:28px;
        }
        
    }

    @media (min-width: 1366px) {
            
        h1{

            margin-left:200px;
        }
    }

`;

