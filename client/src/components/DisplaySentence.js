import React from 'react'

const getTypedWords = (words, player) => {
    let typedWords = words.slice(0, player.currentWordIndex);
    typedWords = typedWords.join(" ")
    return <span style={{backgroundColor: "#34eb77"}}>{typedWords} </span>
}

const getCurrentWord = (words, player) => {
    return <span style={{textDecoration: "underline"}}>{words[player.currentWordIndex]}</span>
}

const getWordToBeTyped = (words, player) => {
    let wordsToBeTyped = words.slice(player.currentWordIndex+1, words.length)
    wordsToBeTyped = wordsToBeTyped.join(" ")
    return <span> {wordsToBeTyped}</span>
}

const DisplaySentence = ({words, player}) => {
    return (
        <>
            {getTypedWords(words, player)}
            {getCurrentWord(words, player)}
            {getWordToBeTyped(words, player)}
        </>
    )
}

export default DisplaySentence
