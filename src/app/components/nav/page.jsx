"use client";
import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import { useDisclosure } from "@mantine/hooks";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from "@tabler/icons-react";
import classes from "./nav.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAuth } from "firebase/auth";

export default function Nav() {
  const router = useRouter();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();
// const auth = getAuth();
  return (
    <Box pb={25}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link href="/">
            <MantineLogo size={30} />
          </Link>
          <Group h="100%" gap={0} visibleFrom="sm">
            <Link href="/components/job" className={classes.link}>
              Jobs
            </Link>
            <Link href="/components/employer" className={classes.link}>
              Employer
            </Link>
            <Link href="/components/candidate" className={classes.link}>
              Candidate
            </Link>
          </Group>

          <Group visibleFrom="sm">
            <Link href="/components/authentication">
              <Button variant="default">Log in</Button>
            </Link>
            <Link href="/components/authentication">
              <Button>Sign up</Button>
            </Link>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <Link
            href="/components/job"
            onClick={() => {
              closeDrawer();
            }}
            className={classes.link}
          >
            Jobs
          </Link>
          <Link
            href="/components/employer"
            onClick={() => {
              closeDrawer();
            }}
            className={classes.link}
          >
            Employer
          </Link>
          <Link
            href="/components/candidate"
            onClick={() => {
              closeDrawer();
            }}
            className={classes.link}
          >
            Candidate
          </Link>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Link href="/components/authentication">
              <Button variant="default">Log in</Button>
            </Link>
            <Link href="/components/authentication">
              <Button>Sign up</Button>
            </Link>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
