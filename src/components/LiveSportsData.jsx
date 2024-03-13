import { useEffect } from 'react'; // Import useEffect hook
import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import Spinner from '../components/Spinner';

// Styled components for the cards
const LiveSportsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding-left: 100px;
    margin-top: 20px;
`;

const LiveSportsCard = styled.div`
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
`;

const LiveSportsCardItem = styled.div`
    background-color: #2d2f34;
    width: 150px;
    height: 150px;
    border-radius: 4px;
    padding: 30px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 13px;
    text-align: center;

    ul {
        list-style-type: none;
        padding: 0;
    }

    p {
        font-weight: bold;
    }
`;

export default function LiveSportsData({ sport }) {
    const { isLoadingScores, error, data: scoreData, refetch } = useQuery({
        queryKey: ['liveScores', sport], // Use sport as part of the query key
        queryFn: async () => {
            try {
                console.log('== query function called');
                const result = await fetch(
                    `https://api.the-odds-api.com/v4/sports/${sport}/scores/?apiKey=d09f331a139f9a05ca57d9935df6d9ef`
                );
                const jsonScoreData = await result.json();
                console.log("== API Response:", jsonScoreData); // Log the API response
                return jsonScoreData;
            } catch (error) {
                console.error('Error fetching live sports data:', error);
                throw new Error('Failed to fetch live sports data');
            }
        }
    });

    // Use useEffect to refetch data when the sport prop changes
    useEffect(() => {
        refetch();
    }, [sport, refetch]);

    if (isLoadingScores) {
        return <Spinner />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Check if scoreData is undefined or null
    if (!scoreData) {
        return <div>No live sports data available</div>;
    }

    // Filter liveData if necessary
    const filteredLiveData = scoreData.filter(game => !game.completed && game.scores);

    // If there are no live games with scores, display a message
    if (filteredLiveData.length === 0) {
        return <div>No live games available</div>;
    }

    return (
        <>
            <LiveSportsContainer>
                {filteredLiveData.map((game, index) => (
                    <LiveSportsCard key={index}>
                        {/* Display game information and scores here */}
                        <LiveSportsCardItem>
                            <p>{game.home_team} vs {game.away_team}</p>
                            <ul>
                                {game.scores.map((score, scoreIndex) => (
                                    <li key={scoreIndex}>
                                        {score.name}: {score.score}
                                    </li>
                                ))}
                            </ul>
                        </LiveSportsCardItem>
                    </LiveSportsCard>
                ))}
            </LiveSportsContainer>
        </>
    );
}