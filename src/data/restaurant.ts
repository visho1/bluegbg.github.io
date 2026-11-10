// All restaurant content lives here so it can be edited in one place.

export const restaurant = {
  name: 'Blue Brunch & Bar',
  tagline: 'Brunch på Vasagatan',
  address: 'Vasagatan 11',
  postal: '411 24 Göteborg',
  phone: '076-879 74 17',
  phoneHref: 'tel:+46768797417',
  instagram: 'https://www.instagram.com/',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Blue+Brunch+%26+Bar+Vasagatan+11+G%C3%B6teborg',
  mapsEmbed:
    'https://www.google.com/maps?q=Vasagatan+11,+411+24+G%C3%B6teborg&output=embed',
  rating: 4.1,
  reviewCount: 229,
  priceRange: '200–300 kr per person',
}

// Opening hours — verify against the restaurant's current schedule.
// day: 0 = Sunday … 6 = Saturday (matches Date.getDay()).
export const hours: {
  day: number
  label: string
  open?: string
  close?: string
}[] = [
  { day: 1, label: 'Måndag' },
  { day: 2, label: 'Tisdag', open: '10:00', close: '16:00' },
  { day: 3, label: 'Onsdag', open: '10:00', close: '16:00' },
  { day: 4, label: 'Torsdag', open: '10:00', close: '16:00' },
  { day: 5, label: 'Fredag', open: '10:00', close: '16:00' },
  { day: 6, label: 'Lördag', open: '10:00', close: '17:00' },
  { day: 0, label: 'Söndag', open: '10:00', close: '17:00' },
]

export type MenuItem = {
  name: string
  /** Price in kronor, incl. VAT. */
  price: number
  description?: string
  /** English description, shown under the Swedish one. */
  descriptionEn?: string
  tags?: string[]
  popular?: boolean
  isNew?: boolean
}

export type MenuCategory = {
  id: string
  title: string
  /** Compact categories (drinks, add-ons) render as a dense two-column price list. */
  compact?: boolean
  items: MenuItem[]
}

// Menu and prices as listed in the restaurant's ordering system. All prices incl. VAT.
export const menu: MenuCategory[] = [
  {
    id: 'brunch',
    title: 'Brunch',
    items: [
      {
        name: 'Scandi benedict',
        price: 189,
        isNew: true,
        description:
          'På rostat surdegsbröd med två pocherade ägg, hollandaisesås, räkröra, dill och citron. Toppas med chiliflakes.',
        descriptionEn:
          'On toasted sourdough bread with two poached eggs, hollandaise sauce & shrimps, dill & lemon. Topped with chili flakes.',
      },
      {
        name: 'Äppelpaj pannkaka',
        price: 159,
        isNew: true,
        description:
          'Amerikanska pannkakor med äppelkompott, kanel, kaksmulor, mascarpone med vanilj, toppat med pecannötter, lönnsirap.',
        descriptionEn:
          'American pancakes with apple compote, cinnamon, cake crumbs, mascarpone, topped with pecan nuts, maple syrup.',
      },
      {
        name: 'Äggröra med avokado/lax/bacon',
        price: 164,
        description:
          'På rostat surdegsbröd, färskost och antingen kallrökt lax eller avokadoröra. Toppas med picklad rödlök, ärtskott samt chiliflakes.',
        descriptionEn:
          'On toasted sourdough bread, cream cheese and either cold smoked salmon or avocado mash. Topped with pickled red onion, pea shoots and chili flakes.',
      },
      {
        name: 'Fried chicken benny',
        price: 189,
        description:
          'Friterad kyckling på briochebröd (sesam) med ett pocherat ägg, hollandaisesås, ärtskott, chiliflakes. Serveras med pommes & aioli.',
        descriptionEn:
          'Fried chicken on brioche bread (sesame) with a poached egg, hollandaise sauce, chili flakes. Served with fries & aioli.',
      },
      {
        name: 'Ägg benedict',
        price: 169,
        description:
          'På rostat surdegsbröd med två pocherade ägg, hollandaisesås & antingen bacon, avokadoröra eller kallrökt lax. Toppas med chiliflakes & ärtskott.',
        descriptionEn:
          'On toasted sourdough bread with two poached eggs, hollandaise sauce & either bacon, avocado mash or cold smoked salmon. Topped with chili flakes.',
      },
      {
        name: 'Avokadotoast',
        price: 105,
        tags: ['Vegetarisk'],
        description:
          'På surdegsbröd med avokadoröra, färskost, picklad rödlök, chiliflakes, koriander.',
        descriptionEn:
          'On sourdough bread with mashed avocado, cream cheese, pickled red onion, chili flakes, coriander.',
      },
      {
        name: 'Chicken & waffle',
        price: 179,
        popular: true,
        description:
          'Belgisk våffla med friterad kyckling, mangopuré, röd paprika, salladslök & koriander. Serveras med lönnsirap.',
        descriptionEn:
          'Belgian waffle with fried chicken, mango, cookie crumbs, red pepper, green onion & coriander. Served with maple syrup.',
      },
      {
        name: 'Spicy shakshuka',
        price: 159,
        tags: ['Vegetarisk'],
        description:
          'Stekta ägg med tomat, salladslök, fetaost & koriander. Serveras med rostat surdegsbröd.',
        descriptionEn:
          'Fried eggs with tomato, onion, feta cheese & coriander. Served with toasted sourdough bread.',
      },
      {
        name: 'Frozen mangoyoghurt',
        price: 149,
        description:
          'Grekisk yoghurt, mango, färska bär, hemmagjord granola, banan (går ej att ta bort), hemmagjort jordnötssmör & svarta sesamfrön.',
        descriptionEn:
          'Greek yogurt, mango, fresh berries, homemade granola, banana, homemade peanut butter & black sesame seeds.',
      },
      {
        name: 'Bärpannkakor',
        price: 159,
        description:
          'Amerikanska pannkakor med bärkompott, kaksmulor, mascarpone med vanilj, färska jordgubbar, lönnsirap.',
        descriptionEn:
          'American pancakes with berry compote, cake crumbs, vanilla cream, fresh strawberries, maple syrup.',
      },
      {
        name: 'Bananbröd',
        price: 119,
        description:
          'Med hemmagjort jordnötssmör, bärkompott, kaksmulor, färska bär, banan (garnering), riven choklad & mascarpone.',
        descriptionEn:
          'With homemade peanut butter, berry compote, cookie crumbs, fresh berries, banana (garnish), sesame seeds, grated chocolate & mascarpone.',
      },
      {
        name: 'Yoghurtbowl',
        price: 129,
        description:
          'Med grekisk yoghurt, hemmagjord bärkompott, fröcrunch med kanel & toppas med rivet citronskal.',
        descriptionEn:
          'With Greek yogurt, homemade berry compote, seed crunch with cinnamon & topped with grated lemon peel.',
      },
      {
        name: 'Acai bowl',
        price: 159,
        tags: ['Vegansk'],
        description:
          'Med acai, hemmagjord granola, färska bär, hemmagjort jordnötssmör, mango och banan.',
        descriptionEn:
          'With acai, homemade granola, fresh berries, homemade peanut butter, mango and banana.',
      },
      {
        name: 'Nutella toast',
        price: 119,
        description:
          'Briochebröd fyllt med nutella. Serveras med kaksmulor, mascarpone, färska bär, rostad kokosnöt & riven choklad.',
        descriptionEn:
          'Brioche bread filled with nutella. Served with cake crumbs, mascarpone, fresh berries, roasted coconut & grated chocolate.',
      },
      {
        name: 'Bacon pannkakor',
        price: 159,
        description:
          'Amerikanska pannkakor med bacon, färska blåbär, rostad kokosnöt & lönnsirap.',
        descriptionEn:
          'American pancakes, bacon, fresh blueberries, toasted coconut & maple syrup.',
      },
      {
        name: 'Grilled cheese',
        price: 119,
        description:
          'Med cheddar, mozzarella & jalapeño. Toppas med persilja & serveras med inlagd gurka.',
        descriptionEn:
          'With cheddar, mozzarella & jalapeño. Topped with parsley & served with pickled cucumber.',
      },
      {
        name: 'Chèvre toast',
        price: 129,
        description: 'Chèvreost, parmaskinka, honung.',
        descriptionEn: 'Goat cheese, Parma ham, honey.',
      },
      {
        name: 'Choco truffle pancakes',
        price: 159,
        description:
          'Amerikanska pannkakor med ljus choklad, kaksmulor, chokladtryffel, mascarpone, färska hallon, hallonkompott & lönnsirap.',
        descriptionEn:
          'American pancakes with milk chocolate, cookie crumbs, chocolate truffles, mascarpone, fresh raspberries, raspberry compote & maple syrup.',
      },
    ],
  },
  {
    id: 'smoothies',
    title: 'Smoothies & lemonad',
    items: [
      {
        name: 'Mango smoothie',
        price: 69,
        description: 'Mango, banan, vaniljyoghurt & mangojuice.',
        descriptionEn: 'Mango, banana, vanilla yogurt & mango juice.',
      },
      {
        name: 'Passion smoothie',
        price: 69,
        description:
          'Mango, passionsfrukt, jordgubb, äppeljuice, apelsinjuice & vaniljyoghurt.',
        descriptionEn:
          'Mango, passion fruit, strawberry, apple juice, orange juice & vanilla yogurt.',
      },
      { name: 'Rabarberlemonad', price: 43 },
      { name: 'Istelemonad persika', price: 43 },
    ],
  },
  {
    id: 'drinks',
    title: 'Dryck',
    compact: true,
    items: [
      { name: 'Bryggkaffe', price: 39 },
      { name: 'Americano', price: 38 },
      { name: 'Dubbel espresso', price: 35 },
      { name: 'Latte', price: 55 },
      { name: 'Cappuccino', price: 49 },
      { name: 'Islatte', price: 49 },
      { name: 'Jordgubbs islatte', price: 55 },
      { name: 'Blåbärs islatte', price: 55 },
      { name: 'Chailatte', price: 49 },
      { name: 'Ischailatte', price: 49 },
      { name: 'Dirty chai', price: 55 },
      { name: 'Varmchoklad', price: 49 },
      { name: 'Matcha liten', price: 55 },
      { name: 'Matcha stor', price: 61 },
      {
        name: 'Matcha bananbröd stor',
        price: 68,
        description: 'Innehåller kanel',
      },
      { name: 'Ismatcha', price: 61 },
      { name: 'Jordgubbs ismatcha', price: 68 },
      { name: 'Mango ismatcha', price: 68 },
      { name: 'Blåbärs ismatcha', price: 68 },
      {
        name: 'Ismatcha bananbröd',
        price: 68,
        description: 'Innehåller kanel',
      },
      { name: 'Te svart', price: 42 },
      { name: 'Te rött', price: 42 },
      { name: 'Te grönt', price: 42 },
      { name: 'Lemonad', price: 39 },
      { name: 'Jordgubbslemonad', price: 49 },
      { name: 'Apelsinjuice', price: 39 },
      { name: 'Äppeljuice', price: 39 },
      { name: 'Bubbelvatten', price: 33 },
      { name: 'Coca-Cola', price: 43 },
      { name: 'Coca-Cola Zero', price: 43 },
    ],
  },
  {
    id: 'extras',
    title: 'Tillägg',
    compact: true,
    items: [
      { name: 'Pommes', price: 49 },
      { name: 'Äggröra', price: 55 },
      { name: 'Friterad kyckling', price: 54 },
      { name: 'Kallrökt lax', price: 49 },
      { name: 'Avokadoröra', price: 40 },
      { name: 'Bacon', price: 39 },
      { name: 'Friterad halloumi', price: 39 },
      { name: 'Fetaost', price: 35 },
      { name: 'Extra pocherat ägg', price: 25 },
      { name: 'Jordnötssmör', price: 25 },
      { name: 'Nutella', price: 20 },
      { name: 'Lönnsirap', price: 20 },
      { name: 'Extra bröd', price: 20 },
      { name: 'Picklad rödlök', price: 15 },
    ],
  },
]

export const formatPrice = (kr: number) => `${kr} kr`

export const highlights = [
  {
    title: 'Chicken & waffle',
    image: '/img/chicken.png',
    note: 'Gästernas favorit',
  },
  {
    title: 'Avokadotoast',
    image: '/img/avocado.png',
    note: 'Avokado, färskost & rödlök',
  },
  {
    title: 'Bärpannkakor',
    image: '/img/pancakes.png',
    note: 'Bärkompott & mascarpone',
  },
  { title: 'Ägg benedict', image: '/img/benedict.png', note: 'Klassikern' },
  {
    title: 'Spicy shakshuka',
    image: '/img/shakshuka.png',
    note: 'Kryddig & värmande',
  },
]

export const reviews = [
  {
    author: 'Nima S.',
    meta: 'Local Guide',
    rating: 5,
    text: 'Maten var så god! Det var länge sen jag åt något nytt med så bra smak. Personalen var jättebra och snälla. Bra atmosfär var det där inne också.',
  },
  {
    author: 'Melis M.',
    meta: 'Local Guide',
    rating: 5,
    text: 'En mysig brunchatmosfär tidigt på förmiddagen var det jag behövde. God mat, service på under 10 min, personalen var trevliga. Inget att klaga.',
  },
  {
    author: 'Besökare',
    meta: 'Google-recension',
    rating: 5,
    text: 'Amazing. Waffle is so good. Syrup is so much aligned with chicken and waffle.',
  },
]
