import React from 'react'

import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'

const ButtonFullScreen = ({ fullScreen, setFullScreen }) => {
  const title = fullScreen ? 'Exit full screen' : 'Full screen'
  const icon = fullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />

  return (
    <Tooltip
      title={title}
    >
      <Button
        type='link'
        size='large'
        icon={icon}
        onClick={() => setFullScreen(!fullScreen)}
      />
    </Tooltip>
  )
}

export default ButtonFullScreen
