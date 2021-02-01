import HomeScreen from "@screens/main/home";
import ReadingListScreen from "@screens/reading-list";
import CreatePostScreen from "@screens/main/create-post";
import ActivityScreen from "@screens/main/activity";
import ProfileScreen from "@screens/main/profile";
import OnboardingScreen from "@screens/onboarding";

import {
  faHomeAlt,
  faBookmark,
  faPlus,
  faBell,
  faUserAstronaut,
} from "@fortawesome/pro-regular-svg-icons";

import {
  faHomeAlt as faHomeAltSolid,
  faBookmark as faBookmarkSolid,
  faPlus as faPlusSolid,
  faBell as faBellSolid,
  faUserAstronaut as faUserAstronautSolid,
} from "@fortawesome/pro-solid-svg-icons";

export const ROUTE_HOME = "home";
export const ROUTE_READING_LIST = "reading-list";
export const ROUTE_ONBOARDING = "onboarding";
const ROUTE_CREATE_POST = "create-post";
export const ROUTE_ACTIVITY = "activity";
export const ROUTE_PROFILE = "profile";
export const ROUTE_AUTH = "auth";
export const ROUTE_MAIN = "main";
export const ROUTE_AUTH_SELECT = "auth-select";
export const ROUTE_AUTH_FORM = "auth-form";

export const GRADIENT_ROUTES = [ROUTE_ACTIVITY, ROUTE_PROFILE];

const HOME = {
  route: ROUTE_HOME,
  component: HomeScreen,
  icon: faHomeAlt,
  iconSolid: faHomeAltSolid,
  label: "Home",
};

const READING_LIST = {
  route: ROUTE_READING_LIST,
  component: ReadingListScreen,
  icon: faBookmark,
  iconSolid: faBookmarkSolid,
  label: "Reading List",
};

const ONBOARDING = {
  route: ROUTE_ONBOARDING,
  component: ONBOARDING,
  icon: faBookmark,
  iconSolid: faBookmarkSolid,
  label: "Reading List",
};

const CREATE_POST = {
  route: ROUTE_CREATE_POST,
  component: CreatePostScreen,
  icon: faPlus,
  iconSolid: faPlusSolid,
  label: "Create Post",
};

const ACTIVITY = {
  route: ROUTE_ACTIVITY,
  component: ActivityScreen,
  icon: faBell,
  iconSolid: faBellSolid,
  label: "Activity",
};

const PROFILE = {
  route: ROUTE_PROFILE,
  component: ProfileScreen,
  icon: faUserAstronaut,
  iconSolid: faUserAstronautSolid,
  label: "Profile",
};

export const ROUTES = {
  [ROUTE_HOME]: HOME,
  [ROUTE_READING_LIST]: READING_LIST,
  [ROUTE_CREATE_POST]: CREATE_POST,
  [ROUTE_ACTIVITY]: ACTIVITY,
  [ROUTE_PROFILE]: PROFILE,
  [ROUTE_ONBOARDING]: ONBOARDING,
};

export const MAIN_TABS = [HOME, PROFILE];
