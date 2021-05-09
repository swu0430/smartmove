import React, { useState, useEffect } from 'react';
import DeckGL from '@deck.gl/react';
import { LineLayer, TextLayer, PathLayer, ScatterplotLayer } from '@deck.gl/layers';
import { StaticMap, ReactMapGL, Marker } from 'react-map-gl';
import '../Styles/search.css';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoiaml3b25pZTExIiwiYSI6ImNrbnV2eWg0bDBlZnUyd3BqcXN4cGRwMTIifQ.mM4cn9MeLMvpAgOeZsfovA';

export default function Search() {
    
    // Map view initial state
    const initialViewState = {
        latitude: 39,
        longitude: -96,
        zoom: 3.8,
        pitch: 0,
        bearing: 0
    };

    // Hook for managing map view state
    const [viewState, setViewState] = useState(initialViewState);

    const mapClickHandler = (info) => {
        console.log("Longitude: " + info.coordinate[0]);
        console.log("Latitude: " + info.coordinate[1]);
    }


    /***************************** SAMPLE QUERY UPON BUTTON CLICK ****************************/
    const[testResults, setTestResults] = useState([]); //Hook for updating state of some specific results
    const sampleButtonQuery = () => {
        // Send an HTTP request to the server to pull the information for businesses from Phoenix, AZ
        fetch("http://localhost:4000/sample", 
        {
            method: 'GET', // The type of HTTP request
        }).then(res => {
            //console.log(res.json());
            return res.json();
        }).catch((err) => {
            console.log(err)
        }).then(resultsList => {
            const resultsDivs = resultsList.map((result, i) => 
                <div className="results" id="test-results">
                    <div className="name">{result.name}</div>
                    <div className="city">{result.city}</div>
                    <div className="state">{result.state}</div>
                    <div className="zip">{result.zip}</div>
                    <div className="latitude">{result.latitude}</div>
                    <div className="longitude">{result.longitude}</div>
                </div>
            )

            setTestResults(resultsDivs);
        });
    };
    /******************************** END SAMPLE QUERY *******************************************/

    return (
        <div>
            <div>
                <button onClick={sampleButtonQuery}>Submit</button>
                <div className="test-query-output" id="results">{testResults}</div>
            </div>
            <div>
                <DeckGL
                    className='map'
                    width="80%" 
                    height="80%"
                    viewState={viewState}
                    onViewStateChange={e => setViewState(e.viewState)}
                    controller={true}
                    onHover={event => {}}
                    getCursor={() => {}}
                    onClick={mapClickHandler}
                    style={{
                        position: 'absolute', left: '10%', right: '10%', top: '10%'
                    }}>
                    <StaticMap 
                        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                    />
                </DeckGL>
            </div>
        </div>
    )
}