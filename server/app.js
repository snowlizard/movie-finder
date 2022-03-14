const express = require('express');
const morgan = require('morgan');
const axios  = require('axios').default;

let movies = {};

const app = express();
app.use(morgan('dev'));

// When making calls to the OMDB API 
// make sure to append the '&apikey=8730e0e' parameter

app.get('/', (req, res) => {
    let key = req.query.t ?
            req.query.t
            : req.query.i;

    const getMovie = async (key)  => {
        let a;
        if(req.query.i){
            a = await axios.get(`https://www.omdbapi.com/?i=${req.query.i}&apikey=e1d54a0`);
            key = req.query.i
        }else{
            a = await axios.get(`https://www.omdbapi.com/?t=${req.query.t}&apikey=e1d54a0`);
            key = req.query.t;
        }
        movies[key] = a.data;

        res.status(200);
        res.json(movies[key]);
    }

    if(key === undefined) res.send('Movie Finder');
    else{
        getMovie(key);
    }
})



module.exports = app

/*
    let key = req.query.t ?
            req.query.t
            : req.query.i;

    const getMovie = async (key)  => {
        let a;
        if(req.query.i){
            a = await axios.get(`https://www.omdbapi.com/?i=${req.query.i}&apikey=e1d54a0`);
            key = req.query.i
        }else{
            a = await axios.get(`https://www.omdbapi.com/?t=${req.query.t}&apikey=e1d54a0`);
            key = req.query.t;
        }
        movies[key] = a.data;

        res.status(200);
        res.json(movies[key]);
    }

    if(key === undefined) res.send('Movie Finder');
    else{
        getMovie(key);
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