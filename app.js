const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
      Base URL: ${req.baseUrl}
      Host: ${req.hostname}
      Path: ${req.path}
    `;
    res.send(responseText);
  });

  app.get('/sum', (req, res) => {
      const a = req.query.a;
      const b = req.query.b;
      const answer = parseInt(a) + parseInt(b);
      const responseText = `The sum of ${a} and ${b} is ${answer}`;

      res.send(responseText);
  });

  app.get('/cipher', (req, res) => {
      const text = req.query.text.split('');
      const shift = parseInt(req.query.shift);
      const codes = text
        .map(letter => letter.charCodeAt(0) + shift)
        .map(code => String.fromCharCode(code))
        .join('');

      console.log(codes);
      res.send(codes);
  });

  app.get('/lotto', (req, res) => {
    const nums = req.query.num.map(i => parseInt(i));
    const winningNums = [1, 2, 3, 4, 5, 6];
    let matches = 0;

    /*
    for(let i = 0; i < 6; i++) {
      const genNum = getRandomInt(1, 20);
      winningNums.push(genNum);
    };
    */

    console.log(nums);
    console.log(winningNums);

    for(let i = 0; i < nums.length; i++) {
      let indx = winningNums.indexOf(nums[i]);
      if(indx > -1) {
        winningNums.splice(indx, 1);
        matches++;
      }
    }

    console.log(matches);
    if(matches < 4) {
      res.json('Sorry, you lose');
    } else if (matches < 5) {
      res.json("Congratulations, you win a free ticket")
    } else if (matches < 6) {
      res.json("Congratulations! You win $100!");
    } else {
      res.json("Wow! Unbelievable! You could have won the mega millions!");
    }
  })

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}