import React, { Component } from 'react';

import Header from '../components/Header';

import OnlyGuest from '../hocs/onlyGuest';

import axios from 'axios';

import RenderScore from '../components/quiz/renderScore';

import Modal from '../components/Modal';
import Loading from '../components/Loading';
import Circle from '../components/Circle';
import ModalStartQuiz from '../components/quiz/modalStartQuiz'
import SampleQuiz from '../components/quiz/samplequiz'
import RenderChoice from '../components/quiz/renderChoice'

import styled from 'styled-components';

import Loader from 'react-loader';

import UA from 'ua-parser-js'


class Quiz extends Component {

    constructor(props) {

        super(props);

        this.state = this.getInitialState()
        this.intervals = []
   
    }
    getInitialState = () => {

        const initialState = {

            quiz: null,
            index_quiz: 0,
            status_Takequiz: false,
            stateModal: false,
            errorWords: " ",
            time: 6000,
            imageStatus: false,
            renderScore: false,
            dataScore: null,
            status_Loader: false,
            ModalCheck_Takequiz: false,
            status_counttime:false,
            status_animation:true,

            Button_readdy: ({

                stateButton: "Play Now!",
                checkButton: false,

            }),

        };
        return initialState;
    }

    handleAnimation = () =>{

        this.setState({status_animation:false})

    }
   
    resetState = () => {
        this.setState(this.getInitialState());
     }
     
     handleLoder= () =>{
        this.setState({status_Loader:!this.state.status_Loader})
     }
     
    handleImageLoaded() {
      
        this.setState({ imageStatus: true, status_animation: true });

        // ย้ายไปตอน image load เพราะไม่ควร setState ใน render
        //  if (this.intervals.length === 0  &&  imageStatus ) {
            
            let value = setInterval(this.countTimer, 100)
            this.intervals.push(value);

            this.setState({  status_counttime: true})
            

        // }

    }
    handleImageError() {
      
        this.setState({status_Loader: true});
        localStorage.clear();
        window.location.reload();

    }

    

    handleRenderModal = () =>{
        const { dataScore, HightScore, Old_Score } = this.state
        const { user } = this.props

        if ( dataScore != null && HightScore != null && Old_Score != null  ) {

            let total_quiz = dataScore.true_quiz + dataScore.false_quiz;

            
            return (
                <RenderScore 

                    handleLoder = { this.handleLoder }
                    BestScore = { dataScore.point }
                    LastScore = { Old_Score.point }
                    totalQuiz = { total_quiz }
                    user = { user }
                    dataScore = { dataScore }
                    HightScore = { HightScore }
                />
            )
        }
        else {
            this.setState({renderScore:false})
            this.render_quiz()
        }

    }



    onCloseModal = () => {
        this.setState({

            stateModal: false,

            Button_readdy: {
                checkButton: false,
                stateButton: "Play Now!",
            }

        });
    };

    getquiz = () => {

        this.setState({
   
            Button_readdy: {
                checkButton: true,
                stateButton: "Loading",
            }
        })

        const form = this.state
   
        const backup_id_quiz = localStorage.getItem('backup_id_quiz');
        
        if (backup_id_quiz == null || form.status_Takequiz == true) {
            if (form.status_Takequiz == false && form.quiz != undefined) {
               
                localStorage.setItem('backup_id_quiz', form.quiz[0].id_quiz);
             
                this.setState({

                    status_Loader: false,
                    status_Takequiz: true,

                    Button_readdy: {
                        checkButton: false,
                        stateButton: "Play Now!",
                    }

                })
                
            }
            else {
                this.savequiz()
            }
        }
        else {

            this.setState({
                ModalCheck_Takequiz:true,
                quiz: null,
            })


            this.sum_Json()
        }


    }

    componentDidUpdate(prevProps, prevState) {

        if (prevState.imageStatus != this.state.imageStatus) {
               
            if (this.state.imageStatus == false) {

                this.intervals.forEach(clearInterval);
                this.intervals = []

            }
  
        }   
    }

    componentDidMount() {

        if(this.props.user)
        {
            const urlgetScore = 'https://asia-northeast1-quiz-3507b.cloudfunctions.net/getScore?id_user=' + this.props.user.uid;

            axios.get(urlgetScore)
            .then(res => {

                if((res.data)[0] !== undefined)
                {
                    this.setState({Old_Score : (res.data)[0]})
                }
                else
                {
                    this.setState({Old_Score : {point:0}})
                }
               

            })
            .catch(err =>{
                this.setState({Old_Score : {point:0}})
            })
    
        }

        this.savequiz();

        this.render_quiz()

       
    }


    countTimer = () => {
        if (this.state.time <= 0) {

            this.setState({ status_counttime: false,status_Loader:true})
            this.intervals.forEach(clearInterval);
            this.sum_Json()
        }
        else {
           
            if(this.state.imageStatus )
            {
  
                this.setState({ time: this.state.time - 10 })     
            }
           
        }
    }


    savequiz = async() => {
        if (this.state.status_Takequiz == false) {
            this.setState({
                status_Loader: true,
                Button_readdy: {
                    checkButton: true,
                    stateButton: "Loading",
                }
            })

            const apiUrl = 'https://asia-northeast1-quiz-3507b.cloudfunctions.net/getQuizsform';

            await axios.get(apiUrl)
                .then(res => {

                    localStorage.setItem('backup_dateTime', new Date());

                    if (res.data != null) {

                        this.setState({
                            quiz: res.data,
                            status_Loader: false,
                            Button_readdy: {
                                checkButton: false,
                                stateButton: "Play Now!",
                            },
                        })
                    }

                })
                .catch(error => {
    
                    this.setState({
                        status_Loader: false,
                        errorWords: "ยังไม่มีชุดคำถามของวันนี้",
                        stateModal: true,
                        Button_readdy: {
                            checkButton: false,
                            stateButton: "Play Now!",
                        },
                    })

                });
        }
    }

    savedata_backup = (id_proposition, choice) => 
    {

        const count_quiz = localStorage.getItem('quizResult_Count');

        if (id_proposition !== null && choice !== null) {

            const obj = { "id_proposition": id_proposition, "choice": choice };

            const json = JSON.stringify(obj);

            const index = this.state.index_quiz;

            const length_quiz = (Object.keys(this.state.quiz).length)

            localStorage.setItem('backup_dateTime', new Date());

            if (index <= length_quiz) {
                this.setState({
                    index_quiz: this.state.index_quiz + 1,
                    imageStatus: false,
                })
            }

            if (count_quiz !== null) {

                localStorage.setItem('quizResult_Count', index);

                localStorage.setItem('quizResult_form' + index, json);

                if (index === length_quiz - 1) {

                    this.setState({  status_Loader: true, status_counttime: false})
                    this.intervals.forEach(clearInterval);
                    this.sum_Json()

                }

            }
            else {

                localStorage.setItem('quizResult_Count', index);

                localStorage.setItem('quizResult_form' + index, json);
            }

        }

    }

    sum_Json = async() => {
        
        const quizResult_Count = localStorage.getItem('quizResult_Count');

        const arr = []


        if (quizResult_Count !== null) {

            for (let i = 0; i <= quizResult_Count; i++) {
                const parsejson = JSON.parse(localStorage.getItem('quizResult_form' + i))
                arr.push(parsejson)
            }
        }

        const apiUrl = 'https://asia-northeast1-quiz-3507b.cloudfunctions.net/post_calculate_point'

        const user_data_json = {
            name: this.props.user.displayName,
            photoURL: this.props.user.photoURL,
        }

        const user_data = JSON.stringify(user_data_json)

        await axios.post(apiUrl, {

            idToken_user: this.props.user.idToken,
            id_quiz: localStorage.getItem('backup_id_quiz'),
            form_quiz: arr,
            datetime: localStorage.getItem('backup_dateTime'),
            user_data: user_data,
        })

        localStorage.clear();



        const urlgetScore = 'https://asia-northeast1-quiz-3507b.cloudfunctions.net/getScore?id_user=' + this.props.user.uid;
        const apiUrlHightScore = 'https://asia-northeast1-quiz-3507b.cloudfunctions.net/getHigthscoreMe?id_user=' + this.props.user.uid;

        const p1 =  axios.get(urlgetScore)
        const p2 =  axios.get(apiUrlHightScore)

        await Promise.all([p1, p2])
        .then( async arr => {

            if (arr.length > 0)
            {
               if(arr[0] !== null && arr[1] !== null)
               {
                    var dataScore = (arr[0].data)[0]
                    var HightScore  = arr[1].data
    
                    if( !!dataScore && !!HightScore )
                    {
                        this.setState({
                            ModalCheck_Takequiz:false,
                            status_Loader: false,
                            stateModal: false,
                            renderScore: true,
                            dataScore: dataScore,
                            HightScore:HightScore
                        })
                    }
                    else
                    {
                        await this.savequiz()

                        this.setState({
                            renderScore: false,
                            ModalCheck_Takequiz:false,
                            status_Loader: false,
                            stateModal: false,
                            Button_readdy: ({

                                stateButton: "Play Now!",
                                checkButton: false,
                
                            }),
                        })
                    }
               }
               else
               {
                    await this.savequiz()

                    this.setState({
                        renderScore: false,
                        ModalCheck_Takequiz:false,
                        status_Loader: false,
                        stateModal: false,
                        Button_readdy: ({

                            stateButton: "Play Now!",
                            checkButton: false,
            
                        }),
                    })
               }
            }
            else
            {
                await this.savequiz()

                this.setState({
                    renderScore: false,
                    ModalCheck_Takequiz:false,
                    status_Loader: false,
                    stateModal: false,
                    Button_readdy: ({

                        stateButton: "Play Now!",
                        checkButton: false,
        
                    }),
                })
            }

        })
        .catch( async err =>  {
           
            window.location.reload()
        })


    }

    render_quiz = () => {

        const { index_quiz, status_Takequiz, quiz ,renderScore, status_counttime, time, imageStatus} = this.state

        const user = this.props.user

     
        if (status_Takequiz == true && user !== null && !renderScore  ) 
        {
            const form = quiz[index_quiz]

            const length_quiz = (Object.keys(quiz).length)
    
            
            if (index_quiz < length_quiz && this.state.time > 0) {
                return (
                    <>
                        
                        <ContentQuiz>

                            <div>

                                <GroupImage>
                                    <Circle time = {time} count ={60} status ={status_counttime} />
                                    <img 
                                        style={ this.state.imageStatus ? {opacity:'1'}:{opacity:'0'}}
                                        src={`${form.Picture}`}   
                                        onLoad={this.handleImageLoaded.bind(this)}
        
                                    />
                                </GroupImage>
                                
                            </div>

                            <div>
                                <h1>{form.Proposition}</h1>
                            </div>


                            <div style={{width:'100%',overflow:'hidden'}}>
                                <RenderChoice 
                                    choice      = { form.Choice }
                                    indexQuiz   = { this.state.index_quiz }
                                    quiz        = { this.state.quiz }
                                    imageStatus = { this.state.imageStatus}
                                    statusAnimation = { this.state.status_animation }
                                    savedataBackup = { this.savedata_backup }
                                    handleAnimation = {this.handleAnimation}
                                />
                            </div>

                        </ContentQuiz>
                    </>

                )
            }
            else {

                return(
                    <>
                        <SampleQuiz 
                            count = { 60 }
                            time = { this.state.time }
                            statusCounttime = { this.state.status_counttime }
                        />
                    </>
                )
               
    
            }
        }
        else if (renderScore)
        {
           return(
                <>
                    {this.handleRenderModal()}
                </>
           ) 
        }
        else {

            return(
                <>
                    <SampleQuiz 
                            count = { 60 }
                            time = { this.state.time }
                            statusCounttime = { this.state.status_counttime }
                    />
                </>
            )
           

        }
    }

    login = () => {

        
        const provider = new Firebase.auth.FacebookAuthProvider();
        const auth = firebase.auth();

        provider.setCustomParameters({
            'auth_type':'reauthorize',
        })

        const userAgent = UA(navigator.userAgent)
        const isDesktop = userAgent.device.type !== 'mobile' && userAgent.device.type !== 'tablet'

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then( async function  () {
       
                const singInFn = isDesktop ? auth.signInWithPopup(provider) : auth.signInWithRedirect(provider)

                    singInFn.then( async result => {

                    const user = result.user
 
                    var userobj = {
                        uid: user.uid,
                        name: user.displayName,
                        photoURL: user.photoURL,
                    }
                    
                    var json = JSON.stringify(userobj)
    
                    const apiUrl = 'https://asia-northeast1-quiz-3507b.cloudfunctions.net/Update_User'
                    await axios.post(apiUrl, {
                        user_data: json
                    })

                })


            })


    }
    render() {
        const user = this.props.user

        return (

            <Header user={user}>

                <Content >

                    {this.render_quiz()}
                    

                </Content>

                <ModalStartQuiz 
                
                    statusTakequiz = { this.state.status_Takequiz }
                    renderScore = { this.state.renderScore }
                    ButtonReaddy = { this.state.Button_readdy }
                    user         = { this.props.user }
                    handleLoder = { this.handleLoder }
                    getquiz     = { this.getquiz }
                    login       = { this.login }
                  
                />

                <Loading open={this.state.status_Loader} />

                <Modal open={this.state.stateModal} priority={2} colorbackground={"#1a1a1a"} close={true}>

                    <BtnClost onClick={(e) => this.setState({ stateModal: false })}></BtnClost>
 
                   
                    <div style={{ margin: '50px', marginBottom:'40px' ,marginTop: '0px' }}>

                        <h1 style={{ marginBottom: '0px' }}>คำเตือน</h1>
                        <Underline open={true} />
                        <p>{this.state.errorWords}</p>

                    </div>

                </Modal>
             
                   <Modal open={ this.state.ModalCheck_Takequiz } priority={1} colorbackground={"#1a1a1a"} close={true}>
                    
                    <div style={{ margin: '40px', marginBottom:'30px' ,marginTop: '0px' }}>

                        <h1 style={{ marginBottom: '0px' }}>คำเตือน</h1>
                        <Underline open={true} />
                        <p style={{marginBottom:'0px'}}>มีการทำ quiz แล้ว </p>
                        <p style={{marginTop:'0px'}}>กรุณารอระบบทำการเก็บข้อมูลสักครู่</p>

                        <div style={{padding:'10px',position:'relative'}}>
                            <Loader loaded={false} lines={10} length={8} width={5} radius={10}
                            corners={1} rotate={0} direction={1} color="#fff" speed={1}
                            trail={60} shadow={false} hwaccel={false} className="spinner"
                            zIndex={2e9} top="50%" left="50%" scale={1.00}
                            loadedClassName="loadedContent" />
                        </div>
                       

                    </div>

                </Modal>



            </Header>

        )
    }

}

Quiz = OnlyGuest(Quiz, '/');

export default Quiz;

const GroupImage = styled.div`
    
    display:flex;
    position:relative;

    width:auto !important;

`;

const ContentQuiz = styled.div`

    width: 90%;

    display:flex;
    text-align:center;
    margin:auto;
    margin-top:30px;
    margin-bottom:30px;
    flex-direction:column;

    @media (min-width: 768px) {
       
        margin-top:50px;
   }

   @media (min-width: 1024px) {
        margin-bottom:328px;
             
    }
    @media (min-width: 1025px) {
        margin-bottom:50px;
             
    }

    @media (min-height: 1366px) {
        padding-bottom:20px !important;
             
    }

    

    img{
        
        margin:auto;
       
        width:256px;
        min-height:200px;
     
        @media (min-width: 375px) {
       
            width:310px;
            min-height:246px;
        }
        @media (min-width: 768px) {
       
            width:460px;
            min-height:400px;
        }
        
    }

    div{
        display:flex;
        /* width:100%; */
        margin:auto;
        flex-direction:column;

        button{
            display:flex;
            margin-top:8px;
            margin-bottom:8px;
            height:52px;
            background-color:rgba(0,0,0,0);
            border-width:1px;
            border-color:white;
            border-style:solid;
            align-items:center;
         

            @media (min-width: 768px) {
                margin-top:8px;
                margin-bottom:8px;
            }
        }

        @media (min-width: 768px) {
                /* margin-top:15px; */
             
        }
    }

    h1{
       font-size:26px;
    }

    p{
        color:white;
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
    display:${props => props.open ? "block" : "none"};

    width: 100%;
    height:1px;
    margin-top:10px;
    background-color: rgba(255,255,255,0.5);

`;

const Content = styled.div`
    /* width:100%; */
    display:flex;
    background-image: url('/static/background/main_prize-BG.png');
    background-repeat:no-repeat;
    background-size:cover;

    button{
        cursor:pointer;
    }

`;

