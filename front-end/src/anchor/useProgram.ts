import { useEffect, useState } from "react";
import { Connection } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor"

import idl from "./idl.json";


type ProgramProps = {
  connection: Connection;
  wallet?: anchor.Wallet;
};

export const useProgram = ({ connection, wallet }: ProgramProps) => {
  const [program, setProgram] = useState<anchor.Program<anchor.Idl>>();

  useEffect(() => {
    updateProgram();
  }, [connection, wallet]);

  const updateProgram = () => {
    if (!wallet) return
    const provider = new anchor.AnchorProvider(connection, wallet, {
      preflightCommitment: "recent",
      commitment: "processed",
      skipPreflight: true,
    });
    const program = new anchor.Program(idl as anchor.Idl, provider);
    setProgram(program);
  };

  return {
    program,
  };
};




