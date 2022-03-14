const express = require('express');
const morgan = require('morgan');
const axios  = require('axios').default;

let movies = {};

const app = express();
app.use(morgan('dev'));

// When making calls to the OMDB API 
// make sure to append the '&apikey=8730e0e' parameter

app.get('/', (req, res) => {
    if(Object.keys(req.query).length <= 0) res.send('Movie Finder');
    else{
        let key = Object.keys(req.query)[0];
        let queryStr = req.query[key];

        queryStr === 'e1d54a0' ?
        res.send(movies) :
        ( async () => {
            try{
                let movie = await axios.get(`https://omdbapi.com/?${key}=${queryStr}&apikey=e1d54a0`);
                movies[queryStr] = movie.data;
                res.send(movies[queryStr]);
            }catch(err){
                console.log(err.response.status);
            }
        })();
        
    }
});




module.exports = app

/*
    if(Object.keys(req.query).length <= 0) res.send('Movie Finder');
    else{
        let key = Object.keys(req.query)[0];
        let data = req.query[key];

        ( async () => {
            let movie = await axios.get(`https://omdbapi.com/?${key}=${data}&apikey=e1d54a0`);
            movies[data] = movie.data;
            res.send(movies[data]);
        })();
    }
*/

/*
    if(Object.keys(req.query).length <= 0) res.send('Movie Finder');
    else{
        let key = Object.keys(req.query)[0];
        let data = req.query[key];

        axios.get(`https://omdbapi.com/?${key}=${data}&apikey=e1d54a0`)
        .then( (movie) => {
            movies[data] = movie.data;
            res.status(200);
            res.send(movies[data]);
        })
        .catch( (error) => {
            //console.log(error);
        });
    }
*/