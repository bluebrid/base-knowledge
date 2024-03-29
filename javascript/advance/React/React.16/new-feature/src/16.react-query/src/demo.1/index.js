/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import Button from './button'
import fetch from '../libs/fetch'

import { useQuery, useMutation, queryCache } from '../index'

export default () => {
  const [value, setValue] = React.useState('')

  const { status, data, error } = useQuery('todos', () => fetch('/api/data'), {
    // Refetch the data every second
    // refetchInterval: 1000,
  })

  const [mutateAddTodo] = useMutation(
    value => fetch(`/api/data?add=${value}`),
    {
      onSuccess: () => queryCache.refetchQueries('todos'),
    }
  )

  const [mutateClear] = useMutation(value => fetch(`/api/data?clear=1`), {
    onSuccess: () => queryCache.refetchQueries('todos'),
  })

  if (status === 'loading') return <h1>Loading...</h1>
  if (status === 'error') return <span>Error: {error.message}</span>

  return (
    <div>
      <h1>Auto Refetch with stale-time set to 1s)</h1>
      <h2>Todo List</h2>
      <form
        onSubmit={async ev => {
          ev.preventDefault()
          try {
            await mutateAddTodo(value)
            setValue('')
          } catch {}
        }}
      >
        <input
          placeholder="enter something"
          value={value}
          onChange={ev => setValue(ev.target.value)}
        />
      </form>
      <ul>
        {data.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Button onClick={mutateClear}>Clear All</Button>
    </div>
  )
}
