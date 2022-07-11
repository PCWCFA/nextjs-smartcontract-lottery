import { useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "../constants";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";

const LotteryEntrance = () => {
  const [entranceFee, setEntranceFee] = useState("0");
  const [numPlayers, setNumPlayers] = useState("0");
  const [recentWinner, setRecentWinner] = useState("0");
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const raffleAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const dispatch = useNotification();

  const {
    runContractFunction: enterRaffle,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "enterRaffle",
    params: {},
    msgValue: entranceFee,
  });

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getEntranceFee",
    params: {},
  });

  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getNumberOfPlayers",
    params: {},
  });

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getRecentWinner",
    params: {},
  });

  async function updateUI() {
    const entranceFeeFromCall = (await getEntranceFee()).toString();
    setEntranceFee(entranceFeeFromCall);
    const numPlayersFromCall = (await getNumberOfPlayers()).toString();
    setNumPlayers(numPlayersFromCall);
    const recentWinnerFromCall = await getRecentWinner();
    setRecentWinner(recentWinnerFromCall);
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      // try to read the entrance fee
      updateUI();
    }
  }, [isWeb3Enabled]);

  const handleSuccess = async function (tx) {
    await tx.wait(1);
    hanldeNewNotification(tx);
    updateUI();
  };

  const hanldeNewNotification = function (tx) {
    dispatch({
      type: "info",
      message: "Transaction complete",
      title: "Tx notification",
      icon: "bell",
      position: "topR",
    });
  };

  return (
    <div>
      <h1> Lottery Entrance </h1>{" "}
      {raffleAddress ? (
        <div>
          {" "}
          Entrance fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH
          <br />
          Number of players: {numPlayers}
          <br />
          Recent winner: {recentWinner}
          <br />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
            disabled={isLoading || isFetching}
            onClick={async function () {
              await enterRaffle({
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
              });
            }}
          >
            {isLoading || isFetching ? (
              <div className="animte-spin spinner-border h-8 w-8 border-b-2 rounded-full">
                {" "}
              </div>
            ) : (
              <div> Enter raffle </div>
            )}
          </button>
        </div>
      ) : (
        <div> No raffle address detected</div>
      )}
    </div>
  );
};

export default LotteryEntrance;
