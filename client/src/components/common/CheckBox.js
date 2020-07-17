import styled, { css } from 'styled-components'


const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #BDBAB7;
    -webkit-transition: .4s;
    transition: .4s;
    :before{
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 4px;
        bottom: 4px;
        background-color: #E5E3E2;
        -webkit-transition: .4s;
        transition: .4s;
    }
    ${props => props.round ?
        css`
       border-radius: 34px; 
       :before {
        border-radius: 50%;
    }
    `: css``}
`

const CheckBoxInput = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
    :checked + ${Slider} {
        background-color: #F16350;
    };
    :focus + ${Slider} {
        box-shadow: 0 0 1px #F16350;
    };
    :checked + ${Slider} {
        :before {
            -webkit-transform: translateX(20px);
            -ms-transform: translateX(20px);
            transform: translateX(20px);
        }
    }
`

const SwitchLabel = styled.label`
    position: relative;
    display: inline-block;
    width: 50px;
    height: 27px;
`

// const Slider = styled.span`
//     position: absolute;
//     cursor: pointer;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background-color: #ccc;
//     -webkit-transition: .4s;
//     transition: .4s;
//     :before{
//         position: absolute;
//         content: "";
//         height: 26px;
//         width: 26px;
//         left: 4px;
//         bottom: 4px;
//         background-color: white;
//         -webkit-transition: .4s;
//         transition: .4s;
//     }
//     ${props => props.round ?
//         css`
//        border-radius: 34px; 
//        :before {
//         border-radius: 50%;
//     }
//     `: css``}
// `

// const CheckBoxInput = styled.input`
//     opacity: 0;
//     width: 0;
//     height: 0;
//     :checked + ${Slider} {
//         background-color: #2196F3;
//     };
//     :focus + ${Slider} {
//         box-shadow: 0 0 1px #2196F3;
//     };
//     :checked + ${Slider} {
//         :before {
//             -webkit-transform: translateX(26px);
//             -ms-transform: translateX(26px);
//             transform: translateX(26px);
//         }
//     }
// `

// const SwitchLabel = styled.label`
//     position: relative;
//     display: inline-block;
//     width: 60px;
//     height: 34px;
// `

export { SwitchLabel, Slider, CheckBoxInput }