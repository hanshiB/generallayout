// @flow
import React from "react";

// I18N
import { Message } from "beinformed/modules/I18n/Message";
import Href from "beinformed/models/href/Href";
import UserProfile from "beinformed/modules/UserProfile/UserProfile";
import Dropdown from "beinformed/modules/Dropdown/Dropdown";
import DropdownChildren from "beinformed/modules/Dropdown/DropdownChildren";
import DropdownToggle from "beinformed/modules/Dropdown/DropdownToggle";
import DropdownLink from "beinformed/modules/Dropdown/DropdownLink";
import Icon from "beinformed/modules/Icon/Icon";
import Link from "beinformed/modules/Link/Link";

import type UserModel from "beinformed/models/user/UserModel";
import type UserServicesModel from "beinformed/models/user/UserServicesModel";

type AccountMenuType = {
  user: ?UserModel,
  userProfile: UserModel,
  userServices: UserServicesModel | null,
  onLoginClick: (href: Href) => void,
  onLogoutClick: (href: Href) => void,
  onUserProfileClick: (href: Href) => void,
  onUserProfileHide: (e: SyntheticEvent<*>) => void
};

/**
 * Account menu
 */
const AccountMenu = ({
  user,
  userServices,
  userProfile,
  onLoginClick,
  onLogoutClick,
  onUserProfileClick,
  onUserProfileHide
}: AccountMenuType) => {
  if (userServices && user) {
    return (
      <div className="account-menu">
        <Dropdown className="userlinks" align="right">
          <DropdownToggle>
            <Icon name="user" textAfter />
            <span className="username">{user.fullname}</span>
          </DropdownToggle>

          <DropdownChildren>
            {userServices.userDataLink !== null && (
              <DropdownLink
                className="user-profile"
                href={userServices.userDataLink.href}
                onClick={onUserProfileClick}
              >
                <Icon name="user" textAfter />
                <Message
                  id="UserLinks.Menu.UserProfile"
                  defaultMessage="User profile"
                />
              </DropdownLink>
            )}
            <div
              role="separator"
              className="dropdown-divider"
              aria-label="separator"
            />

            <DropdownLink
              className="signout"
              href={new Href("/Logoff")}
              onClick={onLogoutClick}
            >
              <Icon name="sign-out" textAfter />
              <Message id="UserLinks.Menu.LogOut" defaultMessage="Log out" />
            </DropdownLink>
          </DropdownChildren>
        </Dropdown>

        {userProfile && (
          <UserProfile user={userProfile} onCancel={onUserProfileHide} />
        )}
      </div>
    );
  }

  return (
    <ul className="account-nav nav navbar-nav">
      <li className="nav-item">
        <Link
          className="signin"
          dataId="login"
          href={new Href("/login")}
          onClick={onLoginClick}
          isNavLink
        >
          <Icon name="sign-in" textAfter />
          <Message id="UserLinks.Menu.LogIn" defaultMessage="Login" />
        </Link>
      </li>
    </ul>
  );
};

export default AccountMenu;
