#!/bin/bash

# updatemirror.sh
# ===============
#
# Sync the zimbra Perforce with a github repository

# Configuration
# =============

# Perforce

P4_PATH="/usr/local/bin/p4"
P4_REPO="codes.zimbra.com:2666"
P4_USER="public"
P4_PASS="public1234"
P4_VIEW="public-view"
P4_DEPOT="//depot/zcs/main/..."

# Local paths

P4_LOCAL="/home/public/p4/main"
GIT_LOCAL="/home/public/zimbramirror"

# Rsync

RSYNC_PATH="rsync"

# Git

GIT_PATH="git"
COMMIT_MSG="Commit `date +%Y%m%d`"

# Log

LOG="/tmp/updatemirror.log"

# Main
# ====

export P4PORT=$P4_REPO 
$P4_PATH -u $P4_USER -P $P4_PASS -c $P4_VIEW sync -f $P4_DEPOT >$LOG 2>&1

# RSync to git repository

$RSYNC_PATH -av --del --filter "P .git/***" --filter "P README.rst" $P4_LOCAL/.. $GIT_LOCAL/ >>$LOG 2>&1

# Add everything

cd $GIT_LOCAL
$GIT_PATH add -A >>$LOG 2>&1

# Commit

$GIT_PATH commit -m "$COMMIT_MSG" >>$LOG 2>&1

# Push to GitHub

$GIT_PATH push origin master >>$LOG 2>&1
