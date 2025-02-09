## React 

1. **Install Node.js library And Create Vite**
```
# npm 6.x (outdated, but still used by some):
npm create vite@latest introdemo --template react

# npm 7+, extra double-dash is needed:
npm create vite@latest introdemo -- --template react
```
2. **Run the app**
```
cd introdemo
npm install
npm run dev
```

## Node.js

To turn your application into a functioning npm project and configure it to be executed with nodemon, follow these steps:

1. **Initialize the npm Project**:

Navigate to your project directory and run the following command to initialize a new npm project:
```
npm init -y
```

2. **Install Dependencies**:

Install the necessary dependencies, including express, cors, mongoose, and nodemon:
```
npm install express cors mongoose
npm install --save-dev nodemon
```

2. **Update package.json**:

Update your package.json to include a start script and a dev script for running the application with nodemon:
```
{
    // ...
  "scripts": {
    "start": "node bloglist.js",
    "dev": "nodemon bloglist.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "mongoose": "^5.13.8"
  },
  // ...
}
```

4. **Update MongoDB Connection**:

If you want to use MongoDB Atlas, update the mongoUrl to use your MongoDB Atlas connection string. Make sure to replace `<username>`, `<password>`, and `<dbname>` with your actual MongoDB Atlas credentials and database name:
```
const mongoUrl = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
```

5. **Run the Application**:

To run the application in development mode with nodemon, use the following command:
```
npm run dev
```

## PORT ALREADY IN USE
```
sudo lsof -i :3000
kill -9 <PID>
```

