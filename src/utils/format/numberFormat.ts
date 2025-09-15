function stringToNumber(s?: string) {
  if (s) {
    return Number(s);
  } else {
    return 0;
  }
}

export { stringToNumber };
