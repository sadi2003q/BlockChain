"use client";

import { useState } from "react";
import { ethers } from "ethers";

const ABI = [
  {
    "inputs": [
      { "internalType": "uint256", "name": "a", "type": "uint256" },
      { "internalType": "uint256", "name": "b", "type": "uint256" }
    ],
    "name": "add",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "pure",
    "type": "function"
  }
];

export default function Home() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const addNumbers = async () => {
    const provider = new ethers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_RPC_URL
    );

    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
      ABI,
      provider
    );

    const res = await contract.add(Number(a), Number(b));
    setResult(Number(res));
  };

  return (
    <main style={{ padding: 40 }}>
      <h2>Add Two Numbers (Blockchain)</h2>

      <input
        placeholder="Number A"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Number B"
        value={b}
        onChange={(e) => setB(e.target.value)}
      />
      <br /><br />

      <button onClick={addNumbers}>Add</button>

      {result !== null && (
        <p>Result from blockchain: <b>{result}</b></p>
      )}
    </main>
  );
}