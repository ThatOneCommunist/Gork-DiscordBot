function GorkMisspell(msg) {
  if (
    // returns -1 if not included
    msg.search(/@[a-z]ork/gis) > -1 ||
    msg.search(/@[a-z]rok/gis) > -1
  ) {
    return true;
  } else {
    return false;
  }
}
exports.GorkMisspell = GorkMisspell;
