import { useEffect, useState, useRef } from 'react'
import { getRandomParagraph } from '../Paragraphs'
import './style.css'

const TypingTest = ({ onComplete }) => {
	const maxTime = 60;
	const [paragraph, setParagraph] = useState(getRandomParagraph())
	const [timeLeft, setTimeLeft] = useState(maxTime);
	const [totalTime, setTotalTime] = useState(0);
	const [charIndex, setCharIndex] = useState(0);
	const [isTyping, setIsTyping] = useState(false);
	const inputRef = useRef()
	const charRefs = useRef([])
	const [correctWrong, setCorrectWrong] = useState([])
	
	const [mistakes, setMistakes] = useState(0);
/* 	const [accuracy, setAccuracy] = useState(0);
	const [wpm, setWpm] = useState(0);
	const [cpm, setCpm] = useState(0); */

	let accuracyTable = useRef([]);
	let wpmTable = useRef([]);
	let cpmTable = useRef([]);

	const finishGame = () => {
		setIsTyping(false)
		onComplete({ cpmTable, wpmTable, accuracyTable, mistakes, totalTime })
	}
	
	useEffect(() => {
		inputRef.current.focus()
		setCorrectWrong(Array(charRefs.current.length).fill(''))
	}, []);

	useEffect(() => {
		let interval;
		if (isTyping && timeLeft > 0) {
			interval = setInterval(() => {
				//inputRef.current.focus()
				setTimeLeft(timeLeft - 1)

				let correctChars = charIndex - mistakes
				setTotalTime(maxTime - timeLeft)

				let cpm = correctChars * (60 / totalTime)
				cpm = cpm < 0 || !cpm == Infinity ? 0 : cpm
				//setCpm(parseInt(cpm, 10))
				cpmTable.current.push(cpm)

				let wpm = Math.round((correctChars / 5 / totalTime) * 60)
				wpm = wpm < 0 || !wpm == Infinity ? 0 : wpm
				//setWpm(wpm)
				wpmTable.current.push(wpm)

				let accuracy = (correctChars / charIndex) * 100
				//setAccuracy(accuracy)
				accuracyTable.current.push(accuracy)
			}, 1000)
		} else if (timeLeft === 0) {
			clearInterval(interval)
			finishGame()
		}

		return () => clearInterval(interval)
	}, [isTyping, timeLeft])

	const isValidKey = (keyCode) => {
		return (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122 || keyCode === 32 || keyCode === 190 || keyCode === 13) || (keyCode >= 48)
	}

	const onBlur = () => inputRef.current.focus()

	const handleChange = (e) => {
		const characters = charRefs.current
		let currentChar = charRefs.current[charIndex]
		//let typedChar = e.target.value.slice(-1)
		let typedChar = e.key

		if (charIndex < characters.length && timeLeft > 0) {
			if (!isTyping) {
				setIsTyping(true)
			}

			if (e.key !== "Shift") {
				if (e.key == "Backspace" || e.key == "Delete") {
					//let previousCharStatus = correctWrong[charIndex - 1]
					correctWrong[charIndex - 1] = ""

/* 					if (previousCharStatus === " wrong ") {
						setMistakes(mistakes - 1)
					} */
					setCharIndex(charIndex - 1)
				} else if (isValidKey(e.keyCode)) {
					setCharIndex(charIndex + 1)
					if (typedChar === currentChar.textContent) {
						correctWrong[charIndex] = " correct "
					} else {
						setMistakes(mistakes + 1)

						correctWrong[charIndex] = " wrong "
					}
				}
			}
			
			if (charIndex === characters.length - 1) {
				finishGame()
			}
		} else {
			finishGame()
		}
	}

	const resetGame = () => {
		setCharIndex(0)
		setTimeLeft(maxTime)
		setMistakes(0)
		//setWpm(0)
		//setCpm(0)
		wpmTable.current = []
		cpmTable.current = []
		setIsTyping(false)
		setCorrectWrong(Array(charRefs.current.length).fill(''))
		setParagraph(getRandomParagraph())
		inputRef.current.focus()
	}

	return (
		<div className="container">
			<div className="test">
				<input type="text" className="input-field" ref={inputRef} onKeyDown={handleChange} onBlur={onBlur} />
				{paragraph.split('').map((char, index) => (
					<span key={index} className={`char ${index === charIndex ? " active" : ""} ${correctWrong[index]}`} ref={(e) => charRefs.current[index] = e}>{char}</span>
				))}
			</div>
			<div className="result">
				<p>Time Left: <strong className="stats">{timeLeft}</strong></p>
				{/*<p>Mistakes: <strong className="stats">{mistakes}</strong></p>
				<p>Accuracy: <strong className="stats">{Math.round(accuracy)}%</strong></p>
				<p>WPM: <strong className="stats">{wpm}</strong></p>
				<p>CPM: <strong className="stats">{cpm}</strong></p>*/}
				<button className="btn" onClick={resetGame}>Try again</button>
			</div>
		</div>
	)
}

export default TypingTest