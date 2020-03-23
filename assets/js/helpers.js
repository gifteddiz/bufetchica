const helpers = {
  deepCopy(source) {
    // Возвращает глубокую копию объекта
    return JSON.parse(JSON.stringify(source));
  }
};

export default helpers;
