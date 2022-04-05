import React from 'react'
interface ErrorFallbackProps {
  error: unknown
}
function ErrorFallback({ error }: ErrorFallbackProps) {
  let message
  if (error instanceof Error) message = error.message
  else message = String(error)
  return (
    <div
      role='alert'
      style={{
        color: 'red',
        textAlign: 'center',
        fontSize: '20px',
        marginTop: '40px',
      }}
    >
      <p>Something went wrong:</p>
      <pre>{message}</pre>
    </div>
  )
}

export default ErrorFallback
