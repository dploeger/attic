# This script reworks an ical datasource from my local waste disposal company, adds
# alarms and reworks the events to start at 7pm

import icalendar
import datetime
import sys

ical = sys.stdin.read()

myical = icalendar.Calendar.from_ical(ical)

for event in myical.walk("vevent"):

   # Add alarm

   alarm = icalendar.Alarm()
   alarm.add("action", "DISPLAY")
   alarm.add("TRIGGER;RELATED=START", "-PT24H")
   alarm.add("DESCRIPTION", "Reminder")
   event.add_component(alarm)

   # Rework event start and end time

   newdtstart = datetime.datetime.combine(event["dtstart"].dt, datetime.time(19,0,0))
   newdtend = datetime.datetime.combine(event["dtstart"].dt, datetime.time(19,5,0))
   event["dtstart"] = icalendar.vDatetime(newdtstart).to_ical()
   event["dtend"] = icalendar.vDatetime(newdtend).to_ical()

   # Rework rdate and edate-entries
   
   for workprop in ("rdate", "exdate"):

       if workprop in event:
        
          rdates = event[workprop].dts

          newdts = []

          for rdate in rdates:

            newdts.append(datetime.datetime.combine(rdate.dt, datetime.time(19,0,0)))

          event[workprop] = icalendar.prop.vDDDLists(newdts)

print myical.to_ical()
