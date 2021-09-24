# healthbro-v2

A recipe search engine that help user to decide what they like to eat
visit the last version [here](https://healthbro.herokuapp.com)

[Code for last version](https://github.com/cee-elle/fswd-agile-final-project)
## Initial setup

Get an API from [Here](https://spoonacular.com/food-api)
Get a free MongoDB from [Here]("https://account.mongodb.com/account/login?signedOut=true")
* make sure to white-listed your ip address 

Then, create a `.env` file at the root of both healthbro-fe and healthbro-be

Update your `.env` file like below:

```healthbro-fe > .env
// Add your jwt secret, make sure it is the same as the server
~healthbro-fe/.env

REACT_APP_JWT_SECRET=<This Is Secret>

```

```healthbro-be > .env
// Add your MongoDB URI in 
// Add your jwt secret, make sure it is the same as the client
~healthbro-be/.env

MONGO_URI=<Your MongoDB URI>
API_KEY=<Your API Key>
JWT=<This Is Secret>

```

In the server folder, install dependencies:

```
cd server
npm install
npm run seed
```

In the client folder, install dependencies:

```
cd client
npm install
```

### Running the Application Locally

In one terminal, start the front end:

```
cd healthbro-fe
npm start
```

In a separate terminal, start the back end:

```
cd healthbro-be
npm run dev
```