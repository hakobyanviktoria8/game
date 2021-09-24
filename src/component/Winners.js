import React, {useEffect, useState} from "react";

const Winners = ({win}) => {
    const winnersUrl = "https://starnavi-frontend-test-task.herokuapp.com/winners";
    const [winners, setWinners] = useState([]);

    //get winners data
    useEffect(() => {
        fetch(winnersUrl)
            .then(res => res.json())
            .then(res => setWinners(res))
    }, [winners, win])

    return (
        <table className="App__Game_right_table">
            <thead>
            <tr>
                <th>User Name</th>
                <th>Time and Date</th>
            </tr>
            </thead>
            <tbody>
            {winners && winners.map(winner => (
                <tr key={winner.id}>
                    <td>{winner.winner}</td>
                    <td>{winner.date}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
};

export default Winners