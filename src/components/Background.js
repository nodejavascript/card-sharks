import React from 'react'

import { Row } from 'antd'

const style = {
  padding: 16,
  // backgroundColor: '#F5F5F5',
  backgroundColor: '#F5F5F5',
  minHeight: '100%'
}

const Background = ({ children }) => <Row align='center' style={style}>{children}</Row>

export default Background
