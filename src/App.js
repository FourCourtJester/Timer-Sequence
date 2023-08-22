// Import core components
import { createHashRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

// Import our components
import { Gate } from 'pages'

// Import style
import 'scss/base.scss'

function routes() {
  return createHashRouter(createRoutesFromElements(<Route index Component={Gate} />))
}

function App() {
  return <RouterProvider router={routes()} />
}

export default App
