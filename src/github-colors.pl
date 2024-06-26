#!/usr/bin/perl

# ---------------------------------------------------------- #
# Aidan Carey, June 26th 2024                                #
#                                                            #
# Get GitHub language colors and turn them for dynamic       #
# background and border colors CSS classes.                  #
# ---------------------------------------------------------- #

use strict;
use warnings;
use feature "say";

use YAML::Tiny;
use LWP::UserAgent;

# User Agent to get YML from GitHub
my $ua = LWP::UserAgent->new;
$ua->ssl_opts(verify_hostname => 0);

my $url = "https://raw.githubusercontent.com/github-linguist/linguist/master/lib/linguist/languages.yml";

my $yaml = $ua->get($url) or die "Couldn't get $url: $!";

# Convert YAML to perl hash
my $languages = YAML::Tiny->read_string($yaml->content);

# Hardcoded languages
my @used_langs = ("Perl", "C", "Python", "Java", "JavaScript", "Haskell", "C++", "Swift", "Ruby");

# Map language names to colors
# ex. $colors{Python} = "#3572A5"
my %colors = ();

foreach (@$languages) {
  # $info = hash reference of language information
  while (my ($name, $info) = each %$_) {    
    foreach (@used_langs) {
      # Skip if we don't need this language
      next unless ($name eq $_);

      $colors{$name} = $info->{color};
    }
  }
}

# Final CSS file of background and borders
my $css = "/* Generated by github-colors.pl */\n\n";

while (my ($name, $color) = each %colors) {
  my $name = lc $name;

  # Hardcode C++ because CSS can't use "+" in the class names
  $name = "cpp" if ($name eq "c++");
  
  $css .= ".$name-border { border-color: $color; }\n" .
          ".$name-bg { background-color: $color; }\n\n";
}

open my $fh, ">", "language-colors.css" or die $!;

print $fh $css;

close $fh;
