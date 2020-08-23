const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin');
const graphqlHttp = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');
const mongodbKey = require('./config').mongodbKey;

// const association = require('./app/util/associations');
// const userRoutes = require('./app/routes/user');
// const roleRoutes = require('./app/routes/role');
// const productRoutes = require('./app/routes/product');
// const orderRoutes = require('./app/routes/order');
// const orderItemRoutes = require('./app/routes/orderItem');

const app = express();

app.use(bodyParser.json({limit: '30mb'}));
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-XSRF-TOKEN");
  next();
});

// app.use('/api', userRoutes);
// app.use('/api', roleRoutes);
// app.use('/api', productRoutes);
// app.use('/api', orderRoutes);
// app.use('/api', orderItemRoutes);
// app.use('/api', sesRoutes);
app.use(adminRoutes);

app.use(
  '/graphql', 
  graphqlHttp.graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    formatError(err) {
      if (!err.originalError) {
        return err;
      }
      const data = err.originalError.data;
      const message = err.message || 'An error occurred.';
      const code = err.originalError.code || 500;
      return { message: message, status: code, data: data };
    }
  })
);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose.connect(mongodbKey)
.then(results => {
  console.log('Connected!');
  app.listen(3000);
})
.catch(err => {
  console.log(err);
});