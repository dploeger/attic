# -*- coding: utf-8 -*-

# setPortNames.py

# Read port labels from racktables database and set the ports
# on the switch using the telnet protocol (based on Foundry/Brocade swiches)

# Imports

import MySQLdb
import argparse
import sys
import telnetlib

# Configuration

conf = {
        "dbHost": "database",
        "dbUser": "racktables",
        "dbPassword": "password",
        "dbName": "racktables",
        "fQDNAttributeId": 3,
        "switchUser": "admin",
        "switchPassword": "secret"
        }

def set_port(fqdn, portname, portlabel):
    
    global conf
    
    telnet = telnetlib.Telnet(fqdn, 23, 5)
    #telnet.set_debuglevel(1)
         
    telnet.read_until("telnet@", 5)
    telnet.write("enable" + "\r\n")
    telnet.read_until("User Name:", 5)
    telnet.write(conf["switchUser"] + "\r\n")
    telnet.read_until("Password:", 5)
    telnet.write(conf["switchPassword"] + "\r\n")
    
    telnet.read_until("telnet@", 5)
    
    telnet.write("configure terminal\r\n")
    
    telnet.read_until("(config)", 5)
    
    telnet.write("interface ethernet " + portname + "\r\n")
    
    telnet.read_until("(config-if", 5)
    
    print "Setting port-name of interface " + portname + " to '" + portlabel \
        + "'"
    
    telnet.write("port-name " + portlabel + "\r\n")
    
    telnet.read_until("(config-if", 5)
    
    telnet.write("end\r\n")
    
    telnet.read_until("telnet@", 5)
    
    telnet.write("write memory\r\n")      
        
    telnet.read_until("telnet@", 5)
    
    telnet.close()
    
    
# Parse arguments

parser = argparse.ArgumentParser(description='Read port labels from ' +
                                 'RackTables database and set the ports on' +
                                 'the switch using the telnet protocol.')
parser.add_argument('objectname', metavar='objectname', type=str, nargs=1,
                   help='The RackObject switch object name')

args = parser.parse_args()

rackobject = args.objectname[0]

# Connect to database

db = MySQLdb.connect(
                    conf["dbHost"],
                    conf["dbUser"],
                    conf["dbPassword"],
                    conf["dbName"]
                    )

cursor = db.cursor()

# Read RackObject from database

cursor.execute(
               'SELECT id FROM RackObject WHERE name = %s',
               (rackobject)               
               )

rackobject_id = cursor.fetchone() 

if (rackobject_id == None):
    print "Can't find RackObject for name %s" % (rackobject)
    sys.exit(255)

rackobject_id = rackobject_id[0]

# Get FQDN for object

cursor.execute(
               'SELECT string_value ' +
               'FROM AttributeValue ' +
               'WHERE object_id = %s ' +
               'AND attr_id = %s' , 
               (rackobject_id, conf['fQDNAttributeId'])
               )

fqdn = cursor.fetchone()

if (fqdn == None):
    print "Can't find FQDN for object named %s" % (rackobject)
    sys.exit(254)

fqdn = fqdn[0]

print "Working on switch " + fqdn

# Read all ports and lables

cursor.execute(
               'SELECT name, label ' +
               'FROM Port ' +
               'WHERE object_id = %s',
               (rackobject_id)               
               )

ports = cursor.fetchall()

for port in ports:
    
    if (len(port[1]) > 0):
        
        set_port(fqdn, port[0], port[1])    
