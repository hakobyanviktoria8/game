import React, {useEffect, useState} from "react";
import './App.css';
import {Container, Row, Col} from 'reactstrap';

function App() {
    //give data in this API
    //https://starnavi-frontend-test-task.herokuapp.com/game-settings
    const url = "https://starnavi-frontend-test-task.herokuapp.com/game-settings";

    const [gameModes, setGameModes] = useState({});
    const [selectedMode, setSelectedMode] = useState("")
    const [selectedName, setSelectedName] = useState("")
    const [selectedData, setSelectedData] = useState({})

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(res => setGameModes(res))
    }, [])

    const handleChangeMode = (event) => {
        setSelectedMode(event.target.value)
    }

    const handleChangeName = (event) => {
        setSelectedName(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setSelectedData(gameModes[selectedMode])
        // console.log("selectedMode =",selectedMode, "selectedName =",selectedName, "gameModes =", gameModes, Object.entries(gameModes))
    }

    const myStyle = {
        div: {
            width: (selectedData["field"] === 5 ? Math.pow(selectedData["field"], 2) : 35) + "rem"
        },

        p: {
            width: (selectedData["field"] === 5 ? selectedData["field"] : selectedData["field"] === 10 ? "3.5" : 2.33) + "rem",
            height: (selectedData["field"] === 5 ? selectedData["field"] : selectedData["field"] === 10 ? "3.5" : 2.33) + "rem"
        }
    }

    const makeMatric = (max) => {
        const row = [];
        for (let i = 0; i < max; i++) {
            row.push([])
            for (let j = 0; j < max; j++) {
                row[i].push(<p style={myStyle.p} key={`${i}-${j}`}>{`${i}-${j}`}</p>);
            }
        }
        return row;
    };

    return (
        <div className="App">
            <Container>
                <Row>
                    <Col>
                        <h1 className="text-center my-3">Game In Dots</h1>
                    </Col>
                </Row>
                <Row>
                    <Col lg="8" md="12" className="App__Game_left">
                        <form onSubmit={handleSubmit}>
                            <label>
                                <select value={selectedMode} onChange={handleChangeMode}>
                                    <option value="">Pick game mode</option>
                                    {Object.entries(gameModes).map((gameMode, idx) => (
                                        <option key={idx} value={gameMode[0]}>{gameMode[0]}</option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                <input type="text" value={selectedName} onChange={handleChangeName}/>
                            </label>
                            <input type="submit" value="PLAY" disabled={!selectedMode}/>
                        </form>
                        {console.log(selectedData)}
                        <h3 className="text-center my-3">Welcome to the Game In Dots</h3>

                        <div className="App__Game_left_table" style={myStyle.div}>
                            {
                                selectedData && makeMatric(selectedData["field"])
                            }
                        </div>
                    </Col>
                    <Col lg="4" md="12" className="App__Game_right">
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
