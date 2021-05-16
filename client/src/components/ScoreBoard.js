import React from 'react'

const getScoreBoard = (players) => {
    const scoreboard = players.filter(player => player.WPM !== -1)
    // sorting by checking if a > b, if true, -1 meaning on top, if false, 1 or 0 depending if b > a or b=a
    return scoreboard.sort((a, b) => a.WPM > b.WPM ? -1 : b.WPM > a.WPM ? 1 : 0)
}

const ScoreBoard = ({ players }) => {
    const scoreBoard = getScoreBoard(players);
    if(scoreBoard.length === 0)
    return null;

    return (
        <table className="table table-striped my-3">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">WPM</th>
                </tr>
            </thead>
            <tbody>
                {
                    scoreBoard.map((player, index) => {
                        return <tr>
                            <th scope="row">{index+1}</th>
                            <td>{player.nickname}</td>
                            <td>{player.WPM}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}

export default ScoreBoard
