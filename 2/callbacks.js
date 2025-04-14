function verdoppeln(zahl, callback) {
  const ergebnis = zahl * 2;
  callback(ergebnis);
}

verdoppeln(5, function(ergebnis) {
  console.log('Das Ergebnis ist:', ergebnis);
});
