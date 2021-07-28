import logo from './logo.svg';
import './css/normalize.css';
import './css/skeleton.css';
import './css/style.css';
import React from 'react';

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
  
    render() {

      var rows = [];
      for (var i = 0; i < 10; i++) {
          let num = i
          rows.push(
            <div class="one column">stack {i}
                    
                    {/* <button onClick={() => this.setCards(num, [1,2,3,4,5]) }>Add</button> */}
                    {/* <button onClick={() => this.clearCards(num) }>Clear</button> */}
                  
                    {this.state['s'+num].map(function(card,index){
                        return(
                          <p>{card}</p>
                        )
                    })}

                  </div>);
      } 

    return (
            <div class="container">
              <h1>My Spidey SOlly</h1>
              <button onClick={() => this.setCards(0, [1,2,3,4,5])}>Deal</button>
              <div class="example-grid docs-example">
              <div class="row">
                  <div class="one column"></div>

                  {rows}

                  <div class="one column"></div>
                </div>
            </div>
            </div>
    );
    }
  }
  
export default App;
