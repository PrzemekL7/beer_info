import React, {useState} from 'react';
import bottle from "./../images/bottle.png"
import "./Search.css"
import {Link} from "react-router-dom";

function Search() {
    const [value, setValue] = useState("")
    const [beers, setBeers] = useState([])


    async function getBeerData(query) {
        const response = await fetch(`https://api.punkapi.com/v2/beers?beer_name=${query}`)

        if (response.status !== 200) {
            throw new Error('Something is no yes')
        }
        const data = await response.json()
        return data
    }

    function handleSearch(event) {
        setValue(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        getBeerData(value).then((data) => setBeers(data))
    }

    return (
        <div className="App">
            <form action="src/components/search/Search" onSubmit={handleSubmit}>
                <label htmlFor="search">
                </label>
                <input type="text" id="search" value={value} placeholder="Search..." onChange={handleSearch}/>
                <button className="bn632-hover bn26">Go</button>
            </form>

            <div>
                {beers.map((beer) => (
                        <div
                            className="beer-div"
                            key={beer.id}
                        >
                            <h1>{beer.name}</h1>
                            {beer.image_url ? (
                                <img
                                    className="beer-img"
                                    src={`https://images.punkapi.com/v2/${beer.id}.png`}
                                    alt={`poster of ${beer.name}`}
                                ></img>
                            ) : (
                                <img
                                    className="beer-img"
                                    src={bottle}
                                    alt={`poster of ${beer.name}`}
                                ></img>
                            )}
                            <h2>Description:</h2>
                            <p>{beer.description}</p>
                            <h2>Food pairing:</h2>
                            <p>{beer.food_pairing.join(', ')}</p>
                            <h2>Brewers tips:</h2>
                            <p>{beer.brewers_tips}</p>
                            <div className="return-container">
                            <Link
                                to={`/beer/${beer.id}`}>
                                <button className="bn632-hover bn26">details</button>
                            </Link>
                            </div>
                            {/*<div>{Object.keys(beer.ingredients).map((ingredient) => (*/}
                            {/*    <div>{ingredient}</div>*/}
                            {/*))}</div>*/}
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default Search;