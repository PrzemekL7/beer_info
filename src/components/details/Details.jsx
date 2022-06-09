import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import bottle from "../../images/bottle.png";

function Details() {
    const params = useParams();
    const [beer, setBeer] = useState(null)


    useEffect(() => {
        getBeerData(params.id).then((response) => {
            setBeer(response)
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function getBeerData(id) {
        const response = await fetch(`https://api.punkapi.com/v2/beers?ids=${id}`)

        if (response.status !== 200) {
            throw new Error('Something is no yes')
        }
        const data = await response.json()
        return data
    }

    return (
        <div className="App">
            {
                beer ? (
                    <div>
                        {beer.map((beer) => (
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
                                    <h2>Tagline:</h2>
                                    <p>{`"${beer.tagline}"`}</p>
                                    <h2>Description:</h2>
                                    <p>{beer.description}</p>
                                    <h2>Contributed by:</h2>
                                    <p>{beer.contributed_by}</p>
                                    <h2>Details:</h2>
                                    <p>abv: {beer.abv}, ibu: {beer.ibu}, attenuation level: {beer.attenuation_level},
                                        ebc: {beer.ebc}, srm: {beer.srm}, ph: {beer.ph}
                                    </p>
                                    <h2>Brewers tips:</h2>
                                    <p>{beer.brewers_tips}</p>
                                    <h2>Food pairing:</h2>
                                    <p>{beer.food_pairing.join(', ')}</p>
                                    <div className="return-container">
                                        <Link
                                            to="/">
                                            <button className="bn632-hover bn26">Home</button>
                                        </Link>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                ) : (
                    <h2>Loading</h2>
                )
            }
        </div>
    );
}

export default Details;