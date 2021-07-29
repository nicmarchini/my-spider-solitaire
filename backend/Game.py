from Deck import DoubleDeck
from tabulate import tabulate
from Deck import CardStack
import json

class Game:
    def __init__(self):
        self._deck = DoubleDeck()
        self._stackList = []
    
    def get_cards(self):
        cards = []
        for i in range(len(self._stackList)):
            stack_cards = self._stackList[i].get_cards()
            cleaned_stack_cards = []
            for i in range(len(stack_cards)):
                if(stack_cards[i].is_face_up() == False):
                    cleaned_stack_cards.append('flipped')
                else:
                    cleaned_stack_cards.append([stack_cards[i].get_true_num(),
                                            stack_cards[i].get_suit()
                                            ])
            cards.append(cleaned_stack_cards)
        return json.dumps(cards)
    
    def setup(self):
        #shuffle n number of times
        for i in range(2):
            self._deck.shuffle()
        #deal into stacks as according to game rules
        for i in range(10):
            self._stackList.append(CardStack())
        for i in range(44):
            self._stackList[i % 10].add(self._deck.dealOne())
        for i in range(10):
            #these are dealt face up
            self._stackList[i % 10].add(self._deck.dealOne(True))

    def display_table(self):
        data = [[self._stackList[0].generate_text_of_stack(),
                self._stackList[1].generate_text_of_stack(),
                self._stackList[2].generate_text_of_stack(),
                self._stackList[3].generate_text_of_stack(),
                self._stackList[4].generate_text_of_stack(),
                self._stackList[5].generate_text_of_stack(),
                self._stackList[6].generate_text_of_stack(),
                self._stackList[7].generate_text_of_stack(),
                self._stackList[8].generate_text_of_stack(),
                self._stackList[9].generate_text_of_stack()]]

        print(tabulate(data, headers=[ "Stack# 0", 
                                        "Stack# 1", 
                                        "Stack# 2", 
                                        "Stack# 3", 
                                        "Stack# 4", 
                                        "Stack# 5", 
                                        "Stack# 6", 
                                        "Stack# 7", 
                                        "Stack# 8", 
                                        "Stack# 9"]))

    def deal(self):
        status = ''
        if (len(self._deck.getCards()) >= 10):
            for i in range(10):
                #these are dealt face up
                self._stackList[i % 10].add(self._deck.dealOne(True))
            status = 'hand delt!'
        else:
            status = "all cards already delt!"
            print("all cards already delt!")
        
        return status
        
    def pickup_card(self, stacknum, rownum):
        if(stacknum > len(self._stackList)-1):
            print('out of stacklist bounds')
        elif (rownum > len(self._stackList[stacknum].get_cards())):
            print('out of stack bounds')
        else:
            card = self._stackList[stacknum].get_card(rownum) 
            if (card.is_face_up() == False):
                print('cant pickup! card is face down!')
            else:
                print("trying to pickup a " + card.get_num() + " of " + card.get_suit())
                num_in_stack = len(self._stackList[stacknum].get_cards())
                num_beneath = num_in_stack - rownum - 1
                previous_card_num = card.get_true_num()
                for i in range(num_beneath):
                    if( self._stackList[stacknum].get_card(rownum+i+1).get_true_num() == previous_card_num - 1):
                        previous_card_num -= 1
                    else:
                        print('cant move card, not sorted underneath!')
                        return False
                print('can move the card and its underlying stack!')
                return True
        return False
        

    def putdown_card(self, top_pile_card, stacknum, rownum):
        # put cardpile onto/underneath the card identified at stacknum, rownum
        if(stacknum > len(self._stackList)-1):
            print('out of stacklist bounds')
        elif (rownum > len(self._stackList[stacknum].get_cards())):
            print('out of stack bounds')
        else:
            #is this the bottom card in the pile?
            if (rownum == len(self._stackList[stacknum].get_cards())-1):
                #ok, but is this card one bigger than the top card in the cardpile?
                num_of_bottom_card = self._stackList[stacknum].get_card(rownum).get_true_num()
                num_of_top_card_in_pile = top_pile_card.get_true_num()
                
                if(num_of_top_card_in_pile == num_of_bottom_card - 1):
                    #putdown!!!
                    #modify cardstack (to actually move the cards from one to the other)
                    print("we can put this cardpile down onto this stack!")
                    return True
                else:
                    print("top_pile_card not one less than bottom card!")

            else:
                print('cant put cards into the middle of the stack! no can do!')
        return False

    def check_full_stack(self, stack_num):
        stack_cards = self._stackList[stack_num].get_cards()
        stack_size = len(stack_cards)
        bottom_index = stack_size - 1
        if(stack_size >= 13):
            for i in range(13):
                card = stack_cards[bottom_index - i]
                if card.is_face_up():
                    print(card.get_true_num())
                    if (card.get_true_num() == i+1):
                        pass
                    else:
                        print('stack not correctly ordered!')
                        return False
                else:
                    print('part of stack not face up!')
                    return False
            #if makes it here then we passed checks for all 13 cards and we have a full stack
            print('we have a full stack!')
            return True
        else:
            print('stack too small to be complete!')
            return False
        print('hit end of function... what?')
        return False

    def remove_full_stack(self, stack_num):
        print('removing the finished stack!')
        for i in range(13):
            self._stackList[stack_num].pop()

    def move(self, from_stacknum, from_rownum, to_stacknum, to_rownum):
        if self.pickup_card(from_stacknum, from_rownum):
            card = self._stackList[from_stacknum].get_card(from_rownum)
                        #need to add flip functionality to next card
            prev_card = self._stackList[from_stacknum].get_card(from_rownum-1)
            if (prev_card.is_face_up() == False):
                self._stackList[from_stacknum].get_cards()[from_rownum-1].flip()
            if self.putdown_card(card, to_stacknum, to_rownum):
                print('-------------we can move the card(s) from p1 to p2!--------------')
                #axctually move em
                move_cards = self._stackList[from_stacknum].get_cards()[from_rownum:]
                for i in range(len(move_cards)):
                    self._stackList[from_stacknum].pop()
                for move_card in move_cards:
                    self._stackList[to_stacknum].add(move_card)
                #then should check if we made a stack!
                if(self.check_full_stack(to_stacknum)):
                    print('we have a complete stack!')
                    self.remove_full_stack(to_stacknum)
                else:
                    print('we dont have a complete stack yet!')
                return 'Success'
            else:
                print('-------------we cant putdown the card(s) at pos2!--------------')
        else:
            print('-------------we cant pickup the card(s) at pos1!--------------')
        return False