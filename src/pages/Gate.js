// Import core components
import { Instructions, Sequence } from 'components'
import { useEffect, useRef, useState } from 'react'
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
    const _times = params.get('timers')
    if (!_times) return () => {}

    setTimes(_times.split(','))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container className="d-flex flex-column justify-content-center text-center p-3 w-100 h-100" fluid>
      {started ? <Sequence times={times} onFinish={handleRestart} /> : <Instructions times={times} onStart={handleBegin} />}
    </Container>
  )
}

// Exported Component for use
export default Gate
