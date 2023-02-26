
const cloudnaryPrefix = 'https://res.cloudinary.com/nodejavascript-com/image/upload/card-sharks/cards'

// https://res.cloudinary.com/nodejavascript-com/image/upload/v1677420633/card-sharks/cards/king_of_diamonds.png

export const returnShuffledCards = () => {
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']

  const faces = [
    ...[2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {
      return {
        name: i.toString(),
        value: i
      }
    }),
    {
      name: 'Jack',
      value: 11
    },
    {
      name: 'Queen',
      value: 12
    },
    {
      name: 'King',
      value: 13
    },
    {
      name: 'Ace',
      value: 14
    }
  ]

  const cards = []

  suits.forEach(suit => {
    faces.forEach(face => {
      cards.push({
        name: `${face.name} of ${suit}`,
        value: face.value,
        src: `${cloudnaryPrefix}/${face.name.toLowerCase()}_of_${suit.toLowerCase()}.png`
      })
    })
  })

  return cards.sort(() => Math.random() - 0.5)
}
