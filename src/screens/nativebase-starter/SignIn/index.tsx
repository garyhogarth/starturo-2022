import React, { useState } from 'react';

import { Entypo } from '@expo/vector-icons';
import {
  Button,
  HStack,
  VStack,
  Text,
  Link,
  Checkbox,
  Divider,
  useColorModeValue,
  IconButton,
  Icon,
  Pressable,
  Center,
  Hidden,
  useToast,
  Input,
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSignIn } from 'react-supabase';

import { FloatingLabelInput } from './components/FloatingLabelInput';
import IconFacebook from './components/IconFacebook';
import IconGoogle from './components/IconGoogle';

export const SignIn = (props: any) => {
  const [{ error, fetching, session, user }, signIn] = useSignIn();

  // add next router here
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [showPass, setShowPass] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const signInWithEmail = async () => {
    setLoading(true);
    const { error, session, user } = await signIn({
      email,
      password,
    });
    if (error) {
      if (!toast.isActive('login')) {
        toast.show({
          id: 'login',
          title: error.message,
        });
      }
    }
    setLoading(false);
  };

  const signUpWithEmail = async () => {
    // setLoading(true);
    // await supabase.auth.signOut();
    // const { user, error } = await supabase.auth.signUp({
    //   email: email,
    //   password: password,
    // });
    // console.log(user, error);
    // if (error) Alert.alert(error.message);
    // setLoading(false);
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      style={{ flex: 1 }}
    >
      <VStack
        flex="1"
        px="6"
        py="9"
        _light={{ bg: 'white' }}
        _dark={{ bg: 'coolGray.800' }}
        space="3"
        justifyContent="space-between"
        borderTopRightRadius={{ base: '2xl', md: 'xl' }}
        borderBottomRightRadius={{ base: '0', md: 'xl' }}
        borderTopLeftRadius={{ base: '2xl', md: '0' }}
      >
        <VStack space="7">
          <Hidden till="md">
            <Text fontSize="lg" fontWeight="normal">
              Sign in to continue!
            </Text>
          </Hidden>
          <VStack>
            <VStack space="3">
              <VStack space={{ base: '7', md: '4' }}>
                <Input
                  autoCapitalize="none"
                  keyboardType="email-address"
                  isRequired
                  labelColor="#9ca3af"
                  labelBGColor={useColorModeValue('#fff', '#1f2937')}
                  borderRadius="4"
                  defaultValue={email}
                  onChangeText={(text: string) => setEmail(text)}
                  _text={{
                    fontSize: 'sm',
                    fontWeight: 'medium',
                  }}
                  _dark={{
                    borderColor: 'coolGray.700',
                  }}
                  _light={{
                    borderColor: 'coolGray.300',
                  }}
                />
                <Input
                  isRequired
                  type={showPass ? '' : 'password'}
                  label="Password"
                  borderRadius="4"
                  labelColor="#9ca3af"
                  labelBGColor={useColorModeValue('#fff', '#1f2937')}
                  defaultValue={password}
                  onChangeText={(text: string) => setPass(text)}
                  InputRightElement={
                    <IconButton
                      variant="unstyled"
                      icon={
                        <Icon
                          size="4"
                          color="coolGray.400"
                          as={Entypo}
                          name={showPass ? 'eye-with-line' : 'eye'}
                        />
                      }
                      onPress={() => {
                        setShowPass(true);
                      }}
                    />
                  }
                  _text={{
                    fontSize: 'sm',
                    fontWeight: 'medium',
                  }}
                  _dark={{
                    borderColor: 'coolGray.700',
                  }}
                  _light={{
                    borderColor: 'coolGray.300',
                  }}
                />
              </VStack>
              <Link
                ml="auto"
                _text={{
                  fontSize: 'xs',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                }}
                _light={{
                  _text: {
                    color: 'primary.900',
                  },
                }}
                _dark={{
                  _text: {
                    color: 'primary.500',
                  },
                }}
              >
                Forgot password?
              </Link>
              <Checkbox
                alignItems="flex-start"
                mt="5"
                isChecked
                value="demo"
                colorScheme="primary"
                accessibilityLabel="Remember me"
              >
                <Text
                  pl="3"
                  fontWeight="normal"
                  _light={{ color: 'coolGray.800' }}
                  _dark={{ color: 'coolGray.400' }}
                >
                  Remember me and keep me logged in
                </Text>
              </Checkbox>
              <Button
                mt="5"
                size="md"
                borderRadius="4"
                _text={{
                  fontWeight: 'medium',
                }}
                _light={{
                  bg: 'primary.900',
                }}
                _dark={{
                  bg: 'primary.700',
                }}
                onPress={signInWithEmail}
              >
                SIGN IN
              </Button>
              <Button
                disabled={email.length === 0 || password.length === 0}
                mt="5"
                size="md"
                borderRadius="4"
                _text={{
                  fontWeight: 'medium',
                }}
                _light={{
                  bg: 'primary.900',
                }}
                _dark={{
                  bg: 'primary.700',
                }}
                onPress={signUpWithEmail}
              >
                SIGN UP
              </Button>
              {/* Closing Link Tag */}
              <HStack
                mt="5"
                space="2"
                mb={{ base: 6, md: 7 }}
                alignItems="center"
                justifyContent="center"
              >
                <Divider
                  w="30%"
                  _light={{ bg: 'coolGray.200' }}
                  _dark={{ bg: 'coolGray.700' }}
                ></Divider>
                <Text
                  fontWeight="medium"
                  _light={{ color: 'coolGray.300' }}
                  _dark={{ color: 'coolGray.500' }}
                >
                  or
                </Text>
                <Divider
                  w="30%"
                  _light={{ bg: 'coolGray.200' }}
                  _dark={{ bg: 'coolGray.700' }}
                ></Divider>
              </HStack>
            </VStack>
            <Center>
              <HStack space="4">
                <Pressable>
                  <IconFacebook />
                </Pressable>
                <Pressable>
                  <IconGoogle />
                </Pressable>
              </HStack>
            </Center>
          </VStack>
        </VStack>
        <HStack
          mb="4"
          space="1"
          safeAreaBottom
          alignItems="center"
          justifyContent="center"
          mt={{ base: 'auto', md: '8' }}
        >
          <Text
            _light={{ color: 'coolGray.800' }}
            _dark={{ color: 'coolGray.400' }}
          >
            Don't have an account?
          </Text>
          {/* Opening Link Tag navigateTo:"SignUp" */}
          <Link
            _text={{
              fontWeight: 'bold',
              textDecoration: 'none',
            }}
            _light={{
              _text: {
                color: 'primary.900',
              },
            }}
            _dark={{
              _text: {
                color: 'primary.500',
              },
            }}
            onPress={() => {
              props.navigation.navigate('SignUp');
            }}
          >
            Sign up
          </Link>
          {/* Closing Link Tag */}
        </HStack>
      </VStack>
    </KeyboardAwareScrollView>
  );
};
