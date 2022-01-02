module.exports = class HandlerUseCase {
    constructor(mapFields) {
      this.mapFields = mapFields;
    }
  
    checkStringFieldsInsert(fields) {
      const keys = fields.map((field) => {
        return Object.entries(field)[0][0];
      });
  
      const IS_VALID = true;
  
      for (let i = 0; i < keys.length; i++) {
        if (!keys[i] in this.mapFields) return !IS_VALID;
      }
  
      return IS_VALID;
    }
  
    checkStringFields(fields) {
      const IS_VALID = true;
      const fieldsNormalized = fields.map((el) => Object.entries(el)[0][0]);
  
      fieldsNormalized.some(([key, _]) => {
        if (!this.mapFields[key]) {
          return !IS_VALID;
        }
      });
  
      return IS_VALID;
    }
  
    reduceFields(fields) {
      return fields.reduce((acc, field) => {
        const entriesField = Object.entries(field);
        acc[entriesField[0][0]] = entriesField[0][1];
  
        return acc;
      }, {});
    }
  };
  