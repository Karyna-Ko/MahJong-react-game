const primeNumbers = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53,
];

const arrayOfPrimeNumbers = [...primeNumbers, ...primeNumbers];

const shuffledCards = arrayOfPrimeNumbers
  .sort(() => Math.random() - 0.5)
  .map((card) => ({ card, id: Math.random(), matched: false }));

export default shuffledCards;
