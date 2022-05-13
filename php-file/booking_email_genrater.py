import email
import yagmail
import sys


n = len(sys.argv)
# for i in range(1, n):
#     print(sys.argv[i], end=" ")
email_id = sys.argv[1]
bus_number = sys.argv[2]
tra_date = sys.argv[3]
noofsit = sys.argv[4]
price = sys.argv[5]
dep_time = sys.argv[6]
source = sys.argv[7]
destination = sys.argv[8]

# travel agency email-id and password
user = 'travelagency3111@gmail.com'
app_password = 'xoimzzzmfthqkugx'  # a token for gmail

# email sending to user
content = ['<h4>hii ' + email_id + ' <br><br> Your Booking For Trip <br><b>From : '
           + source+' To : '+destination + '<br> On :  '+tra_date+' <br> Departuter Time : ' +
           dep_time + ' </b>  is <u>succesfully </u> Done. <br><br> you booked <b><u><i> '
           + noofsit+' </b></u></i> Ticket  of Price <b><u>' +
           price+'</b></u> for the Trip. <br><br> Bus Number For The Trip is : '+bus_number+' </h1>']


subject = 'Booking in Travel-With-Us'
with yagmail.SMTP(user, app_password) as yag:
    yag.send(email_id, subject, content)
    print('Sent email successfully')
