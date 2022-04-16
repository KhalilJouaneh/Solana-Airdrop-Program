const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
   } = require("@solana/web3.js");

// Keypair class allows us to create a new wallet

const newPair = new Keypair();

// We now have a wallet object of type Keypair and will be airdropping SOL into this wallet.

const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const secretKey = newPair._keypair.secretKey

const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"),"confirmed");
        const myWallet = await Keypair.fromSecretKey(secretKey);
        const walletBalance = await connection.getBalance(new PublicKey(myWallet.publicKey));
        console.log(`=> For wallet address ${publicKey}`);
        console.log(`secret key is ${secretKey}`);
        console.log(`   Wallet balance: ${parseInt(walletBalance)/LAMPORTS_PER_SOL}SOL`);

    } catch (err) {
        console.log(err);
    }
}

const airDropSol = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"),"confirmed");
        const walletKeyPair = await Keypair.fromSecretKey(secretKey);
        console.log(`-- Airdropping 2 SOL --`)
        const fromAirDropSignature= await connection.requestAirdrop(new PublicKey(walletKeyPair.publicKey), 2 * LAMPORTS_PER_SOL);
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

//testing functions 
const driverFunction = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

driverFunction();