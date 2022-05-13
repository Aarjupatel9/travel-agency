<?php
// $email_id = 'wwwaarjubodaaarjuboda@gmail.com';

// $command = escapeshellcmd('python test.py ' . $email_id);
//  $output = shell_exec($command);
//  echo $output;
$command = escapeshellcmd('python register_email_genrater.py ' . 'aarjupatel922003@gmail.com'.'aarjupatel-in-try-mode');
// $output = "> /dev/null 2>/dev/null &"shell_exec($command.' > /dev/null 2>/dev/null &');
$WshShell = new COM("WScript.Shell");
$oExec = $WshShell->Run("python register_email_genrater.py ' . 'aarjupatel922003@gmail.com'.'aarjupatel-in-try-mode", 0, false);
