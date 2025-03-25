import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const LineChart = ({ wpmTable, totalTime }) => {
	const options = {}
	const data = {
		labels: [...Array(totalTime).keys()].map(i => i + 1),
		datasets: [{
			label: 'Words Per Minute',
			data: wpmTable,
			borderColor: '#A279F0',
			backgroundColor: 'rgba(53, 162, 235, 0.5)',
		}]
	}

	return (
		<Line options={options} data={data}/>
	)
}

export default LineChart