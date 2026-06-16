from pymongo import MongoClient
MONGO_URI = "mongodb+srv://pritibhusan6_db_user:Nederay07@cluster0.pw1wwaq.mongodb.net/CRUD"
client = MongoClient(MONGO_URI)
db = client["CRUD_FULL_STACK"]
users = db["users"]
tasks = db["tasks"]

print ("connected to mongo succesfully")