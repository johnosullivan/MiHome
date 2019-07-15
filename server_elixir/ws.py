#!/usr/bin/env python

import websockets
import asyncio

class WebSocketClient():

    def __init__(self):
        pass

    async def connect(self):
        '''
            Connecting to webSocket server - elixir
        '''
        self.connection = await websockets.client.connect('ws://127.0.0.1:4000/socket/websocket')
        if self.connection.open:
            print('Connection Established.')
            await client.sendMessage("{ \"topic\": \"network\", \"event\": \"phx_join\", \"payload\": {}, \"ref\": 0 }")
            return self.connection


    async def sendMessage(self, message):
        '''
            Sending message to webSocket server
        '''
        await self.connection.send(message)

    async def receiveMessage(self, connection):
        '''
            Receiving all server messages and handling them
        '''
        while True:
            try:
                message = await connection.recv()
                print('Received message from server: ' + str(message))
            except websockets.exceptions.ConnectionClosed:
                break

    async def heartbeat(self, connection):
        '''
        Sending heartbeat to server every 30 seconds to avoid disconnect
        '''
        while True:
            try:
                await connection.send("{\"topic\": \"phoenix\",\"event\": \"heartbeat\", \"payload\": {},\"ref\": 0 }")
                await asyncio.sleep(30)
            except websockets.exceptions.ConnectionClosed:
                break


if __name__ == '__main__':
    # Creating client object
    client = WebSocketClient()
    loop = asyncio.get_event_loop()

    connection = loop.run_until_complete(client.connect())

    # Start listener and heartbeat
    tasks = [
        asyncio.ensure_future(client.heartbeat(connection)),
        asyncio.ensure_future(client.receiveMessage(connection)),
    ]

    loop.run_until_complete(asyncio.wait(tasks))
