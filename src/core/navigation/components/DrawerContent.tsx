import React from 'react';

import { DrawerContentScrollView } from '@react-navigation/drawer';
import { DrawerContentComponentProps } from '@react-navigation/drawer/lib/typescript/src/types';
import { VStack } from 'native-base';

import { AdBanner } from '#app/components/ads/AdBanner';
import { useAuth } from '#app/core/auth/hooks/useAuth';

import { DrawerItem } from './DrawerItem';
import { DrawerItemList } from './DrawerItemList';

export const DrawerContent = (props: DrawerContentComponentProps) => {
  const { descriptors, state, navigation, ...rest } = props;
  const focusedRoute = state.routes[state.index];
  const focusedDescriptor = descriptors[focusedRoute.key];
  const focusedOptions = focusedDescriptor.options;
  const { drawerContentStyle, drawerContentContainerStyle } = focusedOptions;
  const { user } = useAuth();

  return (
    <DrawerContentScrollView
      {...rest}
      contentContainerStyle={drawerContentContainerStyle}
      style={drawerContentStyle}
    >
      <VStack space="4" my="1" mx="1">
        {user && (
          <DrawerItem
            label={user?.email}
            onPress={() => navigation.navigate('SignIn')}
          />
        )}
        <DrawerItemList {...props} />
      </VStack>
      <AdBanner />
    </DrawerContentScrollView>
  );
};
