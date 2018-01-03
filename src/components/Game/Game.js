import React, { Component } from 'react';
import $ from 'jquery';
import './Game.css';
import arrayShuffle from 'array-shuffle';
import wordList from '../../assets/words/wordList.json'
import Highlighter from 'react-highlight-words';
import ReactCountdownClock from 'react-countdown-clock'



class Game extends Component {
  constructor(){
    super()
    this.state = {passphrase:"",scrambled:"",selectedPos:0}

  }
  tokenizer(){
    
    //Generate Random Number within Range of Words

    let random = Math.floor(Math.random()* (wordList.words.length - 1));

    console.log(random);

    var word = [];
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    let length = Math.random() * 5 + 2

    if(!length % 2 == 0){

      length++;

    }

    for (var i = 0; i < length; i++)
      word.push(possible.charAt(Math.floor(Math.random() * possible.length)));
    
    let scrambled = arrayShuffle(word);
    
    console.log(wordList.words[0])
    console.log(scrambled);

    this.setState({passphrase:word.join(''),scrambled:scrambled.join('')});
    


  }
  generateSortBox(word){

    let section = document.createElement("span");
    section.className = "underline";
    section.innerText = word.substring(0,2)+word.substring(2);

    return section
  }
  componentWillMount(){
    this.tokenizer();
    document.addEventListener("keydown", this._handleKeyDown.bind(this));


  }
  _handleKeyDown(event){

    if(event.keyCode == 39){
      console.log('right')
      if(this.state.selectedPos != this.state.scrambled.length-2){

      this.setState({selectedPos:this.state.selectedPos+=1})
      
    }
    }
    if(event.keyCode == 37){
      console.log('left');
      if(this.state.selectedPos != 0){
        this.setState({selectedPos:this.state.selectedPos-=1})
      }
      
    }
    if(event.keyCode == 32){

      console.log('space');

      let scram = this.state.scrambled;
      let idx = this. state.selectedPos;

      let a = scram.charAt(idx)
      let b = scram.charAt(idx+1)

      let selected = this.state.scrambled.slice(this.state.selectedPos,this.state.selectedPos+2);
      let selectedReversed = selected.split("").reverse().join("")

      this.setState({scrambled: scram.replace(selected,selectedReversed)})

    }
  }
  
  render() {
    return (
      <div className="GameContainer">
        <h1 className="passPhrase">{this.state.passphrase}</h1>
         <h1>
          <Highlighter
            highlightClassName='scrambled'
            searchWords={[this.state.scrambled.slice(this.state.selectedPos,this.state.selectedPos+2)]}
            autoEscape={true}
            textToHighlight={this.state.scrambled}
          />
          </h1>
      </div>
    );
  }
}

export default Game;
