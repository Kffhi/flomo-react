import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import App from './views/App/App'
import store from '@/store'

import 'antd/dist/antd.less'
import './styles/reset.less'
import './styles/index.css'

Sentry.init({
    dsn: 'https://96830828c7c14c03a429f93e3b4d7ab5@o635537.ingest.sentry.io/4504661680193536',
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0
})

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
