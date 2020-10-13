import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

import Link from 'next/link'

class renderRank extends Component {
    constructor(props) {

        super(props);

    }

    renderImageRank = (index) => {

        if (index === 1) {
            return (

                <>

                    <DivRank url={'/static/rank_img/1st.png'} >
                        <p>{index}</p>
                    </DivRank>
                </>

            )
        }
        else if (index === 2) {
            return (

                <>
                    <DivRank url={'/static/rank_img/2nd.png'}>
                        <p>{index}</p>
                    </DivRank>
                </>

            )
        }
        else if (index === 3) {
            return (

                <>

                    <DivRank url={'/static/rank_img/3rd.png'}>
                        <p>{index}</p>
                    </DivRank>
                </>

            )
        }
        else {
            return (
                <DivRank >
                    <p>{index}</p>
                </DivRank>
            )
        }
    }


    set_rankuser = (value) => {

        const data_rank = value

        var arr = []
        let index = 1;


        data_rank.forEach(items => {

            arr.push(
                <tr key={items.id.toString() + '-' + index.toString()}>

                    <Link href={'/profile?id_user=' + items.id} passHref onClick={(e) => { this.props.handleLoder() }}>
                        <td>
                            <div style={{justifyContent:'center',margin:'5px 0'}}>
                                <a>
                                    {this.renderImageRank(index)}
                                </a>
                            </div>
                        </td>
                    </Link>

                    <Link href={'/profile?id_user=' + items.id} passHref onClick={(e) => { this.props.handleLoder() }}>
                        <td>
                            <div style={{justifyContent:'center',margin:'5px 0'}}>
                                <a>
                                    <img src={`${items.photoURL}` + '?type=normal'} />
                                </a>
                            </div>
                        </td>
                    </Link>


                    <Link href={'/profile?id_user=' + items.id} passHref onClick={(e) => { this.props.handleLoder() }}>
                        <td>
                            <div style={{justifyContent:'center',margin:'5px 0'}}>
                                <a>
                                    {items.name}
                                </a>
                            </div>
                        </td>
                    </Link>


                    <Link href={'/profile?id_user=' + items.id} passHref onClick={(e) => { this.props.handleLoder() }}>
                        <td>
                            <div style={{justifyContent:'center',margin:'5px 0'}}>
                                <a>
                                    {items.point}
                                </a>
                            </div>
                        </td>
                    </Link>

                </tr>
            )

            index++
        });


        // for(let index = 1 ; index <= 10; index++)
        // {


        //     arr.push(

        //         <tr key={index.toString() + '-' + index.toString()}>
        //             <td>
        //                 {this.renderImageRank(index)}
        //             </td>

        //             <td>
        //                 <img src={`${'https://graph.facebook.com/2183700651886952/picture'}`+'?type=normal'} />
        //             </td>
        //             <td>
        //                 {index}
        //             </td>
        //             <td>
        //                 {index}
        //             </td>
        //         </tr>
        //     )
        // }
        return arr
    }

    render() {
        const { data_rank } = this.props

        if (data_rank != null && data_rank.length > 0) {

            return (
                <Table>

                    {this.set_rankuser(data_rank)}

                </Table>
            )
        }
        else {
            return (
                <p style={{ textAlign: 'center' }}>ยังไม่มีผู้ใช้เล่น quiz ชุดนี้</p>
            )
        }
    }
}

export default renderRank

const DivRank = styled.div`
    
    width:50px;
    height:50px;
    display:flex;
    margin:auto;
    margin-bottom:0px !important;
    background-image: ${ props => props.url ? `url(${props.url})` : ''};
    background-repeat:no-repeat;
    background-size:cover;
  
     @media (max-width: 1365px) {

        width:40px;
        height:40px;
        
    }

`;

const Table = styled.table`

    a{
        text-decoration:none;
        color:white;
    }

    div{
        margin:auto;
    }

`;