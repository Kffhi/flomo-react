import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './views/App/App'
import store from '@/store'

import 'antd/dist/antd.less'
import './styles/reset.less'
import './styles/index.css'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
