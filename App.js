import React from 'react';
import { StyleSheet, Text, View ,StatusBar,TouchableOpacity,Dimensions} from 'react-native';
import { render } from 'react-dom';



const screen = Dimensions.get("window");
 
const NumberFormate = (number) => `0${number}`.slice(-2);


const getRemaining =(timer) =>{
  const minutes = Math.floor(timer / 60);
  const seconds = timer - minutes * 60;
  return {minutes: NumberFormate(minutes), seconds: NumberFormate(seconds)}
}

export default class App extends React.Component {
  
  
  
  
  
  state={
    remainingSeconds:60,
    isRunning:false,
  }

interval = null;
componentDidUpdate(prevProp, prevState) {
  if (this.state.remainingSeconds === 0 && prevState.remainingSeconds !== 0) {
    this.stop();
  }
}


componentWillUnmount() {
  if (this.interval) {
    clearInterval(this.interval);
  }
}


  start = () => {
      this.setState(state => ({
        remainingSeconds:state.remainingSeconds-1,
        isRunning: true,
      }));
  

  this.interval = setInterval(() => {
    this.setState(state => ({
      remainingSeconds: state.remainingSeconds - 1,
    }));
  }, 1000);
};

stop = () => {
  clearInterval(this.interval);
  this.interval = null;
  this.setState({ remainingSeconds:60,
  isRunning: false,
 });
}
  render(){
     const { minutes, seconds } = getRemaining(this.state.remainingSeconds);
  return (
    <View style={styles.container}>
    {/* <StatusBar barStyle='Light-content'/>*/}
    
    <Text style={styles.TimerText}>{`${minutes}:${seconds}`}</Text>
     {this.state.isRunning ?(
        <TouchableOpacity  onPress ={ this.stop} style = {styles.buttonStop}>
        <Text style = { styles.buttonStopText}>Stop</Text>
      </TouchableOpacity>

     ):(

      <TouchableOpacity  onPress ={ this.start} style = {styles.button}>
      <Text style = {styles.buttonText}>Start</Text>
    </TouchableOpacity>


     )}
     
    
     


    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07121B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStop: {
    borderColor:'#FF851B',
    borderWidth:10,
    width:screen.width/2,
    height:screen.width/2,
    borderRadius:screen.width/2,
    alignItems:'center',
    justifyContent:'center',
    margin:30
  },
  button: {
      borderWidth:10,
      borderColor:'#89AAFF',
      width:screen.width/2,
      height:screen.width/2,
      borderRadius:screen.width/2,
      alignItems:'center',
      justifyContent:'center',
      margin:30

  },
  buttonStopText:{
color:'#FF851B',
fontSize: 40,
  },
  buttonText: {
fontSize: 40,
color:'#89AAFF',
  },
  TimerText:{
color:'#fff',
fontSize:45
  },


});
