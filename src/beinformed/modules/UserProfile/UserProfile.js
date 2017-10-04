// @flow
import React from "react";

import { Message } from "beinformed/modules/I18n/Message";
import AttributeList from "beinformed/modules/AttributeList/AttributeList";
import Button from "beinformed/modules/Button/Button";
import Modal from "beinformed/modules/Modal/Modal";
import ModalBody from "beinformed/modules/Modal/ModalBody";
import ModalFooter from "beinformed/modules/Modal/ModalFooter";
import ModalHeader from "beinformed/modules/Modal/ModalHeader";
import ModalTitle from "beinformed/modules/Modal/ModalTitle";

import type UserModel from "beinformed/models/user/UserModel";

type UserProfileProps = {
  user: UserModel,
  onCancel: (e: SyntheticEvent<*>) => void
};

/**
 * User profile
 */
const UserProfile = ({ user, onCancel }: UserProfileProps) => (
  <Modal>
    <ModalHeader showClose onClose={onCancel}>
      <ModalTitle>
        <Message id="UserProfile.Title" defaultMessage={user.label} />
      </ModalTitle>
    </ModalHeader>
    <ModalBody>
      <AttributeList attributes={user.attributeCollection.all} />
    </ModalBody>
    <ModalFooter>
      <Button type="button" name="close" onClick={onCancel}>
        <Message id="UserProfile.Button.Close" defaultMessage="Close" />
      </Button>
    </ModalFooter>
  </Modal>
);

export default UserProfile;
