import React, { useState, useEffect } from 'react'

import { DownOutlined, UpOutlined, RedoOutlined } from '@ant-design/icons'
import { Space, Button, Statistic, Image, Card, message } from 'antd'

import { returnShuffledCards } from './data'

const ScoresView = ({ game }) => {
  if (!game) return null
  const { cardIndex, correctGuesses, correctGuessesInARow, bestCorrectGuessesInARow, bestScore } = game
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

const ButtonView = ({ game, onGuess }) => {
  if (!game) return null

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

const CardView = ({ game, cards }) => {
  if (!game) return null
  if (game.gameOver) return null

  const src = cards[game.cardIndex].src
  return (
    <Card>
      <Image
        preview={false}
        src={src}
      />
    </Card>
  )
}

const returnNewGame = () => {
  const cardIndex = 0
  const gameOver = false
  const correctGuesses = 0
  const correctGuessesInARow = 0
  const bestCorrectGuessesInARow = 0

  return { cardIndex, gameOver, correctGuesses, correctGuessesInARow, bestCorrectGuessesInARow }
}

const Site = () => {
  const [cards, setCards] = useState(returnShuffledCards())
  const [game, setGame] = useState()

  useEffect(() => {
    if (!game) setGame({ bestScore: 0, ...returnNewGame() })

    if (game?.message) message.open(game.message)
  }, [game, setGame])

  const onGuess = guess => {
    const currentValue = card.value
    const nextValue = cards[game.cardIndex + 1].value

    const message = {
      duration: 1,
      type: 'info',
      content: 'Tied'
    }

    if (guess === 'higher' && nextValue > currentValue) {
      message.type = 'success'
      message.content = 'Right'
    }

    if (guess === 'lower' && nextValue < currentValue) {
      message.type = 'error'
      message.content = 'Wrong'
    }

    const correct = Boolean(message.type === 'Right')
    const correctGuesses = correct ? game.correctGuesses + 1 : game.correctGuesses
    const correctGuessesInARow = correct ? game.correctGuessesInARow + 1 : 0
    const bestCorrectGuessesInARow = correctGuessesInARow > game.bestCorrectGuessesInARow && correctGuessesInARow
    const bestCorrectGuessesInARowSession = bestCorrectGuessesInARow > game.bestCorrectGuessesInARowSession && bestCorrectGuessesInARow

    setGame({
      ...game,
      correctGuesses,
      correctGuessesInARow,
      bestCorrectGuessesInARow,
      bestCorrectGuessesInARowSession,
      correct,
      message
    })
  }

  const card = game?.cardIndex < 52 && cards[game.cardIndex]

  return (
    <Space
      direction='vertical'
      size='large'
      style={{ display: 'flex' }}
      align='center'
    >
      <ScoresView game={game} />
      <ButtonView game={game} onGuess={onGuess} />
      <CardView game={game} cards={cards} />
    </Space>
  )
  // return (
  //   <Space direction='vertical' size='large' style={{ display: 'flex' }} align='center'>
  //     <ScoresView cardIndex={cardIndex} correctGuesses={correctGuesses} correctGuessesInARow={correctGuessesInARow} bestCorrectGuessesInARow={bestCorrectGuessesInARow} bestScore={bestScore} />
  //     <ButtonView gameOver={gameOver} onGuess={onGuess} />
  //     <CardView gameOver={gameOver} card={card} />
  //     <GameOverView gameOver={gameOver} onStartOver={onStartOver} />
  //
  //     <StartOver onStartOver={onStartOver} />
  //   </Space>
  // )
}

export default Site
