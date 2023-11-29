// mint.tsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Mint = () => {
    
const [nftName, setNftName] = useState("");
const [nftSymbol, setNftSymbol] = useState("");

return (
    <>
      <Navbar />
      <form>
      <div className="p-8 max-w-screen-xl mx-auto">
        <input id="nftName" name="nftName" type="text" placeholder="Enter NFT Name" onChange={(e) => setNftName(e.target.value)} value={nftName}/>
      </div>
      <div className="p-8 max-w-screen-xl mx-auto">
        <input id="nftSymbol" name="nftSymbol" type="text" placeholder="Enter NFT Symbol" onChange={(e) => setNftSymbol(e.target.value)} value={nftSymbol}/>
      </div>
      </form>
      </>
);

}
export default Mint;