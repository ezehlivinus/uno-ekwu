const AccessControl = require('accesscontrol');

const ac = new AccessControl();

exports.roles = (function r() {
  ac.grant('customer')
    .readOwn('userAccount')
    .updateOwn('userAccount');

  ac.grant('staff').extend('customer')
    .createAny('userAccount');

  ac.grant('admin').extend('staff')
    .updateAny('userAccount')
    .deleteAny('userAccount');

  return ac;
}());
