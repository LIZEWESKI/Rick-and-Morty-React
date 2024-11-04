import hangingOutImg from '../assets/RickImagesAnswers/hanging-with-friends.jpg';
import bingeWatchingImg from '../assets/RickImagesAnswers/watching-tv.jpg';
import exploringPlacesImg from '../assets/RickImagesAnswers/exploring-new-places.jpg';
import laughItOffImg from '../assets/RickImagesAnswers/laughing-off.jpg';
import overthinkingImg from '../assets/RickImagesAnswers/overthink-it.jpg';
import seekHelpImg from '../assets/RickImagesAnswers/seek-help-from-others.jpg';
import alienJuiceImg from '../assets/RickImagesAnswers/alien-juice.png';
import interdimensionalElixirImg from '../assets/RickImagesAnswers/interdimensional-elixir.jpg';
import coffeeImg from '../assets/RickImagesAnswers/coffee.png';
import relaxingNatureImg from '../assets/RickImagesAnswers/Relaxing-in-nature.jpg';
import mountainAdventureImg from '../assets/RickImagesAnswers/mountain-adventure.jpg';
import portalGunImg from '../assets/RickImagesAnswers/portal-gun.jpg';
import spaceshipImg from '../assets/RickImagesAnswers/space-ship.jpg';

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
