import styled from '@emotion/styled'
import { Modal } from '../components/Modal'
import { PlaceBet } from '../components/PlaceBet'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'



const EventBox = styled.div`
    border: solid white 4px;
    border-radius: 25px;
    margin-left: 100px;
    margin-right: 100px;
    font-size: 24px;
    margin-top: 5%;
    h1 {
        margin-left: 75px;
    }

    img {
        width: 150px;
        height: 150px;
    }

    .team-box {
        width: 60%;
        margin-right: -5%;
    }

    .home-logo-team-name {
        display: flex;
        margin-left: 4%;
        margin-top: 2.5%;
    }

    .away-logo-team-name {
        display: flex;
        margin-left: 4%;
        margin-top: 2.5%;
    }

    .date-time {
        display: flex;
        margin-left: 5%;
        justify-content: space-around;
    }

    .teams-score-box {
        display: flex;
    }

    .home-score {
        display: flex;
        margin-top: 9%;
        align-items: center;
    }

    .away-score {
        display: flex;
        margin-top: 16%;
        align-items: center;
    }

    @font-face {
        font-family: scoreboard;
        src: url(LcdSolid-VPzB.tff)
    }

    .score {
        font-size: 44px;
        font-family: Courier;
        color: rgb(250, 110, 80);
        font-weight: 1000;
    }

    .odds {
        font-size: 26px;
        color: rgb(210, 140, 80);
        font-weight: 400;
    }

    .date-time {
        color: rgb(210, 140, 80);
    }
`;

const BetButton = styled.button`
  background-color: #4fd1c5; // Teal color for visibility
  color: #2d3748; // Dark gray for the text
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  height: 80px;
  width: 120px;
  margin-left: 6.5%;
  margin-top: 10%;
  font-size: 20px;

  &:hover {
    background-color: #38b2ac; // Darker teal on hover
  }
`;



export default function Event(props) {
    const event = props.event
    const [isBetModalOpen, setIsBetModalOpen] = useState(false);

    const handleBetButtonClick = () => {
        //setSelectedFriend(friend);
        setIsBetModalOpen(true);
      };

    return (
        <div class="page-container">
            <EventBox>
                <div class="teams-score-box">
                    <div class="team-box">
                        <div class="home-logo-team-name">
                            <img src={event.home_img}/>
                            <h1>{event.home_team}</h1>
                        </div>
                        <div class="away-logo-team-name">
                            <img src={event.away_img}/>
                            <h1>{event.away_team}</h1>
                        </div>
                    </div>
                    <div class="score-odds-box">
                        <div class="home-score">
                            <h1 class="score">{event.home_score}</h1>
                            <h1 class="odds">{event.home_spread}</h1>
                            <h1 class="odds">{event.home_ml}</h1>
                        </div>
                        <div class="away-score">
                            <h1 class="score">{event.away_score}</h1>
                            <h1 class="odds">{event.away_spread}</h1>
                            <h1 class="odds">{event.away_ml}</h1>
                        </div>
                    </div>
                    <BetButton  onClick={() => handleBetButtonClick()}> Bet </BetButton>
                </div>
                <div class="date-time">
                    <p>{event.date}</p>
                    <p>{event.cur_inning}</p>
                    <p>{event.time}</p>
                </div>
            </EventBox>
            <Modal isOpen={isBetModalOpen} onClose={() => setIsBetModalOpen(false)}>
                <PlaceBet friend="John" onClose={() => setIsBetModalOpen(false)} />
            </Modal>
        </div>
    )
}
