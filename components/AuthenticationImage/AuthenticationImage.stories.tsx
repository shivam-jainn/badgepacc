import { AuthenticationImage } from './AuthenticationImage';

export default {
  title: 'Auth Image',
  component: AuthenticationImage,
  argTypes: {
    isSignIn: { control: 'boolean', description: 'Is it a sign in page or sign up page' },
  },
};

export const UserSignIn = {
  args: {
    isSignIn: true,
  },
};

export const UserSignUp = {
  args: {
    isSignIn: false,
  },
};
