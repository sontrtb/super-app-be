function removeNullishValues(obj: any) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) =>
        value !== null && value !== undefined && value !== '',
    ),
  );
}

export { removeNullishValues };
