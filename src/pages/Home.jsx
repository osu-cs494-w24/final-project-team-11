import {  Outlet } from 'react-router-dom'
import styled from '@emotion/styled'
import eventsData from '../../public/EventDummy.json'
import Event from '../components/Event'

const EventsContainer = styled.div`

`

export function Home() {
    return (
        <>
            <p id="hometext">Today's Events</p>
            <EventsContainer>
                {eventsData.map(e => (<Event event={e} />)
                )}
            </EventsContainer>
            <main><Outlet /> </main>
        </>
    )
}
