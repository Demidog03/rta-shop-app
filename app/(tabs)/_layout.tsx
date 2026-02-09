import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {Feather} from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
            tabBarActiveTintColor: 'rgba(23, 23, 23, 1)'
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Category',
          tabBarIcon: ({ color }) => <MaterialIcons name="category" size={24} color={color} />,
            tabBarActiveTintColor: 'rgba(23, 23, 23, 1)'
        }}
      />
        <Tabs.Screen
            name="cart"
            options={{
                title: 'Cart',
                tabBarIcon: ({ color }) => <MaterialIcons name="shopping-cart" size={24} color={color} />,
                tabBarActiveTintColor: 'rgba(23, 23, 23, 1)'
            }}
        />
        <Tabs.Screen
            name="account"
            options={{
                title: 'Account',
                tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
                tabBarActiveTintColor: 'rgba(23, 23, 23, 1)'
            }}
        />
    </Tabs>
  );
}
