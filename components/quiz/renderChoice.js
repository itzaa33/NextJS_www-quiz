import React, { Component } from 'react';
import styled from 'styled-components';

class renderChoice extends Component {

    constructor(props) {

        super(props);

    }

    renderIndexchoice = (index) => {
        if (index === 0) {
            return (
                <IndexChoice>A.</IndexChoice>
            )
        }
        else if (index === 1) {
            return (
                <IndexChoice>B.</IndexChoice>
            )
        }
        else if (index === 2) {
            return (
                <IndexChoice>C.</IndexChoice>
            )
        }
        else if (index === 3) {
            return (
                <IndexChoice>D.</IndexChoice>
            )
        }
    }

    render() {

        let table = []

        const { choice, indexQuiz, quiz, imageStatus, statusAnimation } = this.props

        const form = quiz[indexQuiz]

        for (let i = 0; i < choice.length; i++) {

            const mod = i % 2

            if (mod !== 0) {
                table.push(

                    <GroupButton key={indexQuiz.toString() + '-' + i.toString()}>

                        <ButtonChoice1
                            onClick={(e) => { this.props.savedataBackup(form.id, choice[i]), this.props.handleAnimation() }}
                            disabled={!imageStatus}
                            statusAnimation={statusAnimation}
                        >
                            {this.renderIndexchoice(i)}
                            <ChoiceValue>{choice[i]}</ChoiceValue>
                        </ButtonChoice1>

                    </GroupButton>
                )
            }
            else {
                table.push(

                    <GroupButton key={indexQuiz.toString() + '-' + i.toString()}>

                        <ButtonChoice2

                            onClick={(e) => { this.props.savedataBackup(form.id, choice[i]), this.props.handleAnimation() }}
                            disabled={!imageStatus}
                            statusAnimation={statusAnimation}
                        >
                            {this.renderIndexchoice(i)}
                            <ChoiceValue>{choice[i]}</ChoiceValue>
                        </ButtonChoice2>

                    </GroupButton>
                )
            }

        }

        return table

    }
}


export default renderChoice

const GroupButton = styled.div`

    width:100%;

`;
const IndexChoice = styled.p`

    justify-content:left;
    margin:auto;
    margin-left:10px;
`;



const ButtonChoice1 = styled.button`

    width:100%;
    max-width:400px;
    margin:auto;
    
@keyframes bounce_in_L
{
    /* 0% {
        
        transform: translateX(2000px);
    }
    100% {
       
        transform: translateX(0);
    } */

    from,
    60%,
    75%,
    90%,
    to {
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    0% {
        opacity: 0;
        transform: translate3d(-3000px, 0, 0);
    }

    60% {
        opacity: 1;
        transform: translate3d(25px, 0, 0);
    }

    75% {
        transform: translate3d(-10px, 0, 0);
    }

    90% {
        transform: translate3d(5px, 0, 0);
    }

    to {
        transform: translate3d(0, 0, 0);
    }
    
}

 @keyframes bounce_out_L
{
    /* 0% {
        
        transform: translateX(0);
    }
    100% {
       
        transform: translateX(2000px);
    } */

    20% {
        opacity: 1;
        transform: translate3d(20px, 0, 0);
    }

    to {
        opacity: 0;
        transform: translate3d(-2000px, 0, 0);
    }
    
}

    animation:${props => props.statusAnimation ? 'bounce_in_L' : 'bounce_out_L'} 1s forwards;
 
`;

const ButtonChoice2 = styled.button`

    width:100%;
    max-width:400px;
    margin:auto;
     
    
@keyframes bounce_in_R
    {
        /* 0% {
            
            transform: translateX(-2000px);
        }
        100% {
           
            transform: translateX(0);
        } */
        from,
        60%,
        75%,
        90%,
        to {
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        from {
            opacity: 0;
            transform: translate3d(3000px, 0, 0);
        }

        60% {
            opacity: 1;
            transform: translate3d(-25px, 0, 0);
        }

        75% {
            transform: translate3d(10px, 0, 0);
        }

        90% {
            transform: translate3d(-5px, 0, 0);
        }

        to {
            transform: translate3d(0, 0, 0);
        }
        
        
    }

     @keyframes bounce_out_R
    {
        /* 0% {
            
            transform: translateX(0);
        }
        100% {
           
            transform: translateX(-2000px);
        } */
        
        20% {
            opacity: 1;
            transform: translate3d(-20px, 0, 0);
        }

        to {
            opacity: 0;
            transform: translate3d(2000px, 0, 0);
        }
    }

        animation:${props => props.statusAnimation ? 'bounce_in_R' : 'bounce_out_R'} 1s forwards;

`;

const ChoiceValue = styled.p`

    flex:1;
    justify-content:center;
    margin:auto;
    
`;