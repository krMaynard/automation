function sendEmail() {
  var recipient = ""; // Change to your email address
  var email_subject = ""; //Set a subject 
  var emailBody = "";
  var sheet_name = "export to email"; // Change to the name of your sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet_name);
  var startRow = 2; // Start checking for new rows from row 2
  var numRows = sheet.getLastRow() - startRow + 1;

  if (numRows < 1) {
    // No rows found, send an email indicating no new rows
    MailApp.sendEmail(recipient, email_subject, "No new rows", { htmlBody: 'No new rows have been added.' });
    return;
  }

  var dataRange = sheet.getRange(startRow, 1, numRows, sheet.getLastColumn());
  var data = dataRange.getValues();

  emailBody = "<table><tr>";
  for (var i = 0; i < sheet.getLastColumn(); i++) {
    emailBody += "<th>" + sheet.getRange(1, i + 1).getValue() + "</th>";
  }
  emailBody += "</tr>";

  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    if (row[0] != "") { // Check if the first column of the row is not empty
      emailBody += "<tr>";
      for (var j = 0; j < row.length; j++) {
        emailBody += "<td>" + row[j] + "</td>";
      }
      emailBody += "</tr>";
    }
  }

  emailBody += "</table>";

  MailApp.sendEmail(recipient, email_subject, "", { htmlBody: emailBody });
}
