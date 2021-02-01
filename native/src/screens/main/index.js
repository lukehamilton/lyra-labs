import React, { useContext } from "react";
import styled from "@emotion/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CurrentUserContext } from "@shared/enhancers/current-user";
import { MAIN_TABS, ROUTES, ROUTE_PROFILE } from "@shared/routes";

const Container = styled.View``;

const TabBar = styled.SafeAreaView`
  height: ${(props) => (props.theme.hasNotch ? "75px" : "50px")};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ItemContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Item = styled.Pressable`
  margin-top: ${(props) => (props.theme.hasNotch ? "15px" : "0px")};
  justify-content: center;
`;

const AvatarContainer = styled.View`
  background-color: ${(props) =>
    props.isFocused ? "white" : props.theme.colors.background};
  width: 27px;
  height: 27px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

const Avatar = styled.Image`
  width: 24px;
  height: 24px;
  border-color: ${(props) => props.theme.colors.background};
  border-width: 2px;
  border-radius: 50px;
`;

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const { currentUser } = useContext(CurrentUserContext);
  // console.log("currentUser", currentUser.avatar);
  return (
    <Container>
      <TabBar>
        {state.routes.map((route, index) => {
          const details = ROUTES[route.name];
          const { icon, iconSolid } = ROUTES[route.name];
          const isFocused = state.index === index;
          const isProfileRoute = route.name === ROUTE_PROFILE;

          const handlePress = () => {
            if (!isFocused) {
              navigation.navigate(route.name);
            }
          };

          return (
            <ItemContainer>
              <Item onPress={handlePress}>
                {isProfileRoute && currentUser && currentUser.avatar ? (
                  <AvatarContainer isFocused={isFocused}>
                    <Avatar source={{ uri: currentUser.avatar }} />
                  </AvatarContainer>
                ) : (
                  <FontAwesomeIcon
                    style={{
                      color: "white",
                      opacity: isFocused ? 1 : 0.6,
                    }}
                    size={24}
                    icon={isFocused ? iconSolid : icon}
                  />
                )}
              </Item>
            </ItemContainer>
          );
        })}
      </TabBar>
    </Container>
  );
};

const MainScreen = () => {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      {MAIN_TABS.map(({ route, component, icon }) => (
        <Tab.Screen name={route} component={component} />
      ))}
    </Tab.Navigator>
  );
};

export default MainScreen;
