function getPrimes(num: number): number[] {
  const sieve = [];
  const primes: number[] = [];

  for (let i = 2; i <= num; i++) {
    if (!sieve[i]) {
      primes.push(i);
      for (let j = i * i; j <= num; j += i) {
        sieve[j] = true;
      }
    }
  }
  return primes;
}

export const primeNumbers: number[] = [...getPrimes(53)];

export const shuffledCards = (arr: number[]) => {
  return arr
    .concat(arr)
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ card, id: Math.random(), matched: false }));
};
