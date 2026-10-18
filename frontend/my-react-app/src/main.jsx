
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {Provider} from "react-redux"
import reduxStore from "./store/CartStore.jsx"

createRoot(document.getElementById('root')).render(
    <Provider store={reduxStore}>
        <App />
    </Provider>
)
