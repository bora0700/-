import React from 'react';
import { IconButton, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Modal from 'react-modal';
import './upload.css';
import axios from 'axios';
import ReactGA from 'react-ga';
const trackingId = 'UA-148371899-1'
ReactGA.initialize(trackingId);
ReactGA.pageview(window.location.pathname + window.location.search);
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      width: '270px',
      transform             : 'translate(-50%, -50%)',
      padding               : '30px'
    },
    overlay : {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
};
Modal.setAppElement('#root')
export default function AnimatedModal(props) {
    const [incorrectModalOpen,incorrectModalSet] = React.useState(false);
    async function close_func(name){
        incorrectModalSet(false);
        props.clear()
    }
    async function click(name){
        incorrectModalSet(false);
        await imagePost(name)
        // incorrectModalSet(false);
        props.clear()
        // props.banner({bannerStatus:true})
    }
    async function imagePost(who){
        ReactGA.event({category: 'userTrain', action: 'updateDB'});
        if(props.msg !==''){
            try{
                return await axios.post("https://joyuriz.shop/userTrain", {
                    'text':props.msg,
                    'label':props.predictions,
                    'vote':props.vote,
                })
            } catch(error){
            console.log(error)
            }
        }
    }
    /*post 연결이 완료되면 e=>close_func('긍정') 을 e=>click('긍정')으로 바꿔야함!*/
    return (
        <div className="userTrain">
            <Button className="wrong" variant="contained" style={{backgroundColor:"#F7D238"}} onClick={e=>close_func('긍정')}>
                맞아요.
            </Button>
            <Button className="wrong" variant="contained" style={{backgroundColor:"#6D9ED8"}} onClick={e=>close_func('부정')}>
                틀렸어요.
            </Button>
            <Modal
                closeTimeoutMS={200}
                isOpen={incorrectModalOpen}
                onRequestClose={e=>incorrectModalSet(false)}
                style={customStyles}
                contentLabel="Example Modal">
                <div id="exitButton">
                    <IconButton id="exitIcon" size="small" onClick={e=>incorrectModalSet(false)}>
                        <CloseIcon/>
                    </IconButton>
                </div>
                <div className="member">
                    <h3>정답을 알려주세요</h3>
                    <p>
                        지금 입력하신 답변은 추후에 반영됩니다.
                    </p>
                    <div>
                    <Button  variant="contained" style={{backgroundColor:"#6D9ED8"}} onClick={e=>close_func('긍정')}>긍정</Button>
                    <Button  variant="contained" color="#F7D238" onClick={e=>close_func('부정')}>부정</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}