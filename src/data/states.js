export const states = [
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    description: 'The Land of Kings, where desert meets royalty and tradition thrives in every corner.',
    image: 'Images/Rajasthan.jpg',
    color: 'from-saffron to-terracotta',
    villages: ['bishnoi', 'khuri', 'bagru', 'ranakpur', 'samode'],
    highlights: ['Desert landscapes', 'Royal heritage', 'Folk culture', 'Traditional crafts']
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    description: 'A vibrant state where ancient traditions meet modern progress, rich in culture and commerce.',
    image: 'Images/Gujarat.jpg',
    color: 'from-leaf-green to-deep-green',
    villages: ['hodka', 'poshina', 'dholavira', 'dasada', 'mandvi'],
    highlights: ['Rann of Kutch', 'Tribal culture', 'Textile heritage', 'Coastal beauty']
  },
  {
    id: 'kerala',
    name: 'Kerala',
      description: 'God\'s Own Country, where backwaters weave through lush landscapes and ancient traditions.',
      image: 'Images/Kerala.jpg',
    color: 'from-leaf-green to-deep-green',
    villages: ['kumarakom', 'aranmula', 'kovalam', 'wayanad', 'fort-kochi'],
    highlights: ['Backwaters', 'Ayurveda', 'Spice plantations', 'Coastal culture']
  },
  {
    id: 'west-bengal',
    name: 'West Bengal',
    description: 'Where literature meets culture, from the intellectual hub of Kolkata to rural Bengal\'s charm.',
    image: 'Images/West Bengal.jpg',
    color: 'from-saffron to-terracotta',
    villages: ['shantiniketan', 'bishnupur', 'sundarbans', 'darjeeling', 'murshidabad'],
    highlights: ['Literary heritage', 'Tea gardens', 'Mangrove forests', 'Classical arts']
  },
  {
    id: 'assam',
    name: 'Assam',
    description: 'The gateway to Northeast India, where tea gardens meet wildlife and tribal traditions.',
    image: 'Images/Assam.jpg',
    color: 'from-leaf-green to-deep-green',
    villages: ['majuli', 'sualkuchi', 'kaziranga', 'tezpur', 'haflong'],
    highlights: ['Tea estates', 'Wildlife sanctuaries', 'Tribal culture', 'River islands']
  }
]

export const getStateById = (id) => states.find(state => state.id === id)
