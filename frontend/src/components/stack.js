import React from 'react';
import Card from './card.js'

class Stack extends React.Component {
    constructor(props){
        super(props);
        var card_list = []
    }

    add_card(card){
        this.card_list.push(card)
    }

    get_cards(){
        return this.card_list;
    }
};
export default Stack;
