#!/usr/bin/env python

import websockets
import asyncio
import json
import sys
import random

#env
SERVER_CONNECTION_URL = 'ws://127.0.0.1:4000/socket/websocket'
DEVICE_UNIQUE_IDENTIFIER = '0c97910c-fef3-4cfa-b73f-674bbc91c0c5'

class WebSocketClient():

    def __init__(self, connection_url):
        self.connection_url_string = connection_url
        pass

    def getDeviceIdentifier(self):
        return DEVICE_UNIQUE_IDENTIFIER

    async def connect(self):
        # Connecting to webSocket server - elixir 
        self.connection = await websockets.client.connect(self.connection_url_string)
        if self.connection.open:
            # Subs to the network channel and subs to its hub node channel
            join_network_channel = {
                'topic': 'network',
                'event': 'phx_join',
                'payload': { },
                'ref': random.randint(1, 1000000)
            }
            await client.sendMessage(json.dumps(join_network_channel))

            join_node_channel = {
                'topic': 'node:' + self.getDeviceIdentifier(),
                'event': 'phx_join',
                'payload': { },
                'ref': random.randint(1, 1000000)
            }
            await client.sendMessage(json.dumps(join_node_channel))
            
            return self.connection


    async def sendMessage(self, message):
        # Sending message to webSocket server 
        await self.connection.send(message)

    async def receiveMessage(self, connection):
        # Receiving all server messages and handling them 
        while True:
            try:
                message = await connection.recv()
                payload = json.loads(str(message))

                print(payload)

            except websockets.exceptions.ConnectionClosed:
                break

    async def heartbeat(self, connection):
        # Sending heartbeat to server every 30 seconds to avoid disconnect
        while True:
            try:
                heartbeat_payload = {
                    'topic': 'phoenix',
                    'event': 'heartbeat',
                    'payload': { },
                    'ref': random.randint(1, 1000000)
                }
                await connection.send(json.dumps(heartbeat_payload))
                await asyncio.sleep(30)
            except websockets.exceptions.ConnectionClosed:
                break


if __name__ == '__main__':
    try:
        client = WebSocketClient(SERVER_CONNECTION_URL)
        loop = asyncio.get_event_loop()
        connection = loop.run_until_complete(client.connect())

        tasks = [
            asyncio.ensure_future(client.heartbeat(connection)),
            asyncio.ensure_future(client.receiveMessage(connection)),
        ]

        loop.run_until_complete(asyncio.wait(tasks))
    except KeyboardInterrupt:
        sys.exit(0)