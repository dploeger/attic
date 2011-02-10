#!/usr/bin/perl

# spam_learn.pl -> Module for mailwalk for spam-learning a message

# This script calls sa-learn --spam to learn a message as spam 

our $messagefile=$ARGV[1];

system "sa-learn --spam '$messagefile' \n";
