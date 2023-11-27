
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const WalletConnectButton: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [hasUpBrowserExtension, setHasUpBrowserExtension] = useState(false);
  const [signer, setSigner] = useState(undefined);

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
        setSigner(provider.getSigner());
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }

  async function execute() {//@ts-ignore
    if (typeof window.lukso !== "undefined") {
      try {
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
          <button
  onClick={() => connect()} id="connect_button"
>
  Connect
</button>
        )
      ) : (
        "Please install metamask"
      )}

      {isConnected ? <button onClick={() => execute()}  className="border border-aqua-500 hover:border-green-500 text-aqua-500 hover:text-green-500 px-4 py-2 rounded-md"
>Execute</button> : ""}
    </div>
  );
}
export default WalletConnectButton;