import hangingOutImg from '../assets/RickImagesAnswers/hanging-with-friends.webp';
import bingeWatchingImg from '../assets/RickImagesAnswers/watching-tv.webp';
import exploringPlacesImg from '../assets/RickImagesAnswers/exploring-new-places.webp';
import laughItOffImg from '../assets/RickImagesAnswers/laughing-off.webp';
import overthinkingImg from '../assets/RickImagesAnswers/overthink-it.webp';
import seekHelpImg from '../assets/RickImagesAnswers/seek-help-from-others.webp';
import alienJuiceImg from '../assets/RickImagesAnswers/alien-juice.webp';
import interdimensionalElixirImg from '../assets/RickImagesAnswers/interdimensional-elixir.webp';
import coffeeImg from '../assets/RickImagesAnswers/coffee.webp';
import relaxingNatureImg from '../assets/RickImagesAnswers/Relaxing-in-nature.webp';
import mountainAdventureImg from '../assets/RickImagesAnswers/mountain-adventure.webp';
import portalGunImg from '../assets/RickImagesAnswers/portal-gun.webp';
import spaceshipImg from '../assets/RickImagesAnswers/space-ship.webp';

const quizQuestions = [
    {
        question: "What’s your favorite way to spend a weekend?",
        answers: [
            { text: "Hanging out with friends", imgUrl: hangingOutImg },
            { text: "Binge-watching shows", imgUrl: bingeWatchingImg },
            { text: "Exploring new places", imgUrl: exploringPlacesImg }
        ]
    },
    {
        question: "How do you handle stress?",
        answers: [
            { text: "Laugh it off", imgUrl: laughItOffImg },
            { text: "Overthink it", imgUrl: overthinkingImg },
            { text: "Seek help from others", imgUrl: seekHelpImg }
        ]
    },
    {
        question: "Pick a drink for your adventure:",
        answers: [
            { text: "Alien Juice", imgUrl: alienJuiceImg },
            { text: "Interdimensional Elixir", imgUrl: interdimensionalElixirImg },
            { text: "Coffee", imgUrl: coffeeImg }
        ]
    },
    {
        question: "What’s your ideal way to unwind?",
        answers: [
            { text: "Relaxing in nature", imgUrl: relaxingNatureImg },
            { text: "Mountain adventure", imgUrl: mountainAdventureImg }
        ]
    },
    {
        question: "Choose your travel companion:",
        answers: [
            { text: "A portal gun", imgUrl: portalGunImg },
            { text: "A spaceship", imgUrl: spaceshipImg }
        ]
    }
];

export default quizQuestions;
