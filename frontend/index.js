import React from 'react'
import { render } from 'react-dom'
import Button from '@typeform/kitt/lib/components/button'
import getData from './parse'

const App = () => (
  <div>
    Hello
    <Button>
      hey ho
    </Button>
  </div>
)

console.log(getData())

render(<App />, document.getElementById('root'))
