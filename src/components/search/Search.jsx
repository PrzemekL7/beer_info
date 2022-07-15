import React, {useState} from 'react';
import bottle from "../../images/bottle.png"
import "./Search.css"
import {Link} from "react-router-dom";

function Search() {
    const [value, setValue] = useState("")
    const [beers, setBeers] = useState([])


    async function getBeerData(query) {
        const response = await fetch(`https://api.punkapi.com/v2/beers?beer_name=${query}`)

        if (response.status !== 200) {
            throw new Error('Something went wrong')
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
        setValue("")
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
                {beers.map(({id, name, image_url, description}) => (
                        <div
                            className="beer-div"
                            key={id}
                        >
                            <h1>{name}</h1>
                            {image_url ? (
                                <img
                                    className="beer-img"
                                    src={`https://images.punkapi.com/v2/${id}.png`}
                                    alt={`poster of ${name}`}
                                ></img>
                            ) : (
                                <img
                                    className="beer-img"
                                    src={bottle}
                                    alt={`poster of ${name}`}
                                ></img>
                            )}
                            <h2>Description:</h2>
                            <p>{description}</p>
                            <div className="return-container">
                            <Link
                                to={`/beer/${id}`}>
                                <button className="bn632-hover bn26">details</button>
                            </Link>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default Search;