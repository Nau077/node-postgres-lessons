module.exports = class HandlerUseCase {
  mapFields;

  constructor(mapFields) {
    this.mapFields = mapFields
  };

  checkStringFieldsInsert(fields) {
    const keys = fields.map((val) => {
      return Object.entries(val)[0][0];
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
    return fields.reduce((acc, el) => {
      const entriesEl = Object.entries(el);
      acc[entriesEl[0][0]] = entriesEl[0][1];

      return acc;
    }, {});
  }
};
