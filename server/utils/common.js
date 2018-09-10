const validateToken = (token) => {
    return typeof token === 'string';
};

const isValidDate = (d) => {
    return d instanceof Date && !isNaN(d);
};

module.exports = {
    validateToken,
    isValidDate,
};
