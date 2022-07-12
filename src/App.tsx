import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { ConnectWallet } from './components/ConnectWallet';

// Constants
const TWITTER_HANDLE: string = '_buildspace';
const TWITTER_LINK: string = `https://twitter.com/${TWITTER_HANDLE}`;
const TEST_GIFS = [
  'https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp',
  'https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g',
  'https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g',
  'https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp'
];

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async() => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found")

          const response = await solana.connect({ onlyIfTrusted: true})
          console.log("Connected with Public Key:", response.publicKey.toString())
        
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("Solana object not found! Get a Phantom wallet.")
      }
    } catch (error) {
      console.error(error)
    }
  }

  const connectWallet = async() => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString())
      setWalletAddress(response.publicKey.toString())
    }
  };

  // check if we have a connection to phantom wallet on firt mount of component
  useEffect(() => {
    const onLoad = async() => {
      await checkIfWalletIsConnected();
    };

    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  if (!walletAddress) {
    return (
      <div className="App">
        <div className={walletAddress ? 'authed-container' : 'container'}>
          <div className="header-container">
            <p className="header">🖼 GIF Portal</p>
            <p className="sub-text">
              View your GIF collection in the metaverse ✨
            </p>
            <ConnectWallet onClick={connectWallet}></ConnectWallet>
          </div>
          <div className="footer-container">
            <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
            <a
              className="footer-text"
              href={TWITTER_LINK}
              target="_blank"
              rel="noreferrer"
            >{`built on @${TWITTER_HANDLE}`}</a>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
