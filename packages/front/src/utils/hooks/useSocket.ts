import { io } from 'socket.io-client'

// FIXME: switch this next line until backend server is stabilised.
const socket = io(`http://localhost:${import.meta.env.VITE_BACK_PORT}`)
// const socket = io(`http://localhost:${import.meta.env.VITE_TEST_PORT}`);

export function useSocket() {
  socket.on('error', function (e) {
    window.alert(e.message)
  })
  return {
    socket: socket,
    connected: socket.connected
  }
}
