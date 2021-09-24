import React, {useEffect, useState} from "react";
import './App.css';
import {Container, Row, Col} from 'reactstrap';
import Winners from "./component/Winners";
import Matrix from "./component/Matrix";

function App() {
    const url = "https://starnavi-frontend-test-task.herokuapp.com/game-settings";

    const [gameModes, setGameModes] = useState({});
    const [selectedMode, setSelectedMode] = useState("")
    const [playerName, setPlayerName] = useState("")
    const [selectedData, setSelectedData] = useState({})
    const [matrix, setMatrix] = useState([])
    const [gameCurrentState, setGameCurrentState] = useState("start")
    const [maxCount, setMaxCount] = useState(13)
    const [greenCount, setGreenCount] = useState(0)
    const [redCount, setRedCount] = useState(0)
    const [win, setWin] = useState("")
    const [intervalId, setIntervalId] = useState(0)

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

    const handleChangeMode = (event) => {
        setSelectedMode(event.target.value);
        setMaxCount(Math.ceil(Math.pow(gameModes[event.target.value]["field"], 2) / 2));
    }

    const handleChangePlayerName = (event) => {
        setPlayerName(event.target.value.trim())
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (playerName.trim() === "") {
            setPlayerName("User")
        }
        setSelectedData(gameModes[selectedMode]);
        setMatrix(Array(gameModes[selectedMode]["field"]).fill(0).map(row => new Array(gameModes[selectedMode]["field"]).fill(0)));
        setGameCurrentState("current");
        setRedCount(0);
        setGreenCount(0);
    }

    useEffect(() => {
        let random_i = -1, random_j = -1;
        if (gameCurrentState === "current") {
            const interval =
                setInterval(() => {
                    console.log(random_i, random_j)
                    if (random_i !== -1 && random_j !== -1) {
                        if (matrix[random_i][random_j] === 1) {
                            matrix[random_i][random_j] = 3;
                            setMatrix([...matrix]);
                            setRedCount(count => count + 1)
                        }
                    }
                    let i, j;
                    do {
                        i = Math.floor(Math.random() * gameModes[selectedMode]["field"]);
                        j = Math.floor(Math.random() * gameModes[selectedMode]["field"]);
                        // console.log("matrix " + i + "_" + j, matrix[i][j])
                    } while (matrix[i][j] !== 0)

                    random_i = i;
                    random_j = j;

                    matrix[i][j] = 1;
                    setMatrix([...matrix]);

                }, gameModes[selectedMode]["delay"])
            setIntervalId(interval);
            setGameCurrentState("inProgress");
        }
    }, [gameCurrentState])

    //"21:29; 23 September 2021" in this format generate date property
    const generateDate = () => {
        const months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        return `${hours}:${minutes}; ${day} ${months[month]} ${year}`
    }

    useEffect(() => {
        console.log("greenCount = ", greenCount, "redCount = ", redCount, "playerName = ", playerName);
        console.log("maxCount = ", maxCount, "gameCurrentState = ", gameCurrentState);

        if (redCount >= maxCount) {
            setGameCurrentState("finish");
            setWin("Computer");
            clearInterval(intervalId)
        } else if (greenCount >= maxCount) {
            setGameCurrentState("finish");
            setWin(playerName);
            clearInterval(intervalId);
        }

        const sendData = {winner: win, date: generateDate()};
        console.log(sendData);

    }, [redCount, greenCount])

//     useEffect(() => {
//         // POST request using axios inside useEffect React hook
//         const article = { title: 'React Hooks POST Request Example' };
//         axios.post('https://reqres.in/api/articles', article)
//             .then(response => setArticleId(response.data.id));
//
// // empty dependency array means this effect will only run once (like componentDidMount in classes)
//     }, []);

    const handleClickCell = (e) => {
        let i = +e.target.getAttribute("data-i")
        let j = +e.target.getAttribute("data-j")
        if (matrix[i][j] === 1) {
            matrix[i][j] = 2;
            setMatrix([...matrix]);
            setGreenCount(count => count + 1)
        }
        // console.log(e.target, i, j);
    }

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
                        <form onSubmit={handleSubmit}
                              style={{display: gameCurrentState === "finish" || gameCurrentState === "start" ? "block" : "none"}}
                        >
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
                            <input type="submit"
                                   disabled={!selectedMode}
                                   className="App__Game_left_btn"
                                   value={gameCurrentState === "finish" ? "PLAY AGAIN" : "PLAY"}
                            />
                        </form>

                        <h3 className="text-center my-3">{gameCurrentState === "finish" ? `Winner ${win}` : `Welcome ${playerName}`}</h3>
                        <Matrix matrix={matrix} handleClickCell={handleClickCell} myStyle={myStyle}/>
                    </Col>
                    <Col lg="6" md="12" className="App__Game_right">
                        <h2>Leader Board</h2>
                        <Winners/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
