// components/WalletConnectButton.tsx
import { ethers, Signer } from "ethers";
import { useEffect, useState } from "react";

interface WalletConnectButtonProps {
  setSigner: (signer: ethers.Signer) => void;
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({ setSigner }) => {  const [isConnected, setIsConnected] = useState(false);
  const [hasUpBrowserExtension, setHasUpBrowserExtension] = useState(false);
 

  useEffect(() => { //@ts-ignore
    if (typeof window.lukso !== "undefined") {
      setHasUpBrowserExtension(true);
    }
  });

  async function connect() {//@ts-ignore
    if (typeof window.lukso !== "undefined") {
      try {//@ts-ignore
        await lukso.request({ method: "eth_requestAccounts" });
        setIsConnected(true);//@ts-ignore
        const provider = new ethers.BrowserProvider(window.lukso);//@ts-ignore
        const signer: ethers.Signer = await provider.getSigner();
                // pass the signer to the setSigner function
        setSigner(signer);
        console.log("signer can execute if we log signer here: ", signer); // use it here
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }

  async function execute(signer?: Signer) {//@ts-ignore
    if (typeof window.lukso !== "undefined") {
      try {//@ts-ignore
        console.log("signer can execute if we log signer here: ", signer);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }
  return (
    <div>
      {hasUpBrowserExtension ? (
        isConnected ? (
          "Connected! "
        ) : (
          <button className="button" 
  onClick={() => connect()} 
>
  Connect
</button>
        )
      ) : (
        "Please install metamask"
      )}

      {isConnected ? <button className="button" onClick={() => execute()}  >Execute</button> : ""}
    </div>
  );
}
export default WalletConnectButton;