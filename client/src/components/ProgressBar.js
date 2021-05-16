import React from 'react'

const calculatePercentage = (player, wordsLength) => {
    if (player.currentWordIndex !== 0) {
        return ((player.currentWordIndex / wordsLength) * 100).toFixed(2) + "%";
    }
    return 0;
}

const ProgressBar = ({ players, player, wordsLength }) => {
    const percentage = calculatePercentage(player, wordsLength);
    return (
        <div>
            {
                <>
                    <div className="text-left">
                        {player.nickname}
                    </div>
                    <div className="progress my-1" key={player._id}>
                        <div className="progress-bar" role="progressbar" style={{ width: percentage }}>{percentage}</div>
                    </div>
                </>
            }
            {
                players.map(playerObject => {

                    const percentage = calculatePercentage(playerObject, wordsLength);
                    return playerObject._id !== player._id ?
                        <>
                            <div className="text-left">
                                {playerObject.nickname}
                            </div>
                            <div className="progress my-1" key={playerObject._id}>
                                <div className="progress-bar" role="progressbar" style={{ width: percentage }}>{percentage}</div>
                            </div>
                        </>
                        : null
                })
            }
        </div>
    )
}

export default ProgressBar
