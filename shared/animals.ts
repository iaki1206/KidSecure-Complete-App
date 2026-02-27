/**
 * Animal metadata for graphical password system
 * 125 child-friendly animals across 5 categories
 */

export interface AnimalImage {
  id: string;
  name: string;
  category: 'farm' | 'wild' | 'sea' | 'bird' | 'insect';
  filename: string;
}

export const ANIMALS: AnimalImage[] = [
  // Farm Animals (25)
  { id: "farm-cow", name: "Cow", category: "farm", filename: "farm-cow.png" },
  { id: "farm-pig", name: "Pig", category: "farm", filename: "farm-pig.png" },
  { id: "farm-sheep", name: "Sheep", category: "farm", filename: "farm-sheep.png" },
  { id: "farm-horse", name: "Horse", category: "farm", filename: "farm-horse.png" },
  { id: "farm-chicken", name: "Chicken", category: "farm", filename: "farm-chicken.png" },
  { id: "farm-duck", name: "Duck", category: "farm", filename: "farm-duck.png" },
  { id: "farm-goat", name: "Goat", category: "farm", filename: "farm-goat.png" },
  { id: "farm-rabbit", name: "Rabbit", category: "farm", filename: "farm-rabbit.png" },
  { id: "farm-turkey", name: "Turkey", category: "farm", filename: "farm-turkey.png" },
  { id: "farm-donkey", name: "Donkey", category: "farm", filename: "farm-donkey.png" },
  { id: "farm-rooster", name: "Rooster", category: "farm", filename: "farm-rooster.png" },
  { id: "farm-goose", name: "Goose", category: "farm", filename: "farm-goose.png" },
  { id: "farm-llama", name: "Llama", category: "farm", filename: "farm-llama.png" },
  { id: "farm-alpaca", name: "Alpaca", category: "farm", filename: "farm-alpaca.png" },
  { id: "farm-guinea-pig", name: "Guinea Pig", category: "farm", filename: "farm-guinea-pig.png" },
  { id: "farm-cat", name: "Cat", category: "farm", filename: "farm-cat.png" },
  { id: "farm-dog", name: "Dog", category: "farm", filename: "farm-dog.png" },
  { id: "farm-mouse", name: "Mouse", category: "farm", filename: "farm-mouse.png" },
  { id: "farm-hamster", name: "Hamster", category: "farm", filename: "farm-hamster.png" },
  { id: "farm-pony", name: "Pony", category: "farm", filename: "farm-pony.png" },
  { id: "farm-calf", name: "Calf", category: "farm", filename: "farm-calf.png" },
  { id: "farm-lamb", name: "Lamb", category: "farm", filename: "farm-lamb.png" },
  { id: "farm-piglet", name: "Piglet", category: "farm", filename: "farm-piglet.png" },
  { id: "farm-chick", name: "Chick", category: "farm", filename: "farm-chick.png" },
  { id: "farm-foal", name: "Foal", category: "farm", filename: "farm-foal.png" },
  
  // Wild Animals (25)
  { id: "wild-lion", name: "Lion", category: "wild", filename: "wild-lion.png" },
  { id: "wild-elephant", name: "Elephant", category: "wild", filename: "wild-elephant.png" },
  { id: "wild-giraffe", name: "Giraffe", category: "wild", filename: "wild-giraffe.png" },
  { id: "wild-zebra", name: "Zebra", category: "wild", filename: "wild-zebra.png" },
  { id: "wild-tiger", name: "Tiger", category: "wild", filename: "wild-tiger.png" },
  { id: "wild-bear", name: "Bear", category: "wild", filename: "wild-bear.png" },
  { id: "wild-panda", name: "Panda", category: "wild", filename: "wild-panda.png" },
  { id: "wild-monkey", name: "Monkey", category: "wild", filename: "wild-monkey.png" },
  { id: "wild-gorilla", name: "Gorilla", category: "wild", filename: "wild-gorilla.png" },
  { id: "wild-chimpanzee", name: "Chimpanzee", category: "wild", filename: "wild-chimpanzee.png" },
  { id: "wild-orangutan", name: "Orangutan", category: "wild", filename: "wild-orangutan.png" },
  { id: "wild-kangaroo", name: "Kangaroo", category: "wild", filename: "wild-kangaroo.png" },
  { id: "wild-koala", name: "Koala", category: "wild", filename: "wild-koala.png" },
  { id: "wild-rhino", name: "Rhino", category: "wild", filename: "wild-rhino.png" },
  { id: "wild-hippo", name: "Hippo", category: "wild", filename: "wild-hippo.png" },
  { id: "wild-leopard", name: "Leopard", category: "wild", filename: "wild-leopard.png" },
  { id: "wild-cheetah", name: "Cheetah", category: "wild", filename: "wild-cheetah.png" },
  { id: "wild-wolf", name: "Wolf", category: "wild", filename: "wild-wolf.png" },
  { id: "wild-fox", name: "Fox", category: "wild", filename: "wild-fox.png" },
  { id: "wild-deer", name: "Deer", category: "wild", filename: "wild-deer.png" },
  { id: "wild-moose", name: "Moose", category: "wild", filename: "wild-moose.png" },
  { id: "wild-raccoon", name: "Raccoon", category: "wild", filename: "wild-raccoon.png" },
  { id: "wild-squirrel", name: "Squirrel", category: "wild", filename: "wild-squirrel.png" },
  { id: "wild-hedgehog", name: "Hedgehog", category: "wild", filename: "wild-hedgehog.png" },
  { id: "wild-skunk", name: "Skunk", category: "wild", filename: "wild-skunk.png" },
  
  // Sea Creatures (25)
  { id: "sea-dolphin", name: "Dolphin", category: "sea", filename: "sea-dolphin.png" },
  { id: "sea-whale", name: "Whale", category: "sea", filename: "sea-whale.png" },
  { id: "sea-shark", name: "Shark", category: "sea", filename: "sea-shark.png" },
  { id: "sea-octopus", name: "Octopus", category: "sea", filename: "sea-octopus.png" },
  { id: "sea-jellyfish", name: "Jellyfish", category: "sea", filename: "sea-jellyfish.png" },
  { id: "sea-starfish", name: "Starfish", category: "sea", filename: "sea-starfish.png" },
  { id: "sea-crab", name: "Crab", category: "sea", filename: "sea-crab.png" },
  { id: "sea-lobster", name: "Lobster", category: "sea", filename: "sea-lobster.png" },
  { id: "sea-seahorse", name: "Seahorse", category: "sea", filename: "sea-seahorse.png" },
  { id: "sea-turtle", name: "Turtle", category: "sea", filename: "sea-turtle.png" },
  { id: "sea-seal", name: "Seal", category: "sea", filename: "sea-seal.png" },
  { id: "sea-walrus", name: "Walrus", category: "sea", filename: "sea-walrus.png" },
  { id: "sea-penguin", name: "Penguin", category: "sea", filename: "sea-penguin.png" },
  { id: "sea-fish", name: "Fish", category: "sea", filename: "sea-fish.png" },
  { id: "sea-clownfish", name: "Clownfish", category: "sea", filename: "sea-clownfish.png" },
  { id: "sea-angelfish", name: "Angelfish", category: "sea", filename: "sea-angelfish.png" },
  { id: "sea-pufferfish", name: "Pufferfish", category: "sea", filename: "sea-pufferfish.png" },
  { id: "sea-stingray", name: "Stingray", category: "sea", filename: "sea-stingray.png" },
  { id: "sea-eel", name: "Eel", category: "sea", filename: "sea-eel.png" },
  { id: "sea-squid", name: "Squid", category: "sea", filename: "sea-squid.png" },
  { id: "sea-orca", name: "Orca", category: "sea", filename: "sea-orca.png" },
  { id: "sea-narwhal", name: "Narwhal", category: "sea", filename: "sea-narwhal.png" },
  { id: "sea-manatee", name: "Manatee", category: "sea", filename: "sea-manatee.png" },
  { id: "sea-otter", name: "Otter", category: "sea", filename: "sea-otter.png" },
  { id: "sea-coral", name: "Coral", category: "sea", filename: "sea-coral.png" },
  
  // Birds (25)
  { id: "bird-parrot", name: "Parrot", category: "bird", filename: "bird-parrot.png" },
  { id: "bird-owl", name: "Owl", category: "bird", filename: "bird-owl.png" },
  { id: "bird-eagle", name: "Eagle", category: "bird", filename: "bird-eagle.png" },
  { id: "bird-peacock", name: "Peacock", category: "bird", filename: "bird-peacock.png" },
  { id: "bird-flamingo", name: "Flamingo", category: "bird", filename: "bird-flamingo.png" },
  { id: "bird-toucan", name: "Toucan", category: "bird", filename: "bird-toucan.png" },
  { id: "bird-hummingbird", name: "Hummingbird", category: "bird", filename: "bird-hummingbird.png" },
  { id: "bird-robin", name: "Robin", category: "bird", filename: "bird-robin.png" },
  { id: "bird-sparrow", name: "Sparrow", category: "bird", filename: "bird-sparrow.png" },
  { id: "bird-crow", name: "Crow", category: "bird", filename: "bird-crow.png" },
  { id: "bird-raven", name: "Raven", category: "bird", filename: "bird-raven.png" },
  { id: "bird-woodpecker", name: "Woodpecker", category: "bird", filename: "bird-woodpecker.png" },
  { id: "bird-pelican", name: "Pelican", category: "bird", filename: "bird-pelican.png" },
  { id: "bird-swan", name: "Swan", category: "bird", filename: "bird-swan.png" },
  { id: "bird-crane", name: "Crane", category: "bird", filename: "bird-crane.png" },
  { id: "bird-stork", name: "Stork", category: "bird", filename: "bird-stork.png" },
  { id: "bird-kingfisher", name: "Kingfisher", category: "bird", filename: "bird-kingfisher.png" },
  { id: "bird-cardinal", name: "Cardinal", category: "bird", filename: "bird-cardinal.png" },
  { id: "bird-bluebird", name: "Bluebird", category: "bird", filename: "bird-bluebird.png" },
  { id: "bird-canary", name: "Canary", category: "bird", filename: "bird-canary.png" },
  { id: "bird-finch", name: "Finch", category: "bird", filename: "bird-finch.png" },
  { id: "bird-pigeon", name: "Pigeon", category: "bird", filename: "bird-pigeon.png" },
  { id: "bird-dove", name: "Dove", category: "bird", filename: "bird-dove.png" },
  { id: "bird-seagull", name: "Seagull", category: "bird", filename: "bird-seagull.png" },
  { id: "bird-hawk", name: "Hawk", category: "bird", filename: "bird-hawk.png" },
  
  // Insects (25)
  { id: "insect-butterfly", name: "Butterfly", category: "insect", filename: "insect-butterfly.png" },
  { id: "insect-ladybug", name: "Ladybug", category: "insect", filename: "insect-ladybug.png" },
  { id: "insect-bee", name: "Bee", category: "insect", filename: "insect-bee.png" },
  { id: "insect-dragonfly", name: "Dragonfly", category: "insect", filename: "insect-dragonfly.png" },
  { id: "insect-ant", name: "Ant", category: "insect", filename: "insect-ant.png" },
  { id: "insect-grasshopper", name: "Grasshopper", category: "insect", filename: "insect-grasshopper.png" },
  { id: "insect-caterpillar", name: "Caterpillar", category: "insect", filename: "insect-caterpillar.png" },
  { id: "insect-snail", name: "Snail", category: "insect", filename: "insect-snail.png" },
  { id: "insect-beetle", name: "Beetle", category: "insect", filename: "insect-beetle.png" },
  { id: "insect-firefly", name: "Firefly", category: "insect", filename: "insect-firefly.png" },
  { id: "insect-cricket", name: "Cricket", category: "insect", filename: "insect-cricket.png" },
  { id: "insect-moth", name: "Moth", category: "insect", filename: "insect-moth.png" },
  { id: "insect-wasp", name: "Wasp", category: "insect", filename: "insect-wasp.png" },
  { id: "insect-bumblebee", name: "Bumblebee", category: "insect", filename: "insect-bumblebee.png" },
  { id: "insect-praying-mantis", name: "Praying Mantis", category: "insect", filename: "insect-praying-mantis.png" },
  { id: "insect-spider", name: "Spider", category: "insect", filename: "insect-spider.png" },
  { id: "insect-worm", name: "Worm", category: "insect", filename: "insect-worm.png" },
  { id: "insect-slug", name: "Slug", category: "insect", filename: "insect-slug.png" },
  { id: "insect-centipede", name: "Centipede", category: "insect", filename: "insect-centipede.png" },
  { id: "insect-millipede", name: "Millipede", category: "insect", filename: "insect-millipede.png" },
  { id: "insect-fly", name: "Fly", category: "insect", filename: "insect-fly.png" },
  { id: "insect-mosquito", name: "Mosquito", category: "insect", filename: "insect-mosquito.png" },
  { id: "insect-cicada", name: "Cicada", category: "insect", filename: "insect-cicada.png" },
  { id: "insect-cockroach", name: "Cockroach", category: "insect", filename: "insect-cockroach.png" },
  { id: "insect-scorpion", name: "Scorpion", category: "insect", filename: "insect-scorpion.png" },
];

/**
 * Get a random selection of animals for a grid
 * @param count Number of animals to select
 * @param excludeIds Optional array of IDs to exclude from selection
 */
export function getRandomAnimals(count: number, excludeIds: string[] = []): AnimalImage[] {
  const available = ANIMALS.filter(animal => !excludeIds.includes(animal.id));
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Get animals by category
 */
export function getAnimalsByCategory(category: string): AnimalImage[] {
  return ANIMALS.filter(animal => animal.category === category);
}

/**
 * Get animal by ID
 */
export function getAnimalById(id: string): AnimalImage | undefined {
  return ANIMALS.find(animal => animal.id === id);
}
