export function randomIn(s = 5) {
    return (Math.random() - 0.5) * s;
}

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function random(min, max) {
  return Math.random() * (max - min) + min;
}