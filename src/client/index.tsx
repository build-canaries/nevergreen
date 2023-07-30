import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { error } from './common/Logger'
import { appRoutes } from './AppRoutes'
import { store } from './configuration/ReduxStore'

const rootNodeId = 'root'
const rootNode = document.getElementById(rootNodeId)

if (rootNode) {
  const root = createRoot(rootNode)
  root.render(
    <App appElement={`#${rootNodeId}`} store={store} router={appRoutes()} />,
  )
} else {
  error(`Unable to find the #${rootNodeId} node to mount!`)
}
