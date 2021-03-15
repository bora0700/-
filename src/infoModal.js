import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import './upload.css';
import ReactGA from 'react-ga';
const trackingId = 'UA-148371899-1'
ReactGA.initialize(trackingId);
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      padding               : '20px'
    },
    overlay : {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
};
Modal.setAppElement('#root')
export default function AnimatedModal(props) {
    const [modalIsOpen,setIsOpen] = React.useState(true);
    function closeModal(){
      setIsOpen(false);
      ReactGA.event({category: 'infoModal', action: 'closeModal'});
    }
    return (
        <div className="initModal">
            <Modal
                closeTimeoutMS={500}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
                >
                <div>
                    <div style={{textAlign:'center'}}><h1><span>이건뭐사람아니냐고</span></h1></div>
                    <ul>
                        <li><div>본 서비스는 국어 문자열을 입력하여 <strong>감성을 판별하는</strong> 웹 페이지 입니다.</div></li>
                        <li><div>입력하신 모든 텍스트는 <strong>딥러닝 모델을 학습</strong> 하는데 사용될 수 있습니다.</div></li>
                        <li><div>텍스트 입력에 제한은 없습니다.</div></li>

                    </ul>
                </div>
                <Button style={{width:'100%',color:"#ffffff",backgroundColor:"#295C82"}}  onClick={e=>closeModal()}>시작하기</Button>
            </Modal>
        </div>
    );
}