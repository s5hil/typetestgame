import { useState } from 'react'

import TypingTest from './components/TypingTest'
import Stats from './components/Stats'

const App = () => {
	const [testResults, setTestResults] = useState(null)
	return (
		<div className="App">
			{testResults ? <Stats testResults={testResults} /> : <TypingTest onComplete={setTestResults} />}
		</div>
	)
}

export default App