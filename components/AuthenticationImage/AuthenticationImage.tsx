import Link from 'next/link';
import { Paper, Text, Title } from '@mantine/core';
import AuthButtonGroup from './AuthButtonGroup/AuthButtonGroup';
import classes from './AuthenticationImage.module.css';

export function AuthenticationImage({ isSignIn }: { isSignIn: boolean }) {
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome {isSignIn ? 'back' : ''} to Badgepacc!
        </Title>

        <AuthButtonGroup />

        <Text ta="center" mt="md">
          Don&apos;t have an account? <Link href="#">Register</Link>
        </Text>
      </Paper>
    </div>
  );
}
