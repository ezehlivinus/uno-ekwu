const AccessControl = require('accesscontrol');

const ac = new AccessControl();
exports.ac = ac;

exports.roles = (function r() {
  ac.grant('customer')
    .readOwn('userAccount')
    .updateOwn('userAccount');

  ac.grant('staff').extend('customer')
    .readAny('userAccount')
    .createAny('userAccount');

  ac.grant('admin').extend('staff')
    .updateAny('userAccount')
    .deleteAny('userAccount');

  return ac;
}());
