// Import core components
import { Instructions, Sequence } from 'components'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'

// Import our components
// ...

// Import style
// ...

function Gate() {
  // Hooks
  const params = new URLSearchParams(document.location.search)
  // States
  const [times, setTimes] = useState([])
  const [started, setStarted] = useState(false)

  const handleBegin = () => setStarted(true)
  const handleRestart = () => setStarted(false)

  useEffect(() => {
    if (!params.get('timers')) return () => {}

    try {
      setTimes(JSON.parse(params.get('timers')))
    } catch (err) {
      console.error(err)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container className="d-flex flex-column justify-content-center text-center p-3 w-100 h-100" fluid>
      {started ? <Sequence onFinish={handleRestart} times={times} /> : <Instructions onStart={handleBegin} times={times} />}
    </Container>
  )
}

// Exported Component for use
export default Gate
