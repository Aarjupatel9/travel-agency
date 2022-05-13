import email
import yagmail
import sys


n = len(sys.argv)
# for i in range(1, n):
#     print(sys.argv[i], end=" ")
email_id = sys.argv[1]
username = sys.argv[2]

#travel agency email-id and password
user = 'travelagency3111@gmail.com'
app_password = 'xoimzzzmfthqkugx'  # a token for gmail

#email sending to user
content = ['<h1>hii ' + username +' <br><br> Your Registratiom In <b>trvel-with-us</b>  is <u>succesfully </u> Done.    With Email Id : <br>   '+  email_id +'</h1>']
subject = 'Regiatration In Travel-With-Us'
with yagmail.SMTP(user, app_password) as yag:
    yag.send(email_id, subject, content)
    print('Sent email successfully')

