const _ = require('lodash');
const pino = require('pino')();
const conduit = require('../conduit');

async function fetchObjectInfo(text, formatFunc) {
  let objects = text.match(/[DT]\d+/g);
  if (!objects) { return null; }
  const result = await conduit.lookup(objects);
  pino.info(result)
  if (formatFunc) {
    return _.map(result, formatFunc).join('\n');
  } else {
    return _.map(result, (v, objName) => {
      return `*${objName}* _${v.status}_ : ${v.fullName.slice(objName.length + 1)} \n${v.uri}`
    }).join('\n')
  }
}

module.exports = {
  fetchObjectInfo
}
