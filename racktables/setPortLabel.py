# -*- coding: utf-8 -*-

# setPortLabel.py

# Read connected ports and set the port descriptions accordingly.
# Clear unconnected ports.
# Uses prettytable (http://code.google.com/p/prettytable/) when installed
# to proper output a nice information table about what is changed.

# Imports

import MySQLdb
import argparse
import sys

# Configuration

conf = {
    "dbHost": "database",
    "dbUser": "racktables",
    "dbPassword": "password",
    "dbName": "racktables",
    "switchType": 8
}

class WrongName(BaseException):
    pass


class InvalidPortCount(BaseException):
    pass


def findHostforPatchpanelPort(linkId):

    global args,cursor

    cursor.execute(
        'SELECT p.name as PortName, p.label as PortLabel, '
        'o.id as RackObjectId, o.name as RackObjectName, '
        'o.objtype_id as ObjectType '
        'FROM Port p join RackObject o '
        'ON p.object_id = o.id '
        'WHERE p.id = %s',
        [ linkId ]
    )

    linkInfo = cursor.fetchone()

    if linkInfo["ObjectType"] != args.patchpanel:

        return linkInfo

    if linkInfo["PortName"].find(args.portname) != -1:
        # The port is a "Port" port. Translate to backbone

        findName = linkInfo["PortName"].replace(
            args.portname,
            args.backbone,
            1
        )

    else:
        # Can't find a "Port"-Tag. Probably only an access patchpanel.
        # Set the name of the patchpanel

        return linkInfo

    # Find backbone port

    cursor.execute(
        'SELECT id '
        'FROM Port '
        'WHERE name = %s '
        'AND object_id = %s',
        [
            findName,
            linkInfo["RackObjectId"]
        ]
    )

    foundPorts = cursor.fetchall()

    if len(foundPorts) != 1:
        raise InvalidPortCount(
            "Found %d ports for name %s!" % (len(foundPorts), findName)
        )

    # Find link for that port

    cursor.execute(
        'SELECT porta, portb '
        'FROM Link '
        'WHERE porta = %s or portb = %s',
        [
            foundPorts[0]["id"],
            foundPorts[0]["id"]
        ]
    )

    foundLink = cursor.fetchone()

    if foundLink is None:
        # Backbone isn't linked. Output a warning

        print "WARNING! Backbone port %s on %s has no link." % (
                findName,
                linkInfo["RackObjectName"]
            )
        return None

    if foundLink["porta"] == foundPorts[0]["id"]:
        linkedBackbone = foundLink["portb"]

    else:
        linkedBackbone = foundLink["porta"]

    # Get port for backbone port

    cursor.execute(
        'SELECT p.name as PortName, p.label as PortLabel, '
        'o.id as RackObjectId, o.name as RackObjectName, '
        'o.objtype_id as ObjectType '
        'FROM Port p join RackObject o '
        'ON p.object_id = o.id '
        'WHERE p.id = %s',
        [ linkedBackbone ]
    )

    linkInfo = cursor.fetchone()

    if linkInfo["ObjectType"] != args.patchpanel:

        return linkInfo

    if linkInfo["PortName"].find(args.backbone) != -1:
        # The port is a "Backbone" port. Translate to port

        findName = linkInfo["PortName"].replace(
            args.backbone,
            args.portname,
            1
        )

    else:
        # Can't find a "Backbone"-Tag. Quit

        raise WrongName(
            "Cannot interpret backbone name %s" % (linkInfo["PortName"])
        )

    # Find port

    cursor.execute(
        'SELECT id '
        'FROM Port '
        'WHERE name = %s '
        'AND object_id = %s',
        [
            findName,
            linkInfo["RackObjectId"]
        ]
    )

    foundPorts = cursor.fetchall()

    if len(foundPorts) != 1:
        raise InvalidPortCount(
            "Found %d ports for name %s on %s!" % (
                len(foundPorts),
                findName,
                linkInfo["RackObjectName"]
            )
        )

    # Find link for that port

    cursor.execute(
        'SELECT porta, portb '
        'FROM Link '
        'WHERE porta = %s or portb = %s',
        [
            foundPorts[0]["id"],
            foundPorts[0]["id"]
        ]
    )

    foundLink = cursor.fetchone()

    if foundLink is None:
        # Port isn't linked. Output a warning

        print "WARNING! Patchpanel port %s on %s has no link." % (
                findName,
                linkInfo["RackObjectName"]
            )
        return None

    if foundLink["porta"] == foundPorts[0]["id"]:
        linkedPort = foundLink["portb"]

    else:
        linkedPort = foundLink["porta"]

    return findHostforPatchpanelPort(linkedPort)

# Parse arguments

parser = argparse.ArgumentParser(
    formatter_class=argparse.RawDescriptionHelpFormatter,
    description = """
Read connected ports and set the port label accordingly.

Can traverse patch panels. For this the patchpanels need to ports for
every connection:

A port and its corresponding backbone port. So you would have a patchpanel
with these ports:

backbone <descriptive text> 1
port <descriptive text> 1
backbone <descriptive text> 2
port <descriptive text> 2

If the script sees, that one port link ends on a patch panel, it looks up
the link from the corresponding backbone patch.

Example:

<host> => <port patchpanelA 1> <> <backbone patchpanelA 1> => <backbone
patchpanelB 1> <> <port patchpanelB 1> => <switch>

This will traverse from the switch through patchpanelB, patchpanelA and
finally the host.

To get this working, you need to specify the following parameters

  * -p / --patchpanel: the object type id for the patchpanels
                       you use (mostly "9", see the "Dictionary"-table)
  * -n / --portname: the name part of a "Port" port
  * -b / --backbone: the name part of a "Backbone" port
"""
)

parser.add_argument(
    'objectname',
    metavar='objectname',
    type=str,
    nargs=1,
    help='The RackObject switch object name'
)

parser.add_argument(
    '-p',
    '--patchpanel',
    metavar='dictionary-key',
    type=int,
    help='Traverse patch panels that are from this type'
)

parser.add_argument(
    '-n',
    '--portname',
    metavar='Name',
    type=str,
    help='The name of a "Port" port'
)

parser.add_argument(
    '-b',
    '--backbone',
    metavar='Name',
    type=str,
    help='The name of a "Backbone" port'
)

parser.add_argument(
    '-s',
    '--simulate',
    action="store_true",
    help="Only simulate. Don't actually do anything."
)

args = parser.parse_args()

rackobject = args.objectname[0]

# Connect to database

db = MySQLdb.connect(
    conf["dbHost"],
    conf["dbUser"],
    conf["dbPassword"],
    conf["dbName"]
)

cursor = db.cursor(MySQLdb.cursors.DictCursor)

# Read RackObject from database

cursor.execute(
    'SELECT id FROM RackObject WHERE name = %s',
    [
        rackobject
    ]
)

rackobject_id = cursor.fetchone()

if rackobject_id is None:
    print "Can't find RackObject for name %s" % rackobject
    sys.exit(255)

rackobject_id = rackobject_id['id']

# Get ports for object

cursor.execute(
    'SELECT id, name, label, reservation_comment '
    'FROM Port '
    'WHERE object_id = %s',
    [ rackobject_id ]
)

changed_info = []

ports = cursor.fetchall()

for port in ports:

    print "Reading port %s / %s" % (port['name'], port['label'])

    print "Checking, if port is linked."

    cursor.execute(
        'SELECT porta, portb, cable '
        'FROM Link '
        'WHERE porta = %s or portb = %s',
        [
            port['id'], port['id']
        ]
    )

    links = cursor.fetchall()

    if len(links) == 0:

        print "No links exist."

        if not port['reservation_comment'] is None and \
           port['reservation_comment'] != "":

            print "Port has a reservation comment. Label will be set to " \
                  "reservation"

            label = port['reservation_comment']

        else:

            print "Port has no reservation. Label will be cleared."

            label = ''

    else:

        print "Link exist."

        if links[0]['porta'] == port['id']:

            linkId = links[0]['portb']

        else:

            linkId = links[0]['porta']

        # Get target port description
        # like <object name> <port name>
        # If a label exists on the linked port, this label is used.

        cursor.execute(
            'SELECT p.name as PortName, p.label as PortLabel, '
            'o.name as RackObjectName, o.objtype_id as ObjectType '
            'FROM Port p join RackObject o '
            'ON p.object_id = o.id '
            'WHERE p.id = %s',
            [ linkId ]
        )

        linkedInfo = cursor.fetchone()

        if not args.patchpanel is None and \
           args.patchpanel == linkedInfo['ObjectType']:

            # Traverse patchpanel

            linkedInfo = findHostforPatchpanelPort(linkId)

            if linkedInfo is None:
                continue

        label = "%(RackObjectName)s %(PortName)s" % {
                "RackObjectName": linkedInfo["RackObjectName"],
                "PortName": linkedInfo["PortName"]
            }

    if port['label'] == label:

        print "Label already set."

    else:

        print "Label will be set to '%s'" % label

        if port['label'] is None:
            port['label'] = ""

        changed_info.append({
            "port": port['name'],
            "old": port['label'],
            "new": label
        })

        if not args.simulate:

            cursor.execute(
                'UPDATE Port '
                'SET label = %s '
                'WHERE id = %s ',
                [
                    label,
                    port['id']
                ]
            )

            print "Port have been altered."

db.commit()

print "Database changes have been committed."

# Output changed info.

# Is "prettytable" installed?

try:
    __import__("prettytable")
except ImportError:

    # No. Print csv

    print "Port,Old label,New label"

    for info in changed_info:

        print "%s,%s,%s" % (
            info["port"],
            info["old"],
            info["new"]
        )

else:
    # Yes. Use it

    from prettytable import PrettyTable

    change_table = PrettyTable([
        "Port",
        "Old label",
        "New label"
    ])

    change_table.align = "l"

    for info in changed_info:
        change_table.add_row(
            [
                info["port"],
                info["old"],
                info["new"]
            ]
        )

    print change_table


