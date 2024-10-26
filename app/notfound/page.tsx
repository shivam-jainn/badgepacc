import { Container, Title, Text, Button, Group } from '@mantine/core';
import { Illustration404 } from '@/components/Notfound/Illustration404';
import classes from './Notfound.module.css';
import Link from 'next/link';

export default function Page() {
  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration404 className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text c="dimmed" size="lg" ta="center" className={classes.description}>
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
          <Group justify="center">
            <Link href={'/'}>
                <Button size="md">Take me back to home page</Button>
            </Link>
          </Group>
        </div>
      </div>
    </Container>
  );
}