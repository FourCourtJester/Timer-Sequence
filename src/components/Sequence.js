// Import core components
import { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Fireworks } from '@fireworks-js/react'

// Import our components
// ...

function createTime(val) {
  const d = new Date(val).toISOString()
  return d.slice(14, -5)
}

const options = {
  acceleration: 1.05,
  autoresize: true,
  brightness: {
    min: 50,
    max: 80,
  },
  decay: {
    min: 0.015,
    max: 0.03,
  },
  delay: {
    min: 75,
    max: 100,
  },
  explosion: 10,
  flickering: 50,
  friction: 0.97,
  gravity: 1.5,
  hue: {
    min: 0,
    max: 360,
  },
  intensity: 30,
  lineStyle: 'round',
  lineWidth: {
    explosion: {
      min: 1,
      max: 3,
    },
    trace: {
      min: 1,
      max: 2,
    },
  },
  mouse: {
    click: false,
    move: false,
    max: 1,
  },
  opacity: 0.5,
  particles: 200,
  rocketsPoint: {
    min: 40,
    max: 60,
  },
  sound: {
    enabled: true,
    files: ['./explosion-a.mp3', './explosion-b.mp3', './explosion-c.mp3'],
    volume: {
      min: 25,
      max: 50,
    },
  },
  traceLength: 3,
  traceSpeed: 10,
}

export function Sequence(properties) {
  // Properties
  const { onFinish, times } = properties
  // States
  const [cursor, setCursor] = useState(0)
  const [pause, setPause] = useState(false)
  const [value, setValue] = useState(NaN)
  // Refs
  const $fireworks = useRef()

  const handleNext = () => setCursor((_cursor) => (_cursor + 1 >= times.length ? -1 : _cursor + 1))

  useEffect(() => {
    setPause(false)
    setValue(cursor >= 0 ? times[cursor] * 60 * 1000 : NaN)
    $fireworks.current.stop()
  }, [cursor, times])

  useEffect(() => {
    if (Number.isNaN(value)) return () => {}

    if (value <= 0) {
      setPause(true)
      $fireworks.current.start()
      return () => {}
    }

    const t = setTimeout(() => {
      setValue((_value) => value - 1000)
    }, 1000)

    return () => clearTimeout(t)
  }, [value])

  return (
    <>
      <Fireworks ref={$fireworks} className="position-absolute z-n1 top-0 start-0 w-100 h-100" options={options} autostart={false} />
      {Number.isNaN(value) ? (
        <Button className="w-100" onClick={onFinish}>
          Restart
        </Button>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <span className="timer">{createTime(value)}</span>
          {pause && (
            <Button className="w-100" onClick={handleNext}>
              Begin
            </Button>
          )}
        </div>
      )}
    </>
  )
}
