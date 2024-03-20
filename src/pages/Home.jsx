import {  Outlet } from 'react-router-dom'
import styled from '@emotion/styled'
import eventsData from '../../public/EventDummy.json'
import Event from '../components/Event'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import Spinner from '../components/Spinner'

const EventsContainer = styled.div`

`

export function Home() {

    const sports_query = ''
    const { fetchStatus, isLoading, error, data } = useQuery({
        queryKey: ["getSports", sports_query],
        queryFn: async () => {
            console.log('== query function called');
            const res = await fetch(
                ' https://api.the-odds-api.com/v4/sports/basketball_ncaab/odds/?apiKey=cdd89b0791b1ba305b84ee2ec4b31d8b&regions=us&markets=h2h,spreads&oddsFormat=american'
            );
            const jsonData = await res.json();
            console.log("== API Response:", jsonData); // Log the API response
            return jsonData;
        }
    }); 

    //const [games, setGames] = useState([])

    /*useEffect(() => {
        const fetchSportsData = () => {
            fetch(
                ' https://api.the-odds-api.com/v4/sports/basketball_ncaab/odds/?apiKey=cdd89b0791b1ba305b84ee2ec4b31d8b&regions=us&markets=h2h,spreads&oddsFormat=american'
            )
            .then((res) => res.json())
            .then((data) => {
                setGames(data);
            }) // Log the API response
        }
        fetchSportsData();
    }, []) */

    console.log(" sports data: ", data)

    return (
        <>
            <p id="hometext">Today's Events</p>
            {isLoading && <Spinner />}
            <EventsContainer>
                {data && eventsData.map(e => (<Event event={e} data={data}/>)
                )}
            </EventsContainer>
            <main><Outlet /> </main>
        </>
    )
}
