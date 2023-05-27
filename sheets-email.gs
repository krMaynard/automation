
function sendEmail() {
  var recipient = ""; // Change to your email address
  var email_subject = "";
  var emailBody = "";
  var body = "";

  var sheet_name = ""; // Change to the name of your sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet_name);
  var startRow = 2; // Start checking for new rows from row 2
  var numRows = sheet.getLastRow() - startRow + 1;

  if (numRows > 0) {
    var dataRange = sheet.getRange(startRow, 1, numRows, sheet.getLastColumn());
    var data = dataRange.getValues();

    emailBody += "<table><tr>";
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
  } else {
    emailBody = "No new rows have been added.";
  }

  body = "This is a prototype of an automated notification that new rows have been added:<br><br>" + emailBody;
  
  if (numRows > 0) {
    MailApp.sendEmail(recipient, email_subject, "", { htmlBody: body });
  } else {
    MailApp.sendEmail(recipient, email_subject, "No new rows", { htmlBody: body });
  }
}
