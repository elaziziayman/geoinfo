import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let icon;

        if (route.name === 'Accueil') {
          icon = 'home'; 
        } else if (route.name === 'Nouvelle demande') {
          icon = 'post-add'; 
        } else if (route.name === 'Mes demandes') {
          icon = 'reorder'; 
        } else if (route.name === 'Carte') {
          icon = 'map'; 
        }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            key={route.key}
          >
            <View style={{ alignItems: 'center' }}>
            <MaterialIcons
              name={icon}
              size={24}
              color={isFocused ? 'blue' : 'black'} 
            />
            <Text style={{ color: isFocused ? 'blue' : 'black' }}>
              {label}
            </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
