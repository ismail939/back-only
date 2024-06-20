module.exports = async (oldRate, newRate, noOfReviews) => {
    if (newRate === 0) return oldRate;
    return (oldRate * noOfReviews + newRate) / (noOfReviews + 1);
}