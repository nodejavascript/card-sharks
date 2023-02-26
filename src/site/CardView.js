import React from 'react'

import { Space, Card, Typography, Avatar, Image } from 'antd'

const { Title } = Typography

const SuitImage = ({ image, style }) => (
  <Avatar
    src={image}
    style={style}
  />
)

const CardCorner = ({ letter, image, flip }) => {
  const style = {
    margin: 0,
    transform: flip && 'rotate(180deg)'
  }

  const float = flip ? 'right' : 'left'

  return (
    <Space
      direction='vertical'
      style={{ display: 'flex', float }}
      align='center'
    >

      {flip && <SuitImage image={image} style={style} />}

      <Title
        level={2}
        style={style}
      >
        {letter}
      </Title>

      {!flip && <SuitImage image={image} style={style} />}

    </Space>
  )
}

const CardView = ({ gameOver, card }) => {
  if (gameOver) return null
  const { letter, image, abbreviation } = card

  return (
    <Card
      style={{ width: '300px' }}
    >
      <Space
        direction='vertical'
        size='small'
        style={{ display: 'flex' }}
      >

        <CardCorner key={`cornerTop${abbreviation}`} letter={letter} image={image} />

        <Image
          key={`main${abbreviation}`}
          preview={false}
          src={image}
          style={{ padding: 30 }}
        />

        <CardCorner key={`cornerBottom${abbreviation}`} letter={letter} image={image} flip />

      </Space>
    </Card>
  )
}

export default CardView
