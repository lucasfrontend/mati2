import moment from 'moment'

export function getCurrentDate() {
  return moment().format('dddd, MMMM Do YYYY')
}

export function convertToDollars(value, dolarBlue) {
  const dollarValue = parseFloat(dolarBlue);
  const amount = parseFloat(value);
  if (!isNaN(dollarValue) && !isNaN(amount)) {
    const dollars = amount / dollarValue;
    return dollars.toFixed(2); // Redondear a 2 decimales
  }
  return null; // Manejar casos inválidos
}


export function formatDate(format, date) {
  var fec = date.substring(0, 10);
  var separator = "/",
    formatSeparator = "/";
  if (fec.indexOf("-") > -1) separator = "-";
  if (format.indexOf("-") > -1) formatSeparator = "-";
  if (!date) return null;
  const [year, month, day] = fec.split(separator);
  var formated = `${day}${formatSeparator}${month}${formatSeparator}${year}`;

  if (format === "yyyy-mm-dd" || format === "yyyy/mm/dd") {
    formated = `${year}${formatSeparator}${month}${formatSeparator}${day}`;
  }

  if (format === "dd-mm-yyyy" || format === "dd/mm/yyyy") {
    formated = `${day}${formatSeparator}${month}${formatSeparator}${year}`;
  }

  return formated;
}


export function getExpirationColor(expirationDate) {
  const currentDate = moment();
  console.log(currentDate, "currentDate")
  const expiration = moment(expirationDate, 'DD/MM/YYYY');
  console.log("expiration", expiration)

  const diffInDays = expiration.diff(currentDate, 'days');

  console.log("diffInDays", diffInDays)

  if (diffInDays < 0) {
    return "red"; // Vencido (color rojo)
  } else if (diffInDays === 0) {
    return "red"; // Vence hoy (color rojo)
  } else if (diffInDays <= 7) {
    return "orange"; // Faltan menos de una semana (color naranja)
  } else {
    return "green"; // Aún no vencido (color verde)
  }
}



