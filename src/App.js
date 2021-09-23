import React, {useEffect, useState} from "react";
import './App.css';
import {Container, Row, Col} from 'reactstrap';

function App() {
    const url = "https://starnavi-frontend-test-task.herokuapp.com/game-settings";
    const winnersUrl = "https://starnavi-frontend-test-task.herokuapp.com/winners";

    const [gameModes, setGameModes] = useState({});
    const [selectedMode, setSelectedMode] = useState("")
    const [playerName, setPlayerName] = useState("")
    const [selectedData, setSelectedData] = useState({})
    const [winners, setWinners] = useState([])
    const [matrix, setMatrix] = useState([])
    const [gameCurrentState, setGameCurrentState] = useState("start")

    const myStyle = {
        width: (selectedData["field"] === 5 ? selectedData["field"] : selectedData["field"] === 10 ? "3.5" : 2.33) + "rem",
        height: (selectedData["field"] === 5 ? selectedData["field"] : selectedData["field"] === 10 ? "3.5" : 2.33) + "rem"
    }
    //get mode type
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(res => setGameModes(res))
    }, [])

    //get winners data
    useEffect(() => {
        fetch(winnersUrl)
            .then(res => res.json())
            .then(res => setWinners(res))
    }, [])

    const handleChangeMode = (event) => {
        setSelectedMode(event.target.value);
    }

    const handleChangePlayerName = (event) => {
        setPlayerName(event.target.value)
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        setSelectedData(gameModes[selectedMode]);
        setMatrix(Array(gameModes[selectedMode]["field"]).fill(0).map(row => new Array(gameModes[selectedMode]["field"]).fill(0)));

        setGameCurrentState("current")
        // setInterval(() => {
        //     randomCol()
        // }, gameModes[selectedMode]["delay"])
    }


    useEffect(() => {
        console.log("matrix", matrix)
        gameCurrentState === "current" &&
        setInterval(() => {
            let i, j;
            do {
                i = Math.floor(Math.random() * gameModes[selectedMode]["field"]);
                j = Math.floor(Math.random() * gameModes[selectedMode]["field"]);
                console.log(i + "-" + j, matrix[i][j])
            } while (matrix[i][j] !== 0)

            matrix[i][j] = 1;
            setMatrix([...matrix])
            // matrix[i][j]["type"].styles.backgroundColor ="blue"

        }, gameModes[selectedMode]["delay"])
        setGameCurrentState("inProgress")
    }, [gameCurrentState])

    return (
        <div className="App">
            <Container fluid={true}>
                <Row>
                    <Col>
                        <h1 className="text-center my-3">Game In Dots</h1>
                    </Col>
                </Row>
                <Row>
                    <Col lg="6" md="12" className="App__Game_left">
                        <form onSubmit={handleSubmit}>
                            <label>
                                <select value={selectedMode} onChange={handleChangeMode}
                                        className="App__Game_left_dropdown">
                                    <option value="">Pick game mode</option>
                                    {Object.entries(gameModes).map((gameMode, idx) => (
                                        <option key={idx} value={gameMode[0]}>
                                            {gameMode[0] === "easyMode" ? "Easy" : gameMode[0] === "normalMode" ? "Normal" : "Hard"}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                <input type="text" value={playerName} onChange={handleChangePlayerName}
                                       className="App__Game_left_name" placeholder="Enter your name"/>
                            </label>

                            <input type="submit" value="PLAY" disabled={!selectedMode} className="App__Game_left_btn"/>
                        </form>
                        <h3 className="text-center my-3">Welcome to the Game In Dots</h3>

                        <div className="App__Game_left_table">
                            {
                                matrix &&
                                matrix.map((row, i) => (
                                        <div key={i}>
                                            {row.map((col, j) => (
                                                <p style={myStyle} key={`${i}-${j}`}
                                                   className={`color-${(matrix[i][j])}`}>{matrix[i][j]}</p>
                                            ))}
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </Col>
                    <Col lg="6" md="12" className="App__Game_right">
                        <h2>Leader Board</h2>
                        <table className="App__Game_right_table">
                            <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Date and Time</th>
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
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
