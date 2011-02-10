#!/usr/bin/perl

# ham_learn.pl -> Module for mailwalk for ham-learning a message

# This script calls sa-learn --ham to learn a message as ham 

our $messagefile=$ARGV[1];

system "sa-learn --ham '$messagefile' \n";
