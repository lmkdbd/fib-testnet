#!/usr/bin/env sh
# $0 is a script name,
# $1, $2, $3 etc are passed arguments
# $1 is our command
CMD=$1
BP_NUM=$2

case "$CMD" in
  "init" )
    exec fibos ./index.js
    ;;

  "start" )
    # we can modify files here, using ENV variables passed in
    # "docker create" command. It can't be done during build process.
    exec fibos ./lib/4_firstbp_start.js
    ;;

  "bp_start" )
    # we can modify files here, using ENV variables passed in
    # "docker create" command. It can't be done during build process.
    exec fibos ./morebps.js $BP_NUM
    ;;

   * )
    # Run custom command. Thanks to this line we can still use
    # "docker run our_image /bin/bash" and it will work
    exec $CMD ${@:2}
    ;;
esac