import React from 'react'
import { Card, Space, Avatar, Typography } from 'antd'

const { Text, Title } = Typography

const SiteTitle = () => {
  return (
    <Space align='center' size='large' style={{ margin: 6 }}>
      <Avatar size={64} shape='square' src='https://res.cloudinary.com/nodejavascript-com/image/upload/v1676852135/card-sharks/card-game_ygwepd.png' />
      <Title level={3}>card-sharks</Title>
    </Space>
  )
}

const SiteHeader = () => {
  return (
    <Card
      title={<SiteTitle />}
    >
      <Text italic>
        A single player card game where you guess if the next card is higher or lower.
      </Text>
    </Card>
  )
}

export default SiteHeader
