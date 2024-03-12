import { Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import Spinner from '../components/Spinner';

const ScrollLiveSports = styled.div`
    background-color: #333;
    overflow: auto;
    white-space: nowrap;
    ::-webkit-scrollbar {
        display: none;
    }
`;

const ScrollLiveSportsItem = styled.div`
    display: inline-block;
    color: white;
    text-align: center;
    padding: 14px;
    text-decoration: none;

    a:hover {
        background-color: #777;
    }
`;

export function LiveScores() {

    const { fetchStatus, isLoading, error, data } = useQuery({
        queryFn: async () => {
            console.log('== query function called');
            const res = await fetch(
                `https://api.the-odds-api.com/v4/sports/?apiKey=d09f331a139f9a05ca57d9935df6d9ef`
            );
            const jsonData = await res.json();
            console.log("== API Response:", jsonData); // Log the API response
            return jsonData;
        }
    });

    console.log("== isLoading:", isLoading);
    console.log("== fetchStatus:", fetchStatus);
    console.log("== Result:", data);

    // Filter data for sports where has_outrights is false
    const filteredData = data ? data.filter(sport => !sport.has_outrights) : [];

    return (
        <>
            {isLoading && <Spinner />}
            {filteredData.length > 0 && (
                <div>
                    <p id="hometext">This is the livescores page</p>
                    <main><Outlet /></main>
                    <ScrollLiveSports>
                        {/* Display filtered data here */}
                        {filteredData.map((sport, index) => (
                            <ScrollLiveSportsItem key={index}>{sport.title}</ScrollLiveSportsItem>
                        ))}
                    </ScrollLiveSports>
                </div>
            )}
        </>
    )
}