import React, { useState } from 'react'

import { DownOutlined, UpOutlined, RedoOutlined } from '@ant-design/icons'
import { Space, Button, Statistic, Image, Card, message } from 'antd'

import { returnShuffledCards } from './data'

const ScoresView = ({ cardIndex, correctGuesses, correctGuessesInARow, bestCorrectGuessesInARow, bestScore }) => {
  return (
    <Space align='center' size='large'>
      <Statistic title='Card' value={cardIndex + 1} />
      <Statistic title='Correct' value={correctGuesses} />
      <Statistic title='Correct in a row' value={correctGuessesInARow} />
      <Statistic title='Best in a row' value={bestCorrectGuessesInARow} />
      <Statistic title='Best Score' value={bestScore} />
    </Space>
  )
}

const ButtonView = ({ gameOver, onGuess }) => {
  if (gameOver) return null

  return (
    <Space align='center' size='large'>
      <Button type='primary' size='large' icon={<DownOutlined />} onClick={() => onGuess('lower')}>Lower</Button>
      <Button type='primary' size='large' icon={<UpOutlined />} onClick={() => onGuess('higher')}>Higher</Button>
    </Space>
  )
}

const StartOver = ({ onStartOver }) => <Button type='primary' icon={<RedoOutlined />} onClick={onStartOver}>Start Over</Button>

const GameOverView = ({ gameOver, onStartOver }) => {
  if (!gameOver) return null

  return (
    <Space direction='vertical'>
      <>GAME OVER</>
      <StartOver onStartOver={onStartOver} />
    </Space>
  )
}

const CardView = ({ gameOver, card }) => {
  return (
    <Card>
      <Image
        preview={false}
        src={card.src}
      />
    </Card>
  )
}

const Site = () => {
  const [cards, setCards] = useState(returnShuffledCards())
  const [cardIndex, setCardIndex] = useState(0)
  const [correctGuesses, setCorrectGuesses] = useState(0)
  const [correctGuessesInARow, setCorrectGuessesInARow] = useState(0)
  const [bestCorrectGuessesInARow, setBestCorrectGuessesInARow] = useState(0)
  const [bestScore, setBestScore] = useState(0)

  // console.log('cards', cards)

  const onGuess = guess => {
    const currentValue = card.value

    const nextCard = cards[cardIndex + 1]

    const nextValue = nextCard.value

    let correct = false

    if (guess === 'higher' && nextValue > currentValue) correct = true
    if (guess === 'lower' && nextValue < currentValue) correct = true

    if (correct) {
      setCorrectGuesses(correctGuesses + 1)
      const correctInARow = correctGuessesInARow + 1
      setCorrectGuessesInARow(correctInARow)
      if (correctInARow > bestCorrectGuessesInARow) setBestCorrectGuessesInARow(correctInARow)
      if (correctInARow > bestScore) setBestScore(correctInARow)
    }

    if (!correct) setCorrectGuessesInARow(0)

    setCardIndex(cardIndex + 1)

    const messageOptions = {
      duration: 1,
      // style: { marginTop: '25vh' },
      type: correct ? 'success' : 'error',
      content: correct ? 'Right' : 'Wrong'
    }

    message.open(messageOptions)
  }

  const onStartOver = () => {
    setCards(returnShuffledCards())
    setCardIndex(0)
    setCorrectGuesses(0)
    setCorrectGuessesInARow(0)
    setBestCorrectGuessesInARow(0)
  }

  const gameOver = Boolean(cardIndex + 1 >= cards.length)

  const card = !gameOver && cards[cardIndex]

  return (
    <Space direction='vertical' size='large' style={{ display: 'flex' }} align='center'>
      <ScoresView cardIndex={cardIndex} correctGuesses={correctGuesses} correctGuessesInARow={correctGuessesInARow} bestCorrectGuessesInARow={bestCorrectGuessesInARow} bestScore={bestScore} />
      <ButtonView gameOver={gameOver} onGuess={onGuess} />
      <CardView gameOver={gameOver} card={card} />
      <GameOverView gameOver={gameOver} onStartOver={onStartOver} />

      <StartOver onStartOver={onStartOver} />
    </Space>
  )
}

export default Site
