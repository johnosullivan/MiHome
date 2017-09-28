#!/usr/bin/python

import smbus
import time
import urllib2,json
import ast

url = "https://pacific-springs-32410.herokuapp.com/api/data"
#url = "http://192.168.50.51:8888/api/data"

bus = smbus.SMBus(1)
address = 0x04

def get_mihome_data():
    data = ""
    bus.write_byte(address,1)

    running_radio = True
    while running_radio:
        status = bus.read_byte(address)
        if (status):
          running_radio = False
        time.sleep(0.1)

    bus.write_byte(address,3)
    payloadsize = bus.read_byte(address)
    #print(payloadsize)
    time.sleep(0.2)
    bus.write_byte(address,4)

    for i in range(0, payloadsize):
        val = bus.read_byte(address)
        #print(val)
        data += chr(val)
        time.sleep(0.01)

    bus.write_byte(address,0)
    time.sleep(0.2)
    return data


while True:
    postdata = get_mihome_data()
    values = ast.literal_eval(postdata)
    #print(type(postdata))
    #print(type(values))
    req = urllib2.Request(url, json.dumps(values), headers={'Content-type': 'application/json', 'Accept': 'application/json'})
    response = urllib2.urlopen(req)
    res = response.read()
    print(res)
    time.sleep(60)
