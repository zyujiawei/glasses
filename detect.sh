CURRENT_PATH=$(cd "$(dirname "$0")"; pwd)
IMAGEBEFORE_PATH=$(cd "$(dirname "$1")"; pwd)
IMAGEBEFORE_NAME=$(basename "$1")
cd $CURRENT_PATH
pwd
matlab -nodisplay -nosplash -nodesktop -r "detect('$IMAGEBEFORE_PATH/$IMAGEBEFORE_NAME','$2',1,0);exit;"
