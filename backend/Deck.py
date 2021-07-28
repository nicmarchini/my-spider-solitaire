import random

class Card:
    def __init__(self, num, suit, face_up_bool):
        self._num = num
        self._suit = suit
        self._face_up_bool = face_up_bool
    
    def get_suit(self):
        return self._suit
    
    def is_face_up(self):
        return self._face_up_bool
    
    def flip(self):
        if (self._face_up_bool == False):
            self._face_up_bool = True
        else:
            self._face_up_bool = False

    def get_num(self):
        result = str(self._num)
        if (self._num == 1):
            result = 'Ace'
        elif (self._num == 11):
            result = 'Jack'
        elif (self._num == 12):
            result = 'Queen'
        elif (self._num == 13):
            result = 'King'
        return result

    def get_true_num(self):
        return self._num

    def __str__(self):
        if (self._face_up_bool == True):
            return self.get_num() + " of " + self.get_suit()
        else:
            return 'back-of-card'
class Deck:
    def __init__(self):
        self._cardList = []
        suits = ['Hearts','Clubs','Spades','Diamonds']
        for i in range(13):
            for suit in suits:
                self._cardList.append(Card(i+1, suit, False))
    
    def display(self):
        for card in self._cardList:
            print(card)
    
    def shuffle(self):
        n = len(self._cardList)
        for i in range(n-1,0,-1):
            # Pick a random index from 0 to i
            j = random.randint(0,i+1)
            # Swap arr[i] with the element at random index
            self._cardList[i], self._cardList[j] = self._cardList[j], self._cardList[i]

    def getCards(self):
        return self._cardList

    def dealOne(self, flip=False):
        card = self._cardList.pop()
        if flip == True:
            card.flip()
        return card

class DoubleDeck:
    def __init__(self):
        deck1 = Deck()
        deck2 = Deck()
        self._cardList = deck1.getCards() + deck2.getCards()
    
    def display(self):
        for card in self._cardList:
            print(card)
    
    def shuffle(self):
        n = len(self._cardList)
        for i in range(n-1,0,-1):
            # Pick a random index from 0 to i
            j = random.randint(0,i+1)
            # Swap arr[i] with the element at random index
            self._cardList[i], self._cardList[j] = self._cardList[j], self._cardList[i]
    
    def getCards(self):
        return self._cardList
    
    def dealOne(self, flip=False):
        card = self._cardList.pop()
        if flip == True:
            card.flip()
        return card

class CardStack:
    def __init__(self):
        self._cards = []

    def add(self, card):
        self._cards.append(card)

    def pop(self):
        return self._cards.pop()

    def get_card(self, index):
        return self._cards[index]
    
    def get_cards(self):
        return self._cards
    
    def generate_text_of_stack(self):
        outlist = ''
        i = 0
        for card in self._cards:
            outlist += '[' + str(i) + '] ' + (str(card))
            outlist += '\n'
            i+=1
        return outlist
