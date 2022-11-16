function prime(n, flag) {
  typeof flag === 'undefined' || flag === false
    ? (flag = false)
    : (flag = true);

  function isPrime(num) {
    if (num === 0 || num === 1) {
      return false;
    }
    for (var i = 2; i < num; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }

  if (flag) {
    var arr = [2];
    for (var i = 3; i <= n; i += 2) {
      if (isPrime(i)) {
        arr.push(i);
      }
    }
    return arr;
  } else {
    return isPrime(n);
  }
}

export const primeNumbers = [...prime(53, true), ...prime(53, true)];

export const shuffledCards = (arr) => {
  return arr
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ card, id: Math.random(), matched: false }));
};
