// Import core components
import { Button } from 'react-bootstrap'

// Import our components
// ...

export function Instructions(properties) {
  // Properties
  const { onStart, times } = properties

  return times.length ? (
    <>
      <Button className="w-100" onClick={onStart}>
        Begin
      </Button>
      <p className="text-light mt-2 mb-0">
        First,
        {times.map((val, i) => (
          <span key={i} className="ms-1">
            duration for <span className="fw-bold text-info">{val}</span> minutes, then
          </span>
        ))}
        <span className="text-danger ms-1">finished</span>. Click to begin.
      </p>
    </>
  ) : (
    <p className="text-center m-0">
      <i>No timers have been created.</i>
    </p>
  )
}
