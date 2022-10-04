const section = document.querySelector('section')

const data = [
  { imgSrc: './images/ari.webp', id: 'arisona' },
  { imgSrc: './images/cle.webp', id: 'clevland' },
  { imgSrc: './images/lv.webp', id: 'las-vegas' },
  { imgSrc: './images/mia.webp', id: 'miami' },
  { imgSrc: './images/sea.webp', id: 'seattle' },
  { imgSrc: './images/tb.webp', id: 'tampa-bay' },
]

const randomize = () => {
  const cardsList = data.concat(data)
  cardsList.sort(() => Math.random() - 0.5)
  return cardsList
}

const generateCards = () => {
  const cardsList = randomize()

  const cardsContainer = document.createDocumentFragment()
  cardsList.forEach((item) => {
    const card = document.createElement('div')
    const face = document.createElement('img')
    const back = document.createElement('div')
    card.classList = 'card'
    card.setAttribute('name', item.id)
    face.classList = 'face'
    back.classList = 'back'

    face.src = item.imgSrc

    card.append(face, back)
    cardsContainer.appendChild(card)

    card.addEventListener('click', ({ target }) => {
      card.classList.toggle('toggle')
      checkCards(target)
    })
  })
  section.appendChild(cardsContainer)
}

const removeClass = (item, className) => {
  item.classList.remove(className)
}

const checkCards = (clickedCards) => {
  clickedCards.classList.toggle('flipped')
  const flippedCards = document.querySelectorAll('.flipped')
  const cards = document.querySelectorAll('.card')
  const toggeledCards = document.querySelectorAll('.toggle')

  if (flippedCards.length === 2) {
    if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name'))
      flippedCards.forEach((card) => {
        card.classList.remove('flipped')
      })
    else {
      flippedCards.forEach((card) => {
        card.classList.remove('flipped')
        setTimeout(removeClass, 1000, card, 'toggle')
      })
    }
  }

  if (cards.length === toggeledCards.length) {
    setTimeout(() => restart(), 1000)
  }
}

const restart = () => {
  const cardsList = randomize()
  const faces = document.querySelectorAll('.face')
  const cards = document.querySelectorAll('.card')
  section.style.pointerEvents = 'none'

  cardsList.forEach((card, index) => {
    cards[index].classList.remove('toggle')
    setTimeout(() => {
      cards[index].style.pointerEvents = 'all'
      faces[index].src = card.imgSrc
      cards[index].setAttribute('name', card.id)
      section.style.pointerEvents = 'all'
    }, 1000)
  })
  setTimeout(() => alert('Well Done!'), 100)
}

generateCards()
