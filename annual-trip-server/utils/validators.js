function isValidIsraeliId(id) {
  return /^\d{9}$/.test(String(id));
}

function hasRequiredFields(fields) {
  for (const value of Object.values(fields)) {
    if (value === undefined || value === null || String(value).trim() === '') {
      return false;
    }
  }
  return true;
}

function isValidCoordinates(longitude, latitude) {
  const lon = Number(longitude);
  const lat = Number(latitude);
  return (!Number.isNaN(lon) && !Number.isNaN(lat) && lon >= -180 && lon <= 180 && lat >= -90 && lat <= 90);
}

module.exports = {
  isValidIsraeliId,
  hasRequiredFields,
  isValidCoordinates
};