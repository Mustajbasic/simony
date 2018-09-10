const WalletHelper = (() => {
    const ValidateWallet = (wallet) => {
        return wallet &&
            wallet.name &&
            wallet.amount &&
            wallet.wallettypeID &&
            typeof wallet.name === 'string' &&
            typeof wallet.amount === 'number' &&
            typeof wallet.wallettypeID === 'number' &&
            wallet.name.length > 3;
    };

    return {
        ValidateWallet,
    };
})();

module.exports = WalletHelper;
