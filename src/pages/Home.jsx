import {  Outlet } from 'react-router-dom'
import styled from '@emotion/styled'
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
                ' https://api.the-odds-api.com/v4/sports/basketball_ncaab/odds/?apiKey=1bb1eee28190f9ab8f91d6d9194a7f73&regions=us&markets=h2h,spreads&oddsFormat=american'
            );
            const jsonData = await res.json();
            console.log("== API Response:", jsonData); // Log the API response
            return jsonData;
        }
    }); 

    console.log(" sports data in Home: ", data)

    return (
        <>
            <p id="hometext">Today's Events</p>
            {isLoading && <Spinner />}
            <EventsContainer>
                <Event data={data}/>
            </EventsContainer>
            <main><Outlet /> </main>
        </>
    )
}
