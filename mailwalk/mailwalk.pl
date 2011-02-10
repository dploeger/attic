#!/usr/bin/perl

use File::Basename;

# Mailwalk -> Scan Maildirs under some directories 
#             and empty trash, empty spam folder, learn spam mails, learn ham mails and so on

# This is the only variable you should change.
# The whole Mailwalk-configuration is in this file! Look there!

$file_config="./mailwalk.conf";


# Functions

# sub walk_maildir (maildir, current subdir)
# Looks for subdirectories in a Maildir and executes actions.

sub walk_maildir
{
	my ($maildir,$subdir)=@_;

	if ($verbose>5) { print "\t Scanning ".$subdir."\n"; }

	if ($subdir ne "")
	{
		# Check, if we need to do something
		
		foreach my $index ( keys(%actions) )
		{
			my $dir_regexp=$actions{$index}{dir_regexp};

			if ($subdir =~ /$dir_regexp/)
			{
				# Carry out action
				
				if ($verbose>3) { print "Carring out action #".$index."  in ".$subdir."\n"; }

				opendir (DIR,$maildir."/".$subdir);
				
				my @dircontents=readdir(DIR);

				closedir (DIR);

				for (@dircontents)
				{
					
					if ((-f $maildir."/".$subdir."/".$_) && ( (stat($maildir."/".$subdir."/".$_))[$stat_field]<=time()-$actions{$index}{file_age}))
					{
						# Carry out actions on this file
						
						foreach my $action_index (sort (keys(% {$actions{$index}{dir_actions}})))
						{
							$action=$actions{$index}{dir_actions}{$action_index}{action};
						
							if ($verbose>3) { print "Carrying action ".$action." out on file ".$maildir."/".$subdir."/".$_."\n"; }

							my $command=$^X." ".$modules{$action}." ".$maildir." ".$maildir."/".$subdir."/".$_;
							if (exists($actions{$index}{dir_actions}{$action_index}{parameters}))
							{
								$command.=" \"";

								my $flag=0;
							
								foreach my $parameter_index ( keys (% {$actions{$index}{dir_actions}{$action_index}{parameters}}))
								{
									if ($flag)
									{
										$command.=",";
									}
									
									$command.=$parameter_index."=".$actions{$index}{dir_actions}{$action_index}{parameters}{$parameter_index};

									$flag=1;
								}

								$command.="\"";

							}
								
							if ($verbose>3) { print "Starting ".$command."\n"; }

							system($command);
						
						}
					}
				}
			}
		}
	} 

	# Now, check subdirs
	
	opendir(SUBDIR,$maildir."/".$subdir);

	my @subdir_contents=readdir(SUBDIR);

	closedir(SUBDIR);

	for (@subdir_contents)
	{
		if (($_ ne ".") && ($_ ne "..") && (-d $maildir."/".$_))
		{
			if ($subdir ne "")
			{
				walk_maildir($maildir,$subdir."/".$_);
			} else
			{
				walk_maildir($maildir,$_);
			}
		}
	}

}

# sub walk_dir (current path)
# A recursive function, that walks through a directory and it's
# subdirectories. If the given directory is identified as a Maildir
# and matches the "valid maildir"-variable ($regexp_maildir)
# the sub walk_maildir is called.

sub walk_dir
{
	my $walking_dir=$_[0];

	# Is this directory a valid maildir?

	if ($verbose>5) { print "Scanning Directory ".$walking_dir."\n"; }

	if ((basename($walking_dir) eq $path_maildir) && ($walking_dir =~ eval($regexp_maildir)))
	{
		if ($verbose>3) { print "Maildir ".$walking_dir." found.\n"; }
		
		# It's a valid Maildir, so walk it.
		
		walk_maildir($walking_dir,"");
	
	} else
	{
		# No maildir, go on walking

		opendir (DIR,$walking_dir);

		my @dir_entries=readdir(DIR);

		closedir (DIR);
		
		for (@dir_entries)
		{
			if (($_ ne ".") && ($_ ne "..") && (-d $walking_dir."/".$_))
			{
				walk_dir($walking_dir."/".$_);
			}
		}

	}

}


# Include Configuration

require $file_config;

init();

# Start walking

walk_dir($path_base);

exit 0;
