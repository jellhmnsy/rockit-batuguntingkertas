import React, {
	createContext,
	useState,
	useContext,
	useEffect,
	useRef,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api, {
	getGameToken,
	login,
	postFinishMove,
	postJoinGame,
	postResultGame,
	postRoundMove,
	postStartGame,
} from "../api/restApi";

import Pusher from "pusher-js";
import { useAuth } from "./AuthContext";

const GameContext = createContext(); //untuk membuat konteks yang memungkinkan data tertentu tersedia untuk seluruh komponen yang ada dalam hierarki

export const GameProvider = ({ children }) => {
	const [token, setToken] = useState(null);
	const [playersJoined, setPlayersJoined] = useState(1); // Dynamic player count
	const [status, setStatus] = useState(null);
	const [scoreA, setScoreA] = useState(0);
	const [scoreB, setScoreB] = useState(0);
	const [timer, setTimer] = useState(5); // State untuk countdown timer
	const [playerChoice, setPlayerChoice] = useState(null); // Pilihan pemain
	const [showHands, setShowHands] = useState(false); // Tampilkan pilihan setelah timer habis
	const [round, setRound] = useState(1);
	const timerRef = useRef(null);
	const [handLeft, setHandLeft] = useState(null); // State untuk hand dari API
  const [showModal, setShowModal] = useState(false);
	const [gameOver, setGameOver] = useState(false); // State untuk game over
	const [resultMessage, setResultMessage] = useState(""); // Pesan hasil akhir
  const {userId} = useAuth();
  const [roundResult, setRoundResult] = useState("");
	const [username, setUsername] = useState(null);
	const [opponentUsername, setOpponentUsername] = useState(null);

	useEffect(() => {
		if (!token) return;

		const pusher = new Pusher("5ffd502396a114a03464", { cluster: "ap1" });
		const channel = pusher.subscribe(`game-${token}`);

		channel.bind("room-join", handleRoomJoin);
		channel.bind("room-start", handleRoomStart);
		channel.bind("round-move", handlePlayerMove);
		channel.bind("round-end", handlePlayerFinish);
    // channel.bind('room-end', handleGameEnd);
    // const handleGameEnd = () => {
    //   channel.unbind_all();
    //   channel.unsubscribe();
    // }
		return () => {
			channel.unbind_all();
			channel.unsubscribe();
		};
	}, [token]);
	console.log(userId,"userid")
	const handlePlayerMove = (data) => {
    console.log(data,"move pusher",userId);
		const isPlayer1 = data.data.player_1_id === userId;
    console.log(isPlayer1,userId);

		const opponentMove = isPlayer1
			? data.data.player_2_move
			: data.data.player_1_move;
		setHandLeft(opponentMove);
		setShowHands(true);
	};

	const handlePlayerFinish = (data) => {
    console.log(data,"finish pusher");
    setShowModal(false);
    handleRestart();
  };

	const handleGameEnd = () => {
    setStatus('Finished');

  };

	useEffect(() => {
		if (status === "Started") {
			handleRestart();
		}
	}, [status]);

	useEffect(() => {
		if(!gameOver){
			if (timer > 0) {
				timerRef.current = setInterval(() => {
					setTimer((prevTimer) => prevTimer - 1);
				}, 1000);
			} else {
				clearInterval(timerRef.current);
	
				submitChoice();
			}
		}
		else{
			setRound(1);
			clearInterval(timerRef.current);
		}

		return () => clearInterval(timerRef.current);
	}, [timer,gameOver]);

	const determineWinner = (player, opponent) => {
		if (player === "None") return "lose";
		if (opponent === "None") return "win";
		if (player === opponent) return "draw";
		if (
			(player === "Rock" && opponent === "Scissors") ||
			(player === "Scissors" && opponent === "Paper") ||
			(player === "Paper" && opponent === "Rock")
		) {
			return "win";
		}
		return "lose";
	};

	useEffect(() => {
		if (showHands !== false && playerChoice !== null && handLeft !== null) {
			const result = determineWinner(playerChoice, handLeft);
    setRoundResult(result);
    
    if (result === "win") {
      setScoreA((prevScore) => prevScore + 1);
    } else if (result === "lose") {
      setScoreB((prevScore) => prevScore + 1);
    }
    
    setTimeout(() => {
      setShowModal(true);
    }, 1000);

    const timeout = setTimeout(async () => {
      await handleAfterMove();
    },2000);
    return () => {
      clearTimeout(timeout);
    };

		}
	}, [showHands, playerChoice, handLeft]);
  const handleAfterMove = async () => {
    await postFinishMove(token);
  }
	const handleChoice = (choice) => {
		if (!showHands) {
			setPlayerChoice(choice);
		}
	};

	const submitChoice = async () => {
    const playerMove = playerChoice || "None";
    console.log(playerMove);
    setPlayerChoice(playerMove);
		await postRoundMove(token, round, playerMove);
		setRound((prevRound) => prevRound + 1);
	};

	useEffect(() => {
		if (scoreA > 2 || scoreB > 2) {
			// Kondisi akhir permainan
			setGameOver(true);
			if (scoreA > scoreB) setResultMessage("YOU WIN!");
			else setResultMessage("YOU LOSE!");
			sendResult();
      setStatus("Finished");
		}
	}, [scoreA, scoreB]);

	const handleRestart = () => {
		setPlayerChoice(null);
		setHandLeft(null); // Reset hand left
		setShowHands(false);
		setTimer(5);
	};

	const handleRoomStart = () => {
    setScoreA(0);
		setScoreB(0);
		setRound(1);
		setGameOver(false);
		setStatus("Started");
	};

	const sendResult = async () => {
    const result = scoreA > scoreB ? 'win' : 'lose';
    const response = await postResultGame(token,result);
		console.log(response,"sending result");
  };
	const handleRoomJoin = (data) => {
		console.log(data, "pusher");

		console.log(userId)
		let player1 = userId === data.data.player_1_id ? data.data.player_1_id : data.data.player_2_id;
		let player2 = userId === data.data.player_1_id ? data.data.player_2_id : data.data.player_1_id;

		let uname = userId === player1 ? data.data.player_1_username : data.data.player_2_username;
		let oponent = userId === player2 ? data.data.player_1_username : data.data.player_2_username;

		let playerCount = player1 ? (player2 ? 2 : 1) : 0;

		setPlayersJoined(playerCount);
		setUsername(uname);
		setOpponentUsername(oponent);
		setRound(1);
		setStatus("wait");
	};

	const getToken = async () => {
		try {
			const response = await getGameToken();
			setPlayersJoined(1);
			setToken(response.data.token, "token"); 
      setStatus("wait");

		} catch (error) {
			console.log(error);
		}
	};

	const joinGame = async (gameToken) => {
		try {
			const data = await postJoinGame(gameToken);
			
			if (data.success) {
				let player1 = userId === data.data.player_1_id ? data.data.player_1_id : data.data.player_2_id;
				let player2 = userId === data.data.player_1_id ? data.data.player_2_id : data.data.player_1_id;
		
				let uname = userId === player1 ? data.data.player_1_username : data.data.player_2_username;
				let oponent = userId === player2 ? data.data.player_1_username : data.data.player_2_username;
		
				console.log(data,uname,oponent,gameToken,userId,player1,player2, userId == data.data.player_1_id);
				setUsername(uname);
				setOpponentUsername(oponent);
				setToken(gameToken);
				console.log(data,username,opponentUsername,token);
			  setPlayersJoined(2);

			return data;
			}

		} catch (error) {
			alert(error.message);
		}
	};

	const startGame = async () => {
		try {
			await postStartGame(token);
		} catch (error) {
			Alert.alert("Error", error.message);
		}
	};

	const resetGameToken = async () => {
		setToken(null);
    setStatus(null);
	};

	return (
		<GameContext.Provider
			value={{
				token,
				status,
				getToken,
				joinGame,
				resetGameToken,
				playersJoined,
				startGame,
				gameOver,
				resultMessage,
				scoreA,
				scoreB,
				handleRestart,
        timer,
        playerChoice,
        handLeft,
        showHands,
        handleChoice,
        roundResult,
        showModal,
        setShowModal,
				username,
				opponentUsername,
				setUsername,
				setOpponentUsername
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export const useGame = () => useContext(GameContext);
