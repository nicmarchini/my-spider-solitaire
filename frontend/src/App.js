// import logo from './logo.svg';
import './css/normalize.css';
import './css/skeleton.css';
import './css/style.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component{
  constructor() {
    super();

    this.state = {
     's0':[],
     's1':[],
     's2':[],
     's3':[],
     's4':[],
     's5':[],
     's6':[],
     's7':[],
     's8':[],
     's9':[]
    }
  }

    componentDidMount(){
      for (let i = 0; i < 10; i++){
        this.getCards(i);
      }
    }

    componentDidUpdate(pP,pS,SS){
      // Typical usage (don't forget to compare props):
      // console.log("len: ",this.state.cards.length);
      // console.log("len2: ", pS.cards.length);
      for (let i = 0; i < 10; i++){
        let stack = 's'+i;
        if(this.state[stack].length !== pS[stack].length){
          this.getCards(i);
          //break;
        }
      }
    }

    newGame(){
      const options = {
        url: 'http://localhost:5000/newgame',
        method: 'POST',
        withCredentials: true
        // ,
        // headers: {
        //   'Accept': 'application/json',
        //   'Content-Type': 'application/json;charset=UTF-8'
        // },
        // data: {
        //   a: 10,
        //   b: 20
        // }
      };
    
    axios(options)
      .then(response => {
        console.log(response);
      });
      this.getAllCards()
    }

    setCards(stack, cardlist){
      let results = JSON.parse(localStorage.getItem('s'+stack));
      if (results==null){
        results = []
      }
      results = [].concat(cardlist);
      localStorage.setItem('s'+stack, JSON.stringify(results));
      this.getCards(stack);
    }

    clearCards(stack){
      let results = []
      localStorage.setItem('s'+stack, JSON.stringify(results));
      this.getCards(stack);
    }

    getCards(stack){
      let results = []
      results = results.concat(JSON.parse(localStorage.getItem('s'+stack)));
      if (results==null){
        results = []
      }
      let stack_num = 's'+stack;
      this.setState({ [stack_num] : results})
    }

    getAllCards(){
        // let data = []

        const options = {
          url: 'http://localhost:5000/getcards',
          method: 'GET',
          withCredentials: true
          // ,
          // headers: {
          //   'Accept': 'application/json',
          //   'Content-Type': 'application/json;charset=UTF-8'
          // },
          // data: {
          //   a: 10,
          //   b: 20
          // }
        };
      
      axios(options)
        .then(response => {
          // console.log(JSON.parse(response.data));
          let data = JSON.parse(response.data)
          for (var i = 0; i < 10; i++) {
            this.setCards(i, data[i])
            this.getCards(i)
            //console.log(this.state)
          }
        });
    }

    deal(){

      const options = {
        url: 'http://localhost:5000/deal',
        method: 'POST',
        withCredentials: true
      };
    
    axios(options)
      .then(response => {
        console.log(response)
      });
      this.getAllCards()
  }

  
    render() {

      var rows = [];
      for (var i = 0; i < 10; i++) {
          let num = i
          rows.push(
            //math.random not ideal solution here migth cause extra re-rendering due to key not being stable can fix later
            <div key={Math.random()} className="one column">
              {/* stack {i} */}
                    
                    {/* <button onClick={() => this.setCards(num, [1,2,3,4,5]) }>Add</button> */}
                    {/* <button onClick={() => this.clearCards(num) }>Clear</button> */}
                  
                    {this.state['s'+num].map(function(card,index){
                        return(
                          //see above about key
                          <p key={Math.random()}>{card[0] + " of " + card[1]}</p>
                        )
                    })}

                  </div>);
      } 

    return (
            <div className="container">
              <h1>My Spidey SOlly</h1>
              <button onClick={() => this.newGame()}>New Game</button>
              {/* <button onClick={() => this.getAllCards()}>Get Cards</button> */}
              <button onClick={() => this.deal()}>Deal</button>
              <div className="example-grid docs-example">
              <div className="row">
                  <div className="one column"></div>

                  {rows}

                  <div className="one column"></div>
                </div>
            </div>
            </div>
    );
    }
  }
  
export default App;
