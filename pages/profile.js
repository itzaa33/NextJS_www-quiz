import React, { Component } from 'react';

import Head from 'next/head'

import Header from '../components/Header';

import OnlyGuest from '../hocs/onlyGuest';

import Modal from '../components/Modal'

import axios from 'axios';

import Link from 'next/link'

// import User from '../utils/User';

import HandleScore from '../components/profile/handleScore'

import styled, { keyframes } from 'styled-components';

import Loading from '../components/Loading.js';

import RenderImage from '../components/profile/renderImage'

import h2c from 'html2canvas'

import UA from 'ua-parser-js'


global.XMLHttpRequest = require("xhr2");


class Profile extends Component {


    static async getInitialProps(ctx) {
        const { req, res, query, pathname } = ctx;

        // const user = User.get(req);
        const URL_id_user = query.id_user

        // if (query.id_user === null || query.id_user === undefined) {
        //     res.writeHead(302, {
        //         Location: '/'
        //     })
        //     res.end()
        //     res.finished = true
        // }

        try {

            const apiUrlHightScore = 'https://asia-northeast1-quiz-3507b.cloudfunctions.net/getHigthscoreMe?id_user=' + URL_id_user;
            const apiurl = 'https://asia-northeast1-quiz-3507b.cloudfunctions.net/getQuizsTitle';

            const p1 = axios.get(apiurl)
            const p2 = axios.get(apiUrlHightScore)
            var url_image = null
            var data_HighScore = null
            var Des_quiz = null
            await Promise.all([p1, p2])
                .then(async arr => {

                    if (arr.length === 2) {

                        const item = arr[0].data

                        data_HighScore = arr[1].data

                        if (item[0] != null) {
                            const title = item[0].title
                            Des_quiz = item[0]

                            const path = title + "/image_sheare/" + URL_id_user + "/" + data_HighScore.image_share
                            const apiurlGetShareImage = 'https://asia-northeast1-quiz-3507b.cloudfunctions.net/getImageShare?path=' + path;

                            url_image = await axios.get(apiurlGetShareImage)
                                .then(value => {
                                    return value.data
                                })
                                .catch(err => {
                                    console.log(err.data)
                                    return null
                                })
                        }
                    }

                })
                .catch(error => {
                    console.log('error getInitialProps = ' + error)
                })

            return {
                data_HighScore,
                URL_id_user,
                url_image,
                Des_quiz,
            }
        }
        catch (error) {
            console.log('error getInitialProps = ' + error)

            return {
                data_HighScore,
                URL_id_user,
                url_image,
                Des_quiz,
            }
        }
    }

    constructor(props) {

        super(props);

        this.state =
            {
                stateModal: false,
                stateModal2: false,
                errorWords: " ",
                status_Loader: false,
                status_LoadImge: false,

            }
    }


    handleModal = () => {
        this.setState({ stateModal: false, stateModal2: false })

    }

    handleLoder = () => {

        this.setState({ status_Loader: true })
    }


    componentDidMount() {
        //----------------------------------------------------------------------------------
        this.handleSaveImage() // เช็คค่าต่างๆ+เซฟภาพ

    }


    handleSaveImage = () => {

        if (!!this.props.data_HighScore && !!this.props.data_HighScore.point) {

            this.saveImage()
        }
        else //if( this.props.data_HighScore === undefined)
        {
            if (this.props.user !== null) {
                if (this.props.user === this.props.URL_id_user) {
                    this.setState({ stateModal: true, errorWords: 'คุณยังไม่ได้เล่น quiz ชุดนี้' })
                }
                else {
                    this.setState({ stateModal2: true, errorWords: 'ผู้ใช้ยังไม่ได้เล่น quiz ชุดนี้' })
                }
            }
            else {
                this.setState({ stateModal2: true, errorWords: 'ผู้ใช้ยังไม่ได้เล่น quiz ชุดนี้' })
            }

        }
    }


    // componentDidUpdate(prevProps, prevState) {

    //     if (prevProps != this.props) {

    //         if( this.props.data_HighScore.point !== undefined && this.props.data_HighScore.statusImage === false)
    //         {

    //             if(!this.state.status_LoadImge)
    //             {
    //                 this.saveImage()
    //             }  
    //         }
    //     }   
    // }

    componentDidUpdate(prevProps, prevState) {


        if (prevProps.user !== this.props.user) {


            if (prevProps.user === null && this.props.user !== null) {

                const userAgent = UA(navigator.userAgent)
                const isDesktop = userAgent.device.type !== 'mobile' && userAgent.device.type !== 'tablet'
                if (isDesktop !== true) {
                    this.handleSaveImage()
                }

            }

            //console.log(prevProps.user +' --- '+this.props.user)

        }

    }


    shere_facebook = () => {
        const id_user = this.props.URL_id_user

        FB.ui({
            method: 'share',
            href: "https://www.localhost-quiz.com/profile?id_user=" + id_user,
            display: 'popup',
            hashtag: `#MAZSA`,
        }, function (response) { });

    }


    saveImage = () => {
        const apiurl = 'https://asia-northeast1-quiz-3507b.cloudfunctions.net/getQuizsTitle';

        axios.get(apiurl)
            .then(async res => {

                const title = (res.data)[0].title

                var node = document.getElementById('renderImage');

                if (node !== null && title !== null && this.props.URL_id_user === this.props.user.uid) {

                    h2c(node, { useCORS: true, proxy: '/proxy-image' }).then(async canvas => {

                        this.canvasToBlob(canvas)
                            .then(blob => {

                                var user = firebase.auth().currentUser;

                                if (user !== null && blob !== null) {

                                    var userid = user.uid;

                                    var name_image = this.props.URL_id_user + new Date().getTime();

                                    var ref = firebase.storage().ref(title + "/image_sheare/" + this.props.URL_id_user + "/" + name_image);

                                    ref.put(blob)
                                        .then(function (snapshot) {

                                            console.log('Picture is uploaded!');
                                            // console.log(snapshot)

                                        })
                                        .then(async () => {

                                            const id = "https://www.localhost-quiz.com/profile?id_user=" + userid
                                            const apiurl = 'https://asia-northeast1-quiz-3507b.cloudfunctions.net/scrape'

                                            const json = {
                                                id_user: userid,
                                                link_url: id,
                                                name_image: name_image,
                                                id_quiz: this.props.Des_quiz.id,
                                            }

                                            await axios.post(apiurl, { data: json })
                                                .then(() => {
                                                    this.setState({ status_LoadImge: true })
                                                })

                                        })
                                        .catch(error => {
                                            console.log(error)
                                            this.setState({ status_LoadImge: true })
                                        })

                                }

                            })

                    })

                }

            })

    }

    canvasToBlob = (canvas) => {
        return new Promise((resolve, reject) => {
            if (canvas.toBlob) {
                canvas.toBlob(resolve)
            }
            else if (canvas.msToBlob) {
                resolve(canvas.msToBlob())
            }
            else {
                reject('browser not supported.')
            }
        })
    }


    render() {

        const { user, URL_id_user, data_HighScore, url_image } = this.props

        var metaobj = {}

        if (!!data_HighScore && !!url_image) {

            metaobj = {
                url: "https://www.localhost-quiz.com/profile?id_user=" + URL_id_user,
                title: "MAZSA Quiz ",
                description: "Point = " + data_HighScore.point,
                image: url_image,
            }
        }

        return (
            <>

                <Head>
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

                    <link href="https://fonts.googleapis.com/css?family=Montserrat|Prompt" rel="stylesheet" />

                    <meta property="fb:app_id" content="387328961740040" />
                    <meta property="og:type" content="article" />
                    <meta property="og:url" content={metaobj.url} />
                    <meta property="og:title" content={metaobj.title} />
                    <meta property="og:description" content={metaobj.description} />
                    <meta property="og:image" content={metaobj.image} />

                </Head>

                <Header user={user}>

                    <div style={{ position: 'absolute', zIndex: '-1', width: '200px', overflowX: 'hidden' }}>

                        <RenderImage {...this.props} />
                    </div>

                    <div id="output" name="output">
                    </div>

                    <HandleScore
                        handleLoder={this.handleLoder}
                        sherefacebook={this.shere_facebook}
                        statusLoadImge={this.state.status_LoadImge}
                        {...this.props}
                    />

                    <Modal open={this.state.stateModal} priority={2} colorbackground={"#1a1a1a"} close={true}>

                        <Div_Modal>
                            <h1> ไม่มีข้อมูล</h1>
                            <Underline />

                            <p>{this.state.errorWords}</p>

                            <button>
                                <Link href="/quiz" passHref onClick={(e) => { this.handleLoder() }}>
                                    <div style={{justifyContent:'center',margin:'auto'}}>
                                        <a>
                                            Go to quiz
                                        </a>
                                    </div>
                                </Link>
                            </button>

                        </Div_Modal>

                    </Modal>

                    <Modal open={this.state.stateModal2} priority={2} colorbackground={"#1a1a1a"} close={true}>

                        <Div_Modal>
                            <h1> ไม่มีข้อมูล</h1>
                            <Underline />

                            <p>{this.state.errorWords}</p>

                            <button>
                                <Link href="/quiz" passHref onClick={(e) => { this.handleLoder() }}>
                                    <div style={{justifyContent:'center',margin:'auto'}}>
                                        <a>
                                            Go to quiz
                                        </a>
                                    </div>
                                </Link>
                            </button>

                        </Div_Modal>

                    </Modal>


                    <Loading open={this.state.status_Loader} />


                </Header>

            </>

        )
    }
}


Profile = OnlyGuest(Profile, '/');
export default Profile;



const Div_Modal = styled.div`
    display:flex;
    flex-direction:column;
    margin: 40px;
    margin-bottom:30px;
    margin-top: 0px ;

    h1{
        margin-bottom:0px;
    }

    p{
        margin:10px;
        margin-bottom:20px;
    }
    button{
        height:35px;
        color:white;
        background-color:rgba(0,0,0,0);
        border-width:1px;
        border-color:white;
        border-style:solid;
    }
`;

const Underline = styled.div`

    width: 100%;
    height:1px;
    margin-top:10px;
    background-color: rgba(255,255,255,0.5);

`;

