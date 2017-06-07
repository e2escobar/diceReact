import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//Components
import Player from './components/player'
import Buttons from './components/buttons'

const TOP_POINTS = 100;

const gameConf = {
  playerState: [
    {
      playerName: "Player 1",
      playerId: 1,
      globalScore: 0,
      roundScore: 0,
      isActive: true,
      isWinner: null
    },
    {
      playerName: "Player 2",
      playerId: 2,
      globalScore: 0,
      roundScore: 0,
      isActive: false,
      isWinner: null
    }
  ],
  diceValue: 0
};



class App extends Component {
  constructor(props){
    super(props);
    this.state = gameConf;

  }

  nextPlayer(){

  }

  onRollDice(){
    let diceValue = Math.floor(Math.random() * 6) + 1;
    this.setState({ diceValue });

    if (diceValue !== 1) {
      let playerState = this.state.playerState.map(player => {
        if (player.isActive) {
          return {
            ...player,
            roundScore: player.roundScore + diceValue
          }
        }
        return player
      });

      this.setState({playerState})

    } else {
      //this.endHand();
    }


  }

  render(){

    let players = this.state.playerState;
    let diceValue = this.state.diceValue;
    return (
      <div className="wrapper clearfix">
        {
          players.map(player => {
            return (
              <Player
                playerName={ player.playerName }
                roundScore={ player.roundScore }
                globalScore={ player.globalScore }
                isWinner={ player.isWinner }
                isActive={ player.isActive }
                key={ player.playerId }
                pId={ player.playerId }
                />
            )
          })
        }

        <Buttons
          onRollDice={ diceValue => this.onRollDice(diceValue) }
          onNewGame={ () => this.setState(gameConf) }
          onHold=""
          />

        { diceValue !== 0 && <img src={require(`../images/huge-dice${diceValue}.png`)} alt="Dice" className="dice" /> }

      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
