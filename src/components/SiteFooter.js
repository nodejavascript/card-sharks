import React from 'react'

import { Typography, Card, Space } from 'antd'
const { Link } = Typography

const notes = [
  {
    title: 'GitHub',
    href: 'https://github.com/nodejavascript/card-sharks',
    linkText: 'Readme'
  },
  {
    title: 'Attribution',
    href: 'https://www.flaticon.com/authors/freepik',
    linkText: 'Thank you freepik for the free flaticon.com icon 👍'
  },
  {
    title: 'Attribution',
    href: 'https://github.com/hayeah',
    linkText: 'Thank you @hayeah for the playing cards 👍'
  },
  {
    title: 'Created by',
    href: 'https://github.com/nodejavascript',
    linkText: '@nodejavascript'
  }
]

const SiteFooter = () => {
  return (
    <Space wrap>
      {
        notes.map((note, index) => {
          const { title, href, linkText } = note

          return (
            <Card key={`footerNote${index}`} title={title}>
              <Link href={href}>
                {linkText}
              </Link>
            </Card>
          )
        })
      }
    </Space>
  )
}

export default SiteFooter
