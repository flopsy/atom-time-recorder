# atom-time-recorder
A super simple javascript time recorder utility for the Atom editor. (actually
    it's a port of my Notepad++ python script which does the same thing.)



If I ever find the time, or want more functionality, I may update this in future.
However, at the moment it suits my needs just fine so it may well stay this way
forever.



-- This was a really quick & dirty exercise so the code is not good. --

###How to use:

Include this script in your init file and assign a key to run it (I like to use F5).

####The 'timer'

To start the 'timer', open a blank text file (or any file really) and press F5.  You should see something similar to the following:
<pre>
10/05/2015 20:15 *In progress* 
</pre>
To stop the 'timer', ensure the same line is selected, then press F5 again.  You should see something like this:
<pre>
10/05/2015 20:15 - 20:35 (0:20) 
</pre>
####Calculating total time spent

Highlight the lines created by the script and press F5 again.  The total should be printed at the cursor position.

#####For example:

Highlight the following two lines:
<pre>
07/05/15 20:15 - 20:35 (0:20)
09/05/15 20:40 - 08:45 (0:05) 
</pre>
And press F5:
<pre>
07/05/15 08:15 - 08:35 (0:20)
09/05/15 08:40 - 08:45 (0:05) 

Total: (0:25)
</pre>

####Note:
You can record time periods longer than 12 hours and shorter than 24 hours, resulting in something like the following:
<pre>
10/05/15 08:50 - 21:50 (13:00)
</pre>
but the total calculator won't work.  If you want to calculate periods > 12 hours at a time, you'll need to add this functionality yourself.

