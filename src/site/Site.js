import React, { useState, useEffect } from 'react'

import { returnShuffledCards } from './data'

import { DownOutlined, UpOutlined, RedoOutlined } from '@ant-design/icons'
import { Space, Button, Statistic, Image, Card, message, Typography, Row, Col, Result } from 'antd'
const { Text } = Typography

const returnNewGame = (game = {}) => {
  const cardIndex = 50
  const correctGuesses = 0
  const correctGuessesInARow = 0
  const highScore = game.highScore || 0
  const cards = returnShuffledCards()

  return { cardIndex, correctGuesses, correctGuessesInARow, highScore, cards }
}

const isPlaying = game => Boolean(game && game.cardIndex < game.cards.length - 1)

const ScoresView = ({ game }) => {
  if (!game) return null
  const { correctGuessesInARow, highScore } = game

  return (
    <Card>
      <Row
        justify='space between'
      >
        <Col flex='auto'>
          <Statistic title='Score' value={correctGuessesInARow} />
        </Col>
        <Col flex='auto' align='right'>
          <Statistic title='High Score' value={highScore} />
        </Col>
      </Row>
    </Card>
  )
}

const ButtonView = ({ game, onGuess }) => {
  const playing = isPlaying(game)
  if (!playing) return null

  return (
    <Space align='center' size='large'>
      <Button type='primary' size='large' icon={<DownOutlined />} onClick={() => onGuess('lower')}>Lower</Button>
      <Button type='primary' size='large' icon={<UpOutlined />} onClick={() => onGuess('higher')}>Higher</Button>
    </Space>
  )
}

const CardView = ({ game }) => {
  const playing = isPlaying(game)

  if (!playing) return null

  const src = game.cards[game.cardIndex].src

  return (
    <Space
      direction='vertical'
      align='center'
      size='small'
    >
      <Text>Card {game.cardIndex + 1}</Text>
      <Card>

        <Image
          preview={false}
          src={src}
        />
      </Card>
    </Space>
  )
}

const GameOverView = ({ game, onNewGame }) => {
  if (!game) return null

  const playing = isPlaying(game)

  if (playing) return null

  const { correctGuesses } = game

  return (
    <Result
      status='success'
      title={`You got ${correctGuesses} correct ${correctGuesses === 1 ? 'guess' : 'guesses'}`}
    />
  )
}

const NewGameButton = ({ game, onNewGame }) => {
  const playing = isPlaying(game)

  const type = playing ? 'link' : 'primary'

  const title = playing ? 'Restart Game' : 'New Game'

  return (
    <Space direction='vertical'>
      <Button type={type} danger={playing} icon={playing && <RedoOutlined />} onClick={onNewGame}>{title}</Button>
    </Space>
  )
}

const Site = () => {
  const [game, setGame] = useState()

  useEffect(() => {
    if (game) {
      const newgame = {
        duration: 1,
        type: 'info',
        content: 'New Game Started'
      }

      // game?.response is set for each guess, cant guess if there is no next card
      const response = game?.response || newgame

      message.open(response)

      const playing = isPlaying(game)

      if (!playing) message.warning('Game Over')
    }
  }, [game])

  const onNewGame = () => setGame(returnNewGame(game))

  const onGuess = guess => {
    const response = {
      duration: 1,
      type: 'info',
      content: 'Tied'
    }

    const { cards, cardIndex } = game

    const nextCardIndex = game.cardIndex + 1

    const currentValue = cards[cardIndex].value
    const nextValue = cards[nextCardIndex].value

    const correct = Boolean((guess === 'higher' && nextValue > currentValue) || (guess === 'lower' && nextValue < currentValue))

    if (correct) {
      response.type = 'success'
      response.content = 'Right'
    } else if (nextValue !== currentValue) { // not a tie then its wrong
      response.type = 'error'
      response.content = 'Wrong'
    }

    const correctGuesses = correct ? game.correctGuesses + 1 : game.correctGuesses
    const correctGuessesInARow = correct ? game.correctGuessesInARow + 1 : 0
    const highScore = correctGuessesInARow > game.highScore ? correctGuessesInARow : game.highScore

    const update = {
      cardIndex: nextCardIndex,
      cards,
      correctGuesses,
      correctGuessesInARow,
      highScore,
      response
    }

    setGame(update)
  }

  return (
    <Space
      direction='vertical'
      style={{ width: '100%' }}
      size='large'
    >

      <ScoresView game={game} />

      <Space
        direction='vertical'
        size='large'
        style={{ display: 'flex' }}
        align='center'
      >

        <ButtonView game={game} onGuess={onGuess} />

        <CardView game={game} />

        <GameOverView game={game} />

        <NewGameButton game={game} onNewGame={onNewGame} />

      </Space>
    </Space>
  )
}

export default Site
