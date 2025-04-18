const message = {
    id: 'uniqueID', // Your unique id for this message.
    type: 'publish',
    channel: '/default/channel',
    events: [
      JSON.stringify({ message: "hello world" }),
      JSON.stringify({ number: 42 })
    ],
    authorization: { 'x-api-key': 'your key' },
  }


  const HTTP_DOMAIN = 'your api HTTP domain '
  const REALTIME_DOMAIN = 'api real-time domain'
  const API_KEY = 'your api key'
  
  const authorization = { 'x-api-key': API_KEY, host: HTTP_DOMAIN }
  
  // construct the protocol header for the connection
  function getAuthProtocol() {
    const header = btoa(JSON.stringify(authorization))
      .replace(/\+/g, '-') // Convert '+' to '-'
      .replace(/\//g, '_') // Convert '/' to '_'
      .replace(/=+$/, '') // Remove padding `=`
    return `header-${header}`
  }
  
  const socket = await new Promise((resolve, reject) => {
    const socket = new WebSocket(`wss://${REALTIME_DOMAIN}/event/realtime`, [
      'aws-appsync-event-ws',
      getAuthProtocol(),
    ])
    socket.onopen = () => resolve(socket)
    socket.onclose = (event) => reject(new Error(event.reason))
    socket.onmessage = (event) => console.log(event)
  })
  
  // when the socket is connected, send the message
  socket.send(JSON.stringify(message))