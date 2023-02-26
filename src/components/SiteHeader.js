import React from 'react'

import ButtonFullScreen from './ButtonFullScreen'

import { Card, Space, Avatar, Typography, List, Alert } from 'antd'

const { Text, Title } = Typography
const { Item } = List

const SiteTitle = () => {
  return (
    <Space align='center' size='large' style={{ margin: 6 }}>
      <Avatar size={64} shape='square' src='https://res.cloudinary.com/nodejavascript-com/image/upload/v1676852135/card-sharks/card-game_ygwepd.png' />
      <Title level={3}>card-sharks</Title>
    </Space>
  )
}

const SiteHeader = ({ fullScreen, setFullScreen }) => {
  if (fullScreen) {
    return (
      <List bordered>
        <Item
          style={{ width: '100%' }}
        >
          <SiteTitle />
          <ButtonFullScreen fullScreen={fullScreen} setFullScreen={setFullScreen} />
        </Item>
      </List>
    )
  }

  const description = (
    <Space direction='vertical'>
      <>1. Guess if the next card drawn will be higher or lower</>
      <>2. Aces are high for card sharks</>
      <>3. Try to get as many correct guesses in a row</>
    </Space>
  )

  return (
    <Card
      title={<SiteTitle />}
      extra={<ButtonFullScreen fullScreen={fullScreen} setFullScreen={setFullScreen} />}
    >
      <Space
        direction='vertical'
        style={{ display: 'flex' }}
        size='large'
      >
        <Text italic>
          A single player card game where you guess if the next card is higher or lower.
        </Text>
        <Alert
          type='success'
          closable
          message='Rules'
          description={description}
        />
        <Alert
          type='warning'
          closable
          message={<i>Your high score is saved unless you refresh the page.</i>}
        />
      </Space>
    </Card>
  )
}

export default SiteHeader
