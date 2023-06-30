const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const app = express();
const PORT = 3001;

app.all('/', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/probability', (req, res)=>{
  try {
    const probability = Math.round(Math.random() * 100)
    if (probability >= 50) {
      return res.send({
        status: 200,
        message: 'success catch the pokemon',
        probability
      });
    } else {
      return res.send({
        status: 200,
        message: 'failed catch the pokemon',
        probability
      });
    }
  } catch (err) {
    return res.send({
      status: 400,
      message: err
    })
  }
});

app.post('/release', (req, res) => {
  try {
    const number = Math.round(Math.random() * 100);
    const sqrt = Math.sqrt(number);
    const success = {
      status: 200,
      message: 'success release the pokemon',
      number
    }
    const failed = {
      status: 200,
      message: 'failed release the pokemon'
    }

    if (number <= 1) {
      return res.send({...failed, number});
    }
    if (number === 2) {
      return res.send({...success, number});
    }
    for (let i = 2; i <= sqrt; i++) {
      if (number % i === 0) {
        return res.send({...failed, number});
      }
    }
    return res.send({...success, number});
  } catch (err) {
    return res.send({
      status: 400,
      message: err
    })
  }
})

app.post('/rename', (req, res) => {
  let onlyStr = req.body.name.replace(/[0-9]/g, '');
  let onlyNum = req.body.name.replace(/[^0-9]/g, "");
  if (onlyNum === '') {
    return res.send({
      name: onlyStr + '-' + 0,
      seq: 0
    })
  } 
  if (onlyNum !== '') {
    onlyNum = parseInt(onlyNum)
  }
  if (onlyNum === 0) {
    return res.send({
      name: onlyStr + (onlyNum + 1),
      seq: 0
    })
  }
  if (onlyNum === 1) {
  	if (req.body.seq === 0) {
      return res.send({
      	name: onlyStr + (onlyNum),
        seq: 1
      })
    }
    if (req.body.seq === 1) {
    	return res.send({
      	name: onlyStr + (onlyNum + 1),
        seq: 1
      })
    }
  }
  else {
    const name = onlyStr + (onlyNum + req.body.seq)
    const seq = onlyNum
    return res.send({ name, seq });
  }
})

console.log('jadiin squash');
console.log('GG')
console.log('WP')
console.log('WALANG')

app.listen(PORT, (error) =>{
  if(!error)
    console.log("Server is Successfully Running, and App is listening on port " + PORT)
  else 
    console.log("Error occurred, server can't start", error); 
  }
);