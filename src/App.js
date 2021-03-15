//import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import axios from 'axios';
import {Text, View, Button, StyleSheet, Alert} from 'react-native';
import { TextInput } from 'react-native-paper';
import { css } from "@emotion/core";
// import PropagateLoader from "react-spinners/PropagateLoader";
import './upload.css';
import AnimatedModal from "./userTrain";
import InfoModal from "./infoModal";
//import Dropzone from 'react-dropzone'

import ReactGA from 'react-ga';
const trackingId = 'UA-148371899-1'
ReactGA.initialize(trackingId);
const override = css`
  display: block;
  margin: 1 auto;
  border-color: red;
`;
const style= StyleSheet.create({
    root:{
        flex:1,
        padding:16,
    },

    plaintText:{
        marginTop:16,
        fontWeight:'bold',
        paddingLeft:10,
        paddingRight:10,
        paddingTop:30,
        paddingDown:30,

    },TextInput2:{
        marginDown:16,
        marginTop: 16,
        borderWidth:0.3,
        borderColor: '#f8f8f8',
        borderRadius: 1,
        padding:4,
        backgroundColor:'#f8f8f8',
        height:45,
        // TextInput이 일정 사이즈 이상 되지 않도록.. 내용이 더 길어지면 자동 스크롤
        maxHeight:150,
    },
    button: {
    flex: 1,
    alignItems:"center",
    justifyContent: 'center',
    marginBottom: 10,
    width:200,

  },

});

class App extends Component {

    constructor(props) {
    super(props);
    this.state = {
      predictions:    [],
      msg:"",
      vote:           [],
      showResult:     false,

    };
    this.onDrop = this.onDrop.bind(this);
    this.clear = this.clear.bind(this);

    this.inputText2='';
  }
  componentDidMount() {
    window.addEventListener("paste", this.paste);
  }
  paste(event){
    this.clear()
    var items = (event.clipboardData || event.originalEvent.clipboardData).items;
    console.log(JSON.stringify(items));
    var blob = null;
    for (var i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") === 0) {
        blob = items[i].getAsFile();
      }
    }
    if (blob !== null) {
      console.log(blob)
      this.onDrop([blob])
    }
  }
  clear(){
    this.setState({
      predictions:    [],
      vote:           [],
      showResult:     false,
      msg:""
    })
    ReactGA.event({category: 'clear', action: 'reset'});
  }

  async onDrop(event) {
    console.log(event)
    //console.log(event)
    ReactGA.event({category: 'onDrop', action: 'upload'});
    this.setState({
      predictions:    [],
      vote:           [],
      showResult:     true,
    })
    //var pictureFiles = event
    var Sentiment_text=this.state.msg;
    // var reader = new FileReader();
    // reader.onload = function(){
    //   var output = document.getElementById('preview');
    //   output.src = reader.result;
    // };
    // reader.readAsDataURL(pictureFiles[0]);
    // var canvas = document.getElementById("imageCanvas");
    //
    // var ctx = canvas.getContext("2d");
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(Sentiment_text.length > 0){
      const formData = new FormData();
      formData.append(
        "text",
        Sentiment_text,
      );
      var TextPost = async () =>{
        ReactGA.event({category: 'onDrop', action: 'requestServer'});
        try{
          return await axios.post("https://joyuriz.shop/imageUpload", formData) //여기에 딥려닝 api 연결
        } catch(error){
          console.log(error)
        }
      }
      var response = await TextPost()

      if(!response){
        ReactGA.event({category: 'onDrop', action: 'noResponse'});


      }
      else{
        var text_r = document.getElementById("preview");
        var text='1';
        //canvas.width  = img.width;
        //canvas.height = img.height;
        if(response.data.success === true){
          ReactGA.event({category: 'onDrop', action: 'success'});
          // ctx.lineWidth = "5";
          // ctx.strokeStyle = "lightgreen";
          // var {top , bottom, left, right} = response.data
          // ctx.rect(left, top, (right-left), (bottom-top));
          // ctx.drawImage(img, 0, 0, img.width, img.height);
          // ctx.stroke();

          this.setState({
            predictions: [((text)=>{
              return ({'1': '긍정', '0': '부정'})[text]
            })(response.data.predictions)
          ],
            // vote:         [response.data.votePositive, response.data.voteNegative],
          })
        }
        else{
          //ctx.drawImage(img, 0, 0, img.width, img.height);
          this.setState({
            predictions: ["fail to find"],

            //hash:     response.data.hash
          })
        }
      }
    }
  }

  render() {
    const {msg}=this.state;
    return (
      <div className="back">

      <div className="bodyDiv">
        <InfoModal></InfoModal>
        {/*<img className="preview" id="preview" />*/}
        <div className="upload">
            {/*<IconButton className="iconButton" onClick={this.clear} size="small">*/}
            {/*  <RefreshIcon className="refresh" fontSize="large"/>*/}
            {/*</IconButton>*/}
            <div className="upload-files">
              <header>
              <p>
              <span className="up" style={{fontSize:20}} >국어 문자열</span>
              <span className="load" style={{fontSize:20}}>감성분석기 </span>

              </p>
              <h4 className="load" style={{fontSize:12}}>본 서비스는 국어 문자열을 입력하여 감성을 판별하는 웹 페이지 입니다.</h4>
              </header>
            <div className="body" id="drop">
              {
                !this.state.showResult ?(
                  <div className="uploadBox">
                    {/*<TextInput style={style.TextInput} onChangeText={this.changeText} onSubmitEditing={this.submitEdit.bind(this)}></TextInput>*/}

                    {/*/!* 입력된 글씨를 보여주는 Text컴포넌트 *!/*/}
                    {/*<Text style={style.plaintText}>{this.state.text}</Text>*/}

                    {/*/!* 버튼을 눌렀을 때 Text가 입력된 값으로 변경되도록 *!/*/}
                    {/*<View style={{marginTop:16,}}>*/}
                    {/*    <Button title="완료" onPress={this.clickBtn}></Button>*/}
                    {/*</View>*/}

                    {/* 여러줄 입력 */}
                    {/* true라는 boolean값을 JS문법이므로 */}
                    <TextInput  onChangeText={value=>this.inputText2=value} label="입력해주세요." underlineColor='#f8f8f8'  style={style.TextInput2}></TextInput>
                    <Button color="#F7D238" variant="outline-warning" title="입력"  style={style.button} onPress={()=> this.setState({msg:this.inputText2})}></Button>
                    <Text>{"\n"}</Text>
                    <Button className="bu" color="#F7D238" title="리셋"  style={style.button} onPress={this.clear}></Button>
                    {/*<RefreshIcon className="refresh" fontSize="large"/>*/}

                    <Text style={style.plaintText} title="입력한 문장 : ">{"\n"}{"[입력문장]"}{"\n"}{msg}{"\n"}{"\n"}</Text>
                    <Button color='#295C82' onPress={()=>this.onDrop({msg})} title="텍스트 분석"  ></Button>
                  </div>
                ) : (
                  <div className="imageBox">
                    <div className="imageTable">
                    {
                      this.state.showResult ?(
                      <div className="resultBox">
                          <TextInput  onChangeText={value=>this.inputText2=value} label="입력해주세요." underlineColor='#f8f8f8'  style={style.TextInput2}></TextInput>
                          <Button color="#F7D238" variant="outline-warning" disabled="True" title="입력"  onPress={()=> this.setState({msg:this.inputText2})}></Button>
                          <Text>{"\n"}</Text>
                          <Button className="bu" color="#F7D238" title="리셋" disabled="True" onPress={this.clear}></Button>

                          <Text style={style.plaintText} title="입력한 문장 : ">{"\n"}{"          입력문장   :  "}{msg}{"\n"}</Text>
                          <Text style={style.plaintText} title="입력한 문장 : ">{" 　분석결과   :  "}{this.state.predictions[0]}{"\n"}</Text>
                        {/*<div className="resultDiv">분석 결과 : {this.state.predictions[0]}</div>*/}
                        <div className="resultDiv">
                          <AnimatedModal
                            vote={this.vote}
                            clear={this.clear}
                            msg={this.state.msg} /**/
                            prediction={this.state.predictions[0]}/>

                        </div>
                      </div>
                      ) :null
                    }

                    </div>
                  </div>
                  )
              }
            </div>
            </div>
        </div>

      </div>
      </div>
    );
  }
  setFocus (hasFocus) {
        this.setState({hasFocus});
    }
  submitEdit= function(){
        // 익명함수 안에서 bind()로 전달된 객체가 이함수안에서 this가 됨
        this.setState({text: this.inputText});
    }

    // 버튼 클릭시 함수
    clickBtn=()=>{
        // 입력값을 저장하고 있는 변수 this.inputText의 값을
        // Text컴포넌트가 보여주고 있는 state변수 text에 대임
        this.setState({text:this.inputText});
    }

    // TextInput의 onChangeText속성에 지정한 콜백함수
    // 이 함수는 TextInput의 글씨가 변경될때마다 발동하면서
    // 매개변수로 변경된 글씨를 전달함
    changeText= (value)=>{
        // 파라미터 : TextInput에 써져있는 글씨문자열
        //this.setState({text:vlaue});
        // Alert.alert('changed Text');

        //일반멤버변수에 입력값 저장
        this.inputText=value;
    }
}

export default App;
