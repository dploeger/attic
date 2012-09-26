#!/bin/bash

# updatemirror.sh
# Dennis Ploeger <develop@dieploegers.de>
#
# https://github.com/dploeger/attic

# Updates (recreates) mirrors via wget
# Needs a repository configuration file in the format
# URL,local directory,argument for wget "--cut-dirs"-option (see below)
#
# THE LOCAL DIRECTORY HAS TO EXIST PRIOR RUNNING UPDATEMIRROR!
#
# cut-dirs-option:
# The cut-dirs-option tells wget to remove directories from the local structure.
# If you have a URL http://mirror.com/pub/site/interesting, you would specify the option 3, so that only files and directories BELOW "interesting"
# would be present in the local mirror.

# Filename/Path of repository configuration file
REPOCONF="repo.cfg"

# Remove all index.html*-files after mirroring? (Useful for websites with generated directory pages)
# 1= on, 0= off
REMOVEINDEX=1

ORIGDIR=`pwd`

for REPO in `cat $REPOCONF`; do 

	URL=`echo $REPO | cut -d "," -f 1`
	LOC=`echo $REPO | cut -d "," -f 2`
	CUT=`echo $REPO | cut -d "," -f 3`

	echo "################################"
	echo "Updating $LOC"
	echo "################################"

	cd $LOC
	rm -r *
	wget -mk -np -nH --cut-dirs=$CUT "$URL"

	if [ "$REMOVEINDEX" -eq "1" ]; then
	
		echo "Removing index-files"

		find . -iname "index.html*" | xargs rm

	fi

done

echo "Done."

cd $ORIGDIR
