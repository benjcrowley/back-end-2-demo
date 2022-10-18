const movies = require('./db.json')
module.exports = {
    // key : "value",
    getMovies: (req, res) => {
        res.status(200).send(movies)
    },
    deleteMovie: (req, res) => {
        const deleteId = req.params.id
        let index = movies.findIndex(element => element.id === +deleteId)
        movies.splice(index, 1)
        res.status(200).send(movies)
    },
    createMovie: (req, res) => {
        // const title = req.body.title
        // const rating = req.body.rating
        // const imageURL = req.body.imageURL
        const {title, rating, imageURL} = req.body
        //this code finds me the next , non-used id in my "database"
        let greatestId = -1
        for (let i = 0; i < movies.length; i++) {
            if (movies[i].id > greatestId) {
                greatestId = movies[i].id
            }
        }
        let nextId = greatestId + 1
        let newMovie = {
            id: nextId,
            title,
            rating,
            imageURL
        }
        movies.push(newMovie)
        res.status(200).send(movies)
    },
    updateMovie: (req, res) => {
        let type = req.body.type
        let id = req.params.id
        // console.log(type + ' to ' + id)
        let index = movies.findIndex(element => element.id === +id)
        // if (movies[index].rating <= 5 && movies[index].rating >= 0){

            if (type === 'plus'){
                movies[index].rating++
                res.status(200).send(movies)
            }else if (type === 'minus'){
                movies[index].rating--
                res.status(200).send(movies)
            }else {
                res.sendStatus(400)
            }
        // }
            
    }



}