import { useState } from "react";
import {  useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";

import { useProgram } from "../anchor/useProgram";
import { Wallet } from "@coral-xyz/anchor";
export default function IncrementButton() {
  const { publicKey,  } = useWallet();

  const [isLoading, setIsLoading] = useState(false);
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
 
  const { program } = useProgram({ connection, wallet: wallet as Wallet });

  const onClick = async () => {
    if (!publicKey) return;

    setIsLoading(true);

    (async () => {
      try {
          const txhash = await program?.methods
          .increment()
          .accounts({
              signer: publicKey,
          })
          .rpc();
          console.log(`Success! Check out your TX here: 
          https://explorer.solana.com/tx/${txhash}?cluster=custom&customUrl=http%3A%2F%2Flocalhost%3A8899`);
      } catch(e) {
          console.error(`Oops, something went wrong: ${e}`)
      }finally {
        setIsLoading(false);
      }
    })();
    
  
  };

  return (
    <>
      <button
        className="w-24"
        onClick={onClick}
        disabled={!publicKey}
      >
        {isLoading ? "Loading" : "Increment"}
      </button>
    </>
  );
}
