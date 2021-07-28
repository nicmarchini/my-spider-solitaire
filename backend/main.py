from flask import Flask, session
from flask_restful import Api, Resource, reqparse
from Game import Game
import pickle
from uuid import uuid4
from cachelib.simple import SimpleCache

c = SimpleCache(default_timeout=0)

app = Flask(__name__)
app.config['SECRET_KEY'] = 'key123'
api = Api(app)


# g1.display_table()
# #print()

movecard_post_args = reqparse.RequestParser()
movecard_post_args.add_argument("from_stack", type=int, required=True)
movecard_post_args.add_argument("from_row", type=int, required=True)
movecard_post_args.add_argument("to_stack", type=int, required=True)
movecard_post_args.add_argument("to_row", type=int, required=True)

def generate_id():
    return uuid4().__str__()

def load_game():
    if 'my_game_id' in session:
        pg = c.get(session['my_game_id'])
        game = pickle.loads(pg)
    else:
        game = Game()
        game.setup()
        #game.deal()
    return game

def save_game(game):
    pg = pickle.dumps(game)
    if 'my_game_id' in session:
        c.set(session['my_game_id'], pg)
    else:
        my_uuid = generate_id()
        session['my_game_id'] = my_uuid
        c.set(my_uuid, pg)

def new_game():
    game = Game()
    game.setup()
    save_game(game)
    return game

# def start_game():
#     g = load_game()
#     g.setup()
#     g.deal()
#     save_game(g)
#     return 'success'

# class StartGame(Resource):
#     def post(self):
#         result = start_game()
#         return result

class Deal(Resource):
    def post(self):
        
        g = load_game()
        g.deal()
        save_game(g)
        return 'hand dealt!'

class GetCards(Resource):
    def get(self):
        g = load_game()
        g.display_table()
        save_game(g)
        return 'table displayed'

class NewGame(Resource):
    def post(self):
        new_game()
        return 'newgame'

class MoveCards(Resource):
    def post(self):
        g = load_game()
        args = movecard_post_args.parse_args()
        result = g.move(args['from_stack'],
                args['from_row'],
                args['to_stack'],
                args['to_row'])
        save_game(g)

        return result

api.add_resource(Deal, "/deal")
api.add_resource(MoveCards, "/movecard")
api.add_resource(GetCards, "/getcards")
api.add_resource(NewGame, "/newgame")




if __name__ == "__main__":
    app.run(debug=True)
