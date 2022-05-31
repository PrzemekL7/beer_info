import React, {useState} from 'react';
import "./Search.css"

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
                <a href="/">
                    <button className="bn632-hover bn26" onSubmit={handleSubmit}>Go</button>
                </a>
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
                                    src={`https://images.punkapi.com/v2/${beer.id}.png`}
                                    alt={`poster of ${beer.name}`}
                                ></img>
                            ) : (
                                <h2>Something went wrong</h2>
                            )}
                            <h2>Description:</h2>
                            <p>{beer.description}</p>
                            <h2>Food pairing:</h2>
                            <p>{beer.food_pairing.join(', ')}</p>
                            <h2>Brewers tips:</h2>
                            <p>{beer.brewers_tips}</p>
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