#!/bin/bash

if [ $1 -eq "1" ] ; then

	# Enable Game mode

	defaults write com.apple.dock wvous-bl-corner -int 1
	defaults write com.apple.dock wvous-br-corner -int 1
	defaults write com.apple.dock wvous-tl-corner -int 1
	defaults write com.apple.dock wvous-tr-corner -int 1

	kill -HUP `pgrep Dock`

	defaults write com.apple.driver.AppleBluetoothMultitouch.trackpad TrackpadMomentumScroll -bool false

	osascript -e "do shell script \"kextunload /System/Library/Extensions/AppleBluetoothMultitouch.kext; kextload /System/Library/Extensions/AppleBluetoothMultitouch.kext\" with administrator privileges"

fi

if [ $1 -eq "0" ] ; then

	# Disable Game mode

	defaults write com.apple.dock wvous-bl-corner -int 7
	defaults write com.apple.dock wvous-br-corner -int 2
	defaults write com.apple.dock wvous-tl-corner -int 2
	defaults write com.apple.dock wvous-tr-corner -int 5

	kill -HUP `pgrep Dock`

	defaults write com.apple.driver.AppleBluetoothMultitouch.trackpad TrackpadMomentumScroll -bool true

	osascript -e "do shell script \"kextunload /System/Library/Extensions/AppleBluetoothMultitouch.kext; kextload /System/Library/Extensions/AppleBluetoothMultitouch.kext\" with administrator privileges"

fi

