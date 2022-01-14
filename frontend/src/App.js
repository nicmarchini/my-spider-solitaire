// import logo from './logo.svg';
import './css/normalize.css';
import './css/skeleton.css';
import './css/style.css';
import React from 'react';
import axios from 'axios';
import Card from './components/card';
import Draggable from 'react-draggable';
import './App.css'
import foto from './assets/basic-lorg-card-club.png';
import './components/card.css';

class App extends React.Component{



  onDragOver = (ev) => {
    ev.preventDefault();
  }

  onDragStart = (ev, id) => {
    console.log('dragstart:', id);
    ev.dataTransfer.setData("id",id);
  }

  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");
    let tasks = this.state.tasks.filter((task) => {
        if (task.name == id) {
            task.category = cat;
        }return task;
    });
    this.setState({ ...this.state, tasks});
  }

  constructor() {
    super();
 
    this.state = {
     's0':[{name:"testitem1", category:"s0",  bgcolor: "yellow", index:"0"},{name:"testitem2", category:"s1",  bgcolor:"pink", index:"1"}],
     's1':[],
     's2':[],
     's3':[],
     's4':[],
     's5':[],
     's6':[],
     's7':[],
     's8':[],
     's9':[],

     tasks: [{name:"testitem1", category:"s0",  bgcolor: "yellow", index:"0", foto:<img src={foto}  draggable='true' className="photo-s" alt="trun" />},   
                    {name:"testitem2", category:"s1",  bgcolor:"pink", index:"1", foto:<img src={foto}  draggable='true' className="photo-s" alt="trun" />},
                    {name:"testitem3", category:"s2", bgcolor:"skyblue", index:"0", foto:<img src={foto}  draggable='true' className="photo-s" alt="trun" />}
                  ]
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



      var columns = [];
      var tasks = {};    
      for(var i = 0; i < 10; i++){
          let name = 's'+i;
          tasks[name]=[];

          columns.push(
                  <div className="wip one column"
                  style={{paddingTop:80}}
                  onDragOver={(e)=>this.onDragOver(e)}
                  onDrop={(e)=>{this.onDrop(e, name)}}>
                    
                  {/* <span className="task-header">COL1</span> */}
                  {tasks[name]}
                   </div> 
          );

          console.log(tasks)
      }



      this.state.tasks.forEach ((t) => {                   
          tasks[t.category].push(<div key={t.name}                           
                                      onDragStart={(e)=>this.onDragStart(e, t.name)}
                                      draggable
                                      className="draggable"
                                      style={ {marginTop:-80}
                                        // {backgroundColor: t.bgcolor}
                                      }
                                      >                                
                                      {t.foto}
              </div>
              );
          });
  





      
        var rows = [];
        for (var i = 0; i < 10; i++) {
            let num = i
            rows.push(
              
              //math.random not ideal solution here migth cause extra re-rendering due to key not being stable can fix later
              <div key={Math.random()} className="one column">
                {/* stack {i} */}

                      
                      {/* <button onClick={() => this.setCards(num, [1,2,3,4,5]) }>Add</button> */}
                      {/* <button onClick={() => this.clearCards(num) }>Clear</button> */}
                      { new Card('spade', '4').render()
                      }

                      {/* {this.state['s'+num].map(function(card,index){
                          if (card !== null){
                            return(
                              //see above about key
                              
                              <p key={Math.random()}>{card[0] + " of " + card[1]}</p>
                            )
                          } else {
                            return (
                              <p></p>
                             )
                          }

                      })} */}

                    </div>);

        }
      

    return (
        <div id='parent'>
            
            <div className="container">
              <h2 style={{color:'rgb(255, 245, 238)'}}>nics-spider-solitaire</h2>
                <button style={{color:'rgb(255, 245, 238)'}} onClick={() => this.newGame()}>New Game</button>
                {/* <button onClick={() => this.getAllCards()}>Get Cards</button> */}
                <button style={{color:'rgb(255, 245, 238)'}} onClick={() => this.deal()}>Deal</button>
              <div className="example-grid docs-example">
              <div style={{paddingTop:10}}></div>

              <div className="row">
                  <div className="one column"></div>

                  {columns}


                  <div className="one column"></div>
                </div>
            </div>
            </div>
      </div>
    );
    }
  }
  
export default App;
