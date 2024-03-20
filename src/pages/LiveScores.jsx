import { Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react'; // Import useState and useEffect hooks
import Spinner from '../components/Spinner';
import LiveSportsData from '../components/LiveSportsData'

const ScrollLiveSports = styled.div`
    background-color: #333;
    overflow: auto;
    white-space: nowrap;
    ::-webkit-scrollbar {
        display: none;
    }
    margin-top: -30px;
`;

const ScrollLiveSportsItem = styled.div`
    display: inline-block;
    color: white;
    text-align: center;
    padding: 14px;
    padding-right: 20px;
    padding-left: 20px;
    text-decoration: none;
    cursor: pointer; // Add cursor pointer

    a:hover {
        background-color: #777;
    }
`;

export function LiveScores() {

    const sports_query = ''
    const { fetchStatus, isLoading, error, data } = useQuery({
        queryKey: ["getSports", sports_query],
        queryFn: async () => {
            console.log('== query function called');
            const res = await fetch(
                `https://api.the-odds-api.com/v4/sports/?apiKey=c96a4579526786c631a6ef52a9f35e59`
            );
            const jsonData = await res.json();
            console.log("== API Response:", jsonData); // Log the API response
            return jsonData;
        }
    });

    // State to hold the key of the selected sport
    const [selectedSportKey, setSelectedSportKey] = useState(null);

    // Effect to set the selected sport key when filtered data changes
    useEffect(() => {
        if (data && data.length > 0 && !selectedSportKey) {
            setSelectedSportKey(data[0].key); // Set the selected sport key to the key of the first sport in the filtered data
        }
    }, [data, selectedSportKey]);

    console.log("== isLoading:", isLoading);
    console.log("== fetchStatus:", fetchStatus);
    console.log("== Result Data:", data);
    console.log("== selectedSport: ", selectedSportKey)

    // Filter data for sports where has_outrights is false
    const filteredData = data ? data.filter(game => !game.has_outrights) : [];

    // Function to handle sport click
    const handleSportClick = (key) => {
        setSelectedSportKey(key);
        updateLiveOdds(key); // Update live odds in context
    };

    return (
        <>
            {isLoading && <Spinner />}
            {filteredData.length > 0 && selectedSportKey && (
                <div>
                    <main><Outlet /></main>
                    <ScrollLiveSports>
                        {/* Display filtered data here */}
                        {filteredData.map((sport, index) => (
                            <ScrollLiveSportsItem 
                                key={index} 
                                onClick={() => handleSportClick(sport.key)} // Call handleSportClick on click
                                style={{ backgroundColor: selectedSportKey === sport.key ? '#777' : '' }} // Apply background color if selected
                            >
                                {sport.title}
                            </ScrollLiveSportsItem>
                        ))}
                    </ScrollLiveSports>
                    {selectedSportKey && <LiveSportsData sport = {selectedSportKey}></LiveSportsData>} {/* Conditional rendering of LiveSportsData */}
                </div>
            )}
        </>
    )
}
