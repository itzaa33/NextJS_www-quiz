import React, { Component } from 'react';
import Link from 'next/link'
import User from '../utils/User';
import axios from 'axios';
import styled from 'styled-components'
import Modal from './Modal.js'

import Loading from '../components/Loading.js';
import UA from 'ua-parser-js'


class Header extends React.Component {

    constructor(props) {

        super(props);

        this.state =
            {
                OpenModal: false,
                
                Loading:false,
            }
    }

    login = () => {

        
        const provider = new firebase.auth.FacebookAuthProvider();
        const auth = firebase.auth();

        provider.setCustomParameters({
            'auth_type':'reauthorize',
        })

        const userAgent = UA(navigator.userAgent)
        const isDesktop = userAgent.device.type !== 'mobile' && userAgent.device.type !== 'tablet'

      

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then( async function  () {
                // signInWithPopup
                
                const singInFn = isDesktop ? auth.signInWithPopup(provider) : auth.signInWithRedirect(provider)

                   await singInFn.then( async result => {
                    
                       
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

    logout = () => {

        firebase.auth().signOut();
        User.unset();
        this.drawerToggleClickHandler()
        // window.location.reload();
    }

    drawerToggleClickHandler = () => {
        this.setState({ sideDrawerOpen: !this.state.sideDrawerOpen })
    }

    renderName = () => {


        const { user } = this.props;

        if (user) {

            return (
                <>
                    <Left  style={{display:'flex'}} onClick={(e) => this.HandlerLoading()}>

                        <Link href="/" prefetch passHref >
                            <a>

                                <img src={'/static/MAZSA LOGO.png'} />

                                <p>Quiz Game</p>

                            </a>
                        </Link>
                        
                    </Left>

                    <Right >


                        <Thumbnail src={`${user.photoURL}`} />

                        <p>{decodeURIComponent(user.displayName)}</p>

                        {this.drawerToggleButton()}

                    </Right>
                </>
            );
        }
        else {
            return (
                <>
                    <Left>
                        <Link href="/" prefetch passHref >
                            <a>

                                <img src={'/static/MAZSA LOGO.png'} />

                                <p>Quiz Game</p>

                            </a>
                        </Link>
                    </Left>

                    <Right>

                        <BtnFacebook width={'200px'} height={'49px'} onClick={this.login} />

                    </Right>


                </>
            );
        }

    }

    drawerToggleButton = () => {

        return (

            <Btntoggle onClick={(e) => this.drawerToggleClickHandler()}>
            <div style ={{display:'flex',height:'100%',justifyContent:'space-around',flexDirection:'column'}}>
                <div style={toggle.button_line} />
                <div style={toggle.button_line} />
                <div style={toggle.button_line} />
            </div>

            </Btntoggle>

        )
    }
    HandlerLoading = () => {
        this.setState({
            Loading:!this.state.Loading,
           
        })
    }

    sideDrawer = () => {
        const { user } = this.props

        if (user != null && this.state.sideDrawerOpen == true) {
            const link = "/profile?id_user=" + user.uid
  
            return (
                <div>
                    <Backdrop onClick={(e) => this.setState({ sideDrawerOpen: false })} />
                    
                    <SideDrawer>
                        <ul onClick={(e) => this.setState({ sideDrawerOpen: false })}>

                            <li>
                                <Link href="/quiz" prefetch passHref >
                                    <a> Play Game </a>
                                </Link>
                            </li>

                            <li>
                                <Link href={link} prefetch passHref onClick={this.HandlerLoading}>
                                    <a >Profile</a>
                                </Link>
                            </li>
                            
                            <li>

                                <div onClick={(e) => this.logout()} > Logout </div>
                            </li>

                        </ul>
                    </SideDrawer>

                    
                </div>

            )
        }

    }

   

    handlemodalLogin = () => {

        if (this.props.user === null) {
            this.setState({ OpenModal:true })
           
        }
        else
        {
            this.setState({ OpenModal:false })
        }

       
        
    }

    componentWillMount(){

       
       
    }

     componentDidMount() {
     
        this.handlemodalLogin()

        const userAgent = UA(navigator.userAgent)
        const isDesktop = userAgent.device.type !== 'mobile' && userAgent.device.type !== 'tablet'

        if( !isDesktop && this.props.user === null)
        {
            this.setState({Loading: true,OpenModal:false})

            firebase.auth().onAuthStateChanged(  user => {
        
                if(user)
                {
                    this.setState({Loading: false})
                  
                }
                else
                { 
                    
                    this.setState({ Loading: false,OpenModal:true})
                  
                   
                }
               
                // this.setState({Loading: false})
            })
        }
         
     }

    componentDidUpdate(prevProps, prevState) {

    
        if (prevProps.user !== this.props.user) {

            if(this.props.user !== null)
            {
               this.handlemodalLogin()
            }
           
            //  if( prevProps.user === null && this.props.user !== null  )
            // {
            //     this.setState({ OpenModal: false })
            //     window.location.reload();
            // }

            //console.log(prevProps.user +' --- '+this.props.user)
            
            
        }
       
        
    }

    HandleOpen = () =>{
            this.setState({OpenModal : !this.state.OpenModal})
        }



    render()
    {


        return (

            <>
                
                <Hnavbar>

                    {this.renderName()}

                </Hnavbar>

                <div style={styles.h_grad}></div>


                {this.sideDrawer()}



                {this.props.children}

                <FooterGrad>
                    
                    <DivGruop>

                        <DivFont>
                            <p>© Copyright 2018</p>
                        </DivFont>

                        <DivIcon>
                            <A url = {"/static/social-icon/icon-youtube.jpg"} />
                            <A url = {"/static/social-icon/icon-twitter.png"}/>
                        </DivIcon>
                    </DivGruop>

                </FooterGrad>
               
                <Modal  open={this.state.OpenModal}  priority ={1}colorbackground = {"#1a1a1a"}>

                    <ContentModal>
                        <h1> Register / Login </h1>
                        <Underline open={true} />
                        <p>ลงทะเบียนหรือเข้าสู่ระบบเพื่อเล่นเกม</p>

                        <BtnFacebookModal width={'200px'} height={'49px'} onClick={this.login}>

                        </BtnFacebookModal>
                    </ContentModal>

                </Modal>

                <Loading  open = {this.state.Loading}/>

            </>
        )
    }

}



export default Header;

const ContentModal = styled.div`
    margin:20px;
    max-width:300px;
    max-height:230px;
`;

const A = styled.a`

    background-image:url( ${props => props.url});
    background-repeat:no-repeat;
    background-size:cover;
    background-color:transparent;
    border:0px;
    margin:10px;
    margin-top:20px;
    margin-bottom:20px;
    width: 40px;
    height:40px;
    cursor:pointer;

`;

const Underline = styled.div`

    display:${props => props.open ? "block" : "none"};

    width: 100%;
    height:1px;
    margin-top:10px;
    background-color: rgba(255,255,255,0.5);

     @media (max-width: 320px) {
        display:block;
    }
`;

const Left = styled.div`

    flex-direction:column;
    margin-left:30px;

    img{
        height:30px;
        width:200px;
        
        @media (max-width: 640px   ) {
            
            width:110px;
            height:15px;
        }
    }

    p{
        display:inline;
        margin-left:15px;
        font-size: 16px;
        color: #ffffff;
        @media (max-width: 640px   ) {
            margin-left:5px;
            font-size: 10px;
        }
    }

    a{
        text-decoration: none;
        margin: 1%;
        margin:auto;
        cursor:pointer;
       
    }  

    
    @media (max-width: 640px   ) {
        margin-left:10px;
    
    }

   
`

const Right = styled.div`
    justify-content: flex-end;
    flex:1;
    display:inline-flex;
    align-items:center;
    color: #ffffff;
    margin:10px;

    p{
        @media (max-width: 786px   ) {
            display:none;
    
        }
    }

    

`;

const FooterGrad = styled.footer`
    width:100%;
    bottom:0px;
    display:flex;
    background: red; /* For browsers that do not support gradients */
    background: -webkit-linear-gradient(left, red , blue); /* For Safari 5.1 to 6.0 */
    background: -o-linear-gradient(right, red, blue); /* For Opera 11.1 to 12.0 */
    background: -moz-linear-gradient(right, red, blue); /* For Firefox 3.6 to 15 */
    background: linear-gradient(to right, red , blue); /* Standard syntax (must be last) */

   

`;

const DivGruop = styled.div`
    width:100%;
    display:flex;  
    @media (max-width: 640px) {
        flex-direction:column;
    }
`;

const DivFont = styled.div`
    display:flex;
    margin:auto;
    text-align:center;
    align-items:center;

    @media (min-width: 768px) {
        text-align:left;
        margin:auto;
       
    }

    @media (min-width: 1920px) {
        text-align:left;
        margin:auto;
        margin-left:200px;
    }

`;

const DivIcon = styled.div`

    display:flex;
    margin:auto;
    @media (min-width: 768px) {
        text-align:left;
        margin:auto;
     
    }
      @media (min-width: 1920px) {
        justify-content:flex-end;
        margin-right:200px ;
    }

`;

const BtnFacebook = styled.button`

    width:${props => props.width};
    height:${props => props.height};
    color:white;
    border:0px transparent;  
    text-align: center;
    margin:10px;
    display: inline-block;
    background: url("/static/facebook-login.png");
    background-repeat: no-repeat;
    background-size:cover;
    background-position:center;
    cursor:pointer;
  
   
    &:hover{
        opacity: 0.8;        

    }

      @media (max-width: 640px) {
        width:86px;
        height:20px;
        margin:0px
    }
       
`;

const BtnFacebookModal = styled.button`
    /* width: 155px;
    height:35px;   */
    width:${props => props.width};
    height:${props => props.height};
    /* border-radius: 4px; */
    /* background: #3b5998; */
    color:white;
    border:0px transparent;  
    text-align: center;
    margin:10px;
    display: inline-block;
    background: url("/static/facebook-login.png");
    background-repeat: no-repeat;
    background-size:cover;
    background-position:center;
    /* margin-top:20px; */
    /* margin-right:15px; */
    cursor:pointer;
  
   
    &:hover{
        opacity: 0.8;        

    }

      @media (max-width: 640px) {
        width:162px;
        height:36px;
    }
       
`;

const Btntoggle = styled.button`
        position:relative;
        margin-left:10px;
        margin-right:20px;
        float:right;
        height:25px;
        width:30px;
        background: transparent;
        border:none;
        cursor:pointer;
        padding:0px;
        /* box-sizing:border-box; */
   
    &:focus{
        outline:none;
    }
`;

const SideDrawer = styled.nav`

    max-height:150px;
    background:white;
    box-shadow:2px 0px 5px rgba(0,0,0,0.5);
    position:absolute;
    top:0;
    right:0;
    width:70%;
    max-width:140px;
    z-index:200;
    margin-top:77px;
    border-radius:4px;

    ul{
        /* height:100%; */
        list-style:none;
        display:flex;
        flex-direction:column;
        justify-content:center;
        padding-left:16px;
        margin:10px;

        li {
            cursor:pointer;
        }
    }
    li{
        margin:0.5rem 0;
        @media (max-width: 640px) {
            a{
                font-size:14px;
            }
        }
    }
    a {
        color: #521751;
        text-decoration:none;
        font-size:16px;
        &:hover,
        &:active{
            color: #fa923f;
        }
    }

    div {

        color: #521751;
        text-decoration:none;
        font-size:16px;
        &:hover,
        &:active{
            color: #fa923f;
        }

    }

     @media (max-width: 640px) {
        margin-top:46px;
        max-width:120px;
        max-height:130px;
    }
`;

const Backdrop = styled.div`
    position: fixed;
    top:0;
    width:100%;
    height:100%;
    background: rgba(0,0,0,0.3);
    z-index:100;
`;

const Hnavbar = styled.nav`

    align-items: center;
    background-color: black;
    display:flex;

       
`;


const Thumbnail = styled.img`

    margin-right: 10px;
    margin-top:5px;
    margin-bottom:5px;
    padding: 2px;
    background: red;
    background: linear-gradient(to bottom right, red , blue);
    @media (max-width: 640px   ) {
        width: 35px;
        display:none;
    
    }
        
`;

const toggle = {
    button_line: {
        width: '30px',
        height: '2px',
        background: "#ffffff",
    }
}




const styles = {

    h_grad: {
        height: '5px',
        background: 'red', /* For browsers that do not support gradients */
        background: ' -webkit-linear-gradient(left, red , blue)', /* For Safari 5.1 to 6.0 */
        background: '-o-linear-gradient(right, red, blue)', /* For Opera 11.1 to 12.0 */
        background: '-moz-linear-gradient(right, red, blue)', /* For Firefox 3.6 to 15 */
        background: 'linear-gradient(to right, red , blue)', /* Standard syntax (must be last) */

    },
    f_grad: {
        height: '80px',
        background: 'red', /* For browsers that do not support gradients */
        background: ' -webkit-linear-gradient(left, red , blue)', /* For Safari 5.1 to 6.0 */
        background: '-o-linear-gradient(right, red, blue)', /* For Opera 11.1 to 12.0 */
        background: '-moz-linear-gradient(right, red, blue)', /* For Firefox 3.6 to 15 */
        background: 'linear-gradient(to right, red , blue)', /* Standard syntax (must be last) */

    },



}


