// Import core components
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

// Import our components
// ...

function createTime(val) {
  const d = new Date(val).toISOString()
  return d.slice(14, -5)
}

export function Sequence(properties) {
  // Properties
  const { onFinish, times } = properties
  // States
  const [cursor, setCursor] = useState(0)
  const [pause, setPause] = useState(false)
  const [value, setValue] = useState(NaN)

  const handleNext = () => setCursor((_cursor) => (_cursor + 1 >= times.length ? -1 : _cursor + 1))

  useEffect(() => {
    setPause(false)
    setValue(cursor >= 0 ? times[cursor] * 60 * 1000 : NaN)
  }, [cursor, times])

  useEffect(() => {
    if (Number.isNaN(value)) return () => {}

    if (value <= 0) {
      setPause(true)
      return () => {}
    }

    const t = setTimeout(() => {
      setValue((_value) => value - 1000)
    }, 1000)

    return () => clearTimeout(t)
  }, [value])

  return Number.isNaN(value) ? (
    <Button className="w-100" onClick={onFinish}>
      Restart
    </Button>
  ) : (
    <>
      {createTime(value)}
      {pause && (
        <Button className="w-100" onClick={handleNext}>
          Begin
        </Button>
      )}
    </>
  )
}
