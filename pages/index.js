import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { useState, useEffect } from "react"

export default function Home() {
  const [accounts, setAccounts] = useState([])
  const [isConnected, setisConnected] = useState(false)
  const [isMetaMask, setisMetaMask] = useState(false)
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setisMetaMask(ethereum.isMetaMask)
      ethereum.on("disconnect", (error) => console.error)
    }
  }, [])

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      if (isConnected) {
        setAccounts([])
        setisConnected(false)
      } else {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        })
        console.log("ACCOUNTS", accounts)
        setAccounts(accounts)
        setisConnected(ethereum.isConnected())
      }
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Dyapp</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">Dapp</a>
        </h1>

        <p className={styles.description}>
          Let&apos;s start with a simple{" "}
          <code className={styles.code}>connect</code>
        </p>
        <button onClick={() => connectWallet()}>
          {isConnected ? "Disconnect" : "Connect Wallet"}{" "}
        </button>
        <p>Accounts:</p>
        {accounts.map((account) => account)}
        <p>isMetaMask: <code>{isMetaMask.toString()}</code></p>
        <p>isConnected: <code>{isConnected.toString()}</code></p>
      </main>
    </div>
  )
}
