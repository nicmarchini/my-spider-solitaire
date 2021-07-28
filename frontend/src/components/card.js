import React from 'react';

class Card extends React.Component {
    constructor(props){
        super(props);
        
        var suit = props.suit;
        var number = props.number;
    }

    get_suit(){
       return this.suit;
    }

    get_number(){
        return this.number;
    }
};
export default Card;
