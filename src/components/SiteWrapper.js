import React, { useState } from 'react'
import Background from './Background'

import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'

import { Space } from 'antd'

const SiteWrapper = ({ children }) => {
  const [fullScreen, setFullScreen] = useState()

  return (
    <Background>
      <Space direction='vertical' size='large'>

        <SiteHeader fullScreen={fullScreen} setFullScreen={setFullScreen} />

        {children}

        <SiteFooter fullScreen={fullScreen} />

      </Space>
    </Background>
  )
}

export default SiteWrapper
