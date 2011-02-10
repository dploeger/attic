#!/usr/bin/perl

# delete.pl -> Module for mailwalk for deleting a message

# This script is rather simple. It just calls a "rm <message-file>"

our $messagefile=$ARGV[1];

system "rm '$messagefile' \n";
