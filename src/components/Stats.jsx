import LineChart from './LineChart'

const Stats = ({ testResults }) => {
	return (
		<div>
			<LineChart wpmTable={testResults.wpmTable.current} totalTime={testResults.totalTime} />
			<p>Total Time: <strong className="stats">{testResults.totalTime}</strong></p>
			<p>Mistakes: <strong className="stats">{testResults.mistakes}</strong></p>
			<p>Accuracy: <strong className="stats">{Math.round(testResults.accuracyTable.current.slice(-1))}%</strong></p>
			<p>WPM: <strong className="stats">{testResults.wpmTable.current.slice(-1)}</strong></p>
			<p>CPM: <strong className="stats">{testResults.cpmTable.current.slice(-1)}</strong></p>

			
		</div>
	)
}

export default Stats