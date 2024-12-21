import Navigation from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "@/components/ui/navbar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle, // Add this import
} from "@/components/ui/sheet";
import { AudioWaveform, Menu } from "lucide-react";
import { ModeToggle } from "./Mode";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import Signin from "./signin";
import GetStarted from "./getStarted";
import Logout from "./logout";

export default async function NavBar() {
  // const { data: session } = useSession();
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <header className="sticky top-0 z-50 -mb-14 px-4 pb-2">
      <div className="fade-bottom absolute left-0 h-[70px] w-full bg-background/15 backdrop-blur-lg"></div>
      <div className="relative mx-auto max-w-container">
        <NavbarComponent>
          <NavbarLeft>
            <a href="/" className="flex items-center gap-2 text-xl font-bold">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <AudioWaveform className="size-4" />
              </div>{" "}
              <span className="hidden md:block">Launch UI</span>{" "}
            </a>
            <Navigation />
          </NavbarLeft>
          <NavbarRight>
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 p-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={session?.user.avatar}
                      alt={session?.user.name}
                    />
                    <AvatarFallback className="rounded-lg">
                      {session?.user?.username
                        ? session.user.username
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)
                        : "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {session?.user.username}
                    </span>
                    <span className="truncate text-xs">
                      {session?.user.email}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={session?.user.avatar}
                          alt={session?.user.username}
                        />
                        <AvatarFallback className="rounded-lg">
                          {session?.user?.username
                            ? session.user.username
                                .split(" ")
                                .map((word) => word[0])
                                .join("")
                                .toUpperCase()
                                .slice(0, 2)
                            : "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {session?.user.username}
                        </span>
                        <span className="truncate text-xs">
                          {session?.user.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href={"/dashboard"}>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Sparkles />
                        Dashboard{" "}
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <BadgeCheck />
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <Logout />
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Link href="#" className=" text-sm ">
                      Sign in
                    </Link>
                  </DialogTrigger>
                  <DialogContent className="mx-auto max-w-sm">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">Login</DialogTitle>
                      <DialogDescription>
                        Enter your email below to login to your account
                      </DialogDescription>
                    </DialogHeader>
                    <Signin />
                    <div className="mt-4 text-center text-sm">
                      Don&apos;t have an account?{" "}
                      <Link href="#" className="underline">
                        Sign up
                      </Link>
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default">Get Started</Button>
                  </DialogTrigger>
                  <DialogContent className="mx-auto max-w-sm">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">
                        Create Account
                      </DialogTitle>
                      <DialogDescription>
                        Enter a username, email and password below to create
                        your account
                      </DialogDescription>
                    </DialogHeader>
                    <GetStarted />
                    <div className="mt-4 text-center text-sm">
                      Don&apos;t have an account?{" "}
                      <Link href="#" className="underline">
                        Sign up
                      </Link>
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            )}
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                {/* Add SheetTitle */}
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                <nav className="grid gap-6 text-lg font-medium">
                  <a
                    href="/"
                    className="flex items-center gap-2 text-xl font-bold"
                  >
                    <span>Launch UI</span>
                  </a>
                  <a
                    href="/"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Getting Started
                  </a>
                  <a
                    href="/"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Components
                  </a>
                  <a
                    href="/"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Documentation
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
