export const calcDiscontPercent = (price: number, discontPrice: number) => {
  return Math.floor(((price - discontPrice) / price) * 100);
};
