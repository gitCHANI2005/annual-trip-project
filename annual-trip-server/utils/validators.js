function validatePersonFields({ id, firstName, lastName, className }) {
  if (!id || !firstName || !lastName || !className) {
    return {
      isValid: false,
      message: 'id, firstName, lastName and className are required'
    };
  }

  return {
    isValid: true,
    message: ''
  };
}

function isValidIsraeliIdFormat(id) {
  return /^\d{9}$/.test(String(id));
}

function isDuplicateId(id, collection) {
  return collection.some(item => item.id === String(id));
}

module.exports = {
  validatePersonFields,
  isValidIsraeliIdFormat,
  isDuplicateId
};