const express = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const verifyToken = require('../middleware/auth');
const friendInvitationControllers = require('../controllers/friendInvitation/friendInvitationControllers');
const router = express.Router();

const postFriendInvitationSchema = Joi.object({
  targetMailAddress: Joi.string().email(),
});
const inviteDecisionSchema = Joi.object({
  id: Joi.string().required(),
});
router.post(
  '/invite',
  verifyToken,
  validator.body(postFriendInvitationSchema),
  friendInvitationControllers.controllers.postInvite
);

router.post(
  '/accept',
  verifyToken,
  validator.body(inviteDecisionSchema),
  friendInvitationControllers.controllers.postAccept
);

router.post(
  '/reject',
  verifyToken,
  validator.body(inviteDecisionSchema),
  friendInvitationControllers.controllers.postReject
);

// If we are configuring route with related to router, we need to export the router because we are not getting anything from the file.
module.exports = router;
