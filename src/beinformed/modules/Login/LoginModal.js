// @flow
import React from "react";
import Helmet from "react-helmet";

import { Message, injectMessage } from "beinformed/modules/I18n/Message";

import Button from "beinformed/modules/Button/Button";
import HTMLForm from "beinformed/modules/Form/HTMLForm";
import Modal from "beinformed/modules/Modal/Modal";
import ModalBody from "beinformed/modules/Modal/ModalBody";
import ModalFooter from "beinformed/modules/Modal/ModalFooter";
import ModalHeader from "beinformed/modules/Modal/ModalHeader";
import ModalTitle from "beinformed/modules/Modal/ModalTitle";
import PasswordAttribute from "beinformed/modules/FormAttribute/PasswordAttribute";
import StringAttribute from "beinformed/modules/FormAttribute/StringAttribute";
import StringAttributeModel from "beinformed/models/attributes/StringAttributeModel";
import PasswordAttributeModel from "beinformed/models/attributes/PasswordAttributeModel";

import type Authentication from "beinformed/modularui/Authentication";

type LoginModalProps = {
  login: Authentication,
  inError: boolean,
  message: messageFunctionType,
  onUsernameChange: (value: string) => void,
  onPasswordChange: (value: string) => void,
  onCancel: (e: SyntheticEvent<*>) => void,
  onSubmit: (login: Authentication) => void
};

/**
 * Login modal
 */
const LoginModal = ({
  login,
  message,
  onCancel,
  onSubmit,
  onUsernameChange,
  onPasswordChange
}: LoginModalProps) => {
  const usernameAttribute = login.username;
  const passwordAttribute = login.password;

  if (
    !(usernameAttribute instanceof StringAttributeModel) ||
    !(passwordAttribute instanceof PasswordAttributeModel)
  ) {
    throw new TypeError("No username or password fields found");
  }

  usernameAttribute.label = message("Login.Username", "Username");
  usernameAttribute.placeholder = message(
    "Login.Username.Placeholder",
    "Enter username"
  );

  passwordAttribute.label = message("Login.Password", "Username");
  passwordAttribute.placeholder = message(
    "Login.Password.Placeholder",
    "Enter password"
  );

  return (
    <Modal>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <ModalHeader showClose onClose={onCancel}>
        <ModalTitle>
          <Message id="Login.Header" defaultMessage="Login" />
        </ModalTitle>
      </ModalHeader>
      <HTMLForm name="login" onSubmit={onSubmit}>
        <ModalBody>
          {login.inError && (
            <div className="alert alert-danger" role="alert">
              <Message
                id="Login.Msg.IncorrectUsernamePassword"
                defaultMessage="Incorrect username or password."
              />
            </div>
          )}

          <StringAttribute
            attribute={usernameAttribute}
            name="username"
            onChange={(attribute, value) => onUsernameChange(value)}
            autoFocus
          />

          <PasswordAttribute
            attribute={passwordAttribute}
            name="password"
            isLogin
            onChange={(attribute, value) => onPasswordChange(value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button type="button" name="close" onClick={onCancel}>
            <Message id="Login.Button.Close" defaultMessage="Close" />
          </Button>
          <Button
            type="submit"
            name="login"
            buttonStyle="primary"
            onClick={e => {
              e.preventDefault();
              onSubmit(login);
            }}
          >
            <Message id="Login.Button.Login" defaultMessage="Login" />
          </Button>
        </ModalFooter>
      </HTMLForm>
    </Modal>
  );
};

export default injectMessage(LoginModal);
