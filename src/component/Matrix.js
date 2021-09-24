import React from "react";

const Matrix = ({matrix, handleClickCell, myStyle}) => {
    return (
        <div className="App__Game_left_table">
            {
                matrix &&
                matrix.map((row, i) => (
                        <div key={i}>
                            {row.map((col, j) => (
                                <p style={myStyle}
                                   key={`${i}-${j}`}
                                   onClick={handleClickCell}
                                   className={`color-${(matrix[i][j])}`}
                                   data-i={i}
                                   data-j={j}
                                />
                            ))}
                        </div>
                    )
                )
            }
        </div>
    )
};

export default Matrix