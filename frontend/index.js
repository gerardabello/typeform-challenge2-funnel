import React from 'react'
import { render } from 'react-dom'
import Button from '@typeform/kitt/lib/components/button'

const App = () => (
  <div>
    Hello
    <Button>
      hey ho
    </Button>
  </div>
)

console.log('hello world')

render(<App />, document.getElementById('root'))
