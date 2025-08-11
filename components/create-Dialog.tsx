"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import {
  FolderClosed,
  Home,
  Settings2,
  BarChart2,
  HelpCircle,
} from "lucide-react"

type MenuKey = "General" | "Team" | "Client" | "help"

const MENU_ITEMS: { key: MenuKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "General", label: "General", icon: Home },
  { key: "Team", label: "Team", icon: BarChart2 },
  { key: "Client", label: "Client", icon: Settings2 },
  { key: "help", label: "Help", icon: HelpCircle },
]

export function CreateDialog() {
  const [active, setActive] = React.useState<MenuKey>("General")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={"lg"} className="border border-neutral-400">
          <FolderClosed className="mr-2" /> Create Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px] rounded-2xl border-0 p-0 overflow-hidden">
        <div className="flex h-[450px]">
          {/* Sidebar inside dialog */}
          <aside className="w-45 shrink-0 border-r bg-muted/30">
            <div className="px-3 py-4 min-h-[49px] max-h-[49px]">
              <DialogHeader>
                <DialogTitle className=" text-base  font-normal">Quick Setup</DialogTitle>
              </DialogHeader>
            </div>
            <nav className="px-0 pb-4 ">
              {MENU_ITEMS.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActive(key)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-0 border-t px-3 py-3  text-sm transition-colors",
                    active === key
                      ? "bg-sidebar-accent text-neutral-800"
                      : "hover:bg-sidebar hover:text-accent-foreground"
                  )}
                >
                  <Icon className="size-4" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
            <div className="mt-auto p-3 hidden" /> 
          </aside>

          {/* Content area */}
          <section className="flex-1 min-w-0">
            <div className="flex h-full flex-col">
              <header className="border-b px-6 py-2 pb-2 min-h-[50px] max-h-[50px]">
                <h3 className="text-sm font-medium leading-tight">
                  {MENU_ITEMS.find((m) => m.key === active)?.label}
                </h3>
                <p className="text-xs text-muted-foreground ">
                {MENU_ITEMS.find((m) => m.key === active)?.label == 'General' ? 'hello general':''}
                {MENU_ITEMS.find((m) => m.key === active)?.label == 'Team' ? 'hello team':''}
                {MENU_ITEMS.find((m) => m.key === active)?.label == 'Client' ? 'hello Client':''}
                {MENU_ITEMS.find((m) => m.key === active)?.label == 'Help' ? 'hello Setting':''}
                </p>
              </header>
              <div className="flex-1 overflow-y-auto p-6">
                {active === "General" && <GeneralDemo />}
                {active === "Team" && <TeamDemo />}
                {active === "Client" && <ClientDemo />}
                {active === "help" && <HelpDemo />}
              </div>
              <footer className="border-t px-2 py-2 flex items-center justify-end gap-2">
                <DialogClose asChild>
                  <Button size={'sm'} variant="outline">Cancel</Button>
                </DialogClose>
                <Button size={'sm'}>Continue</Button>
              </footer>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function GeneralDemo() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <CardLike title="Getting Started">
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Create your first project</li>
          <li>Invite your team members</li>
          <li>Connect integrations</li>
        </ul>
      </CardLike>
      <CardLike title="Shortcuts">
        <div className="text-sm text-muted-foreground">Try Ctrl/Cmd + B to toggle sidebar in the app.</div>
      </CardLike>
    </div>
  )
}

function TeamDemo() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <CardLike title="Weekly Visits">
        <div className="h-32 rounded-md bg-muted" />
      </CardLike>
      <CardLike title="Conversion Rate">
        <div className="h-32 rounded-md bg-muted" />
      </CardLike>
    </div>
  )
}

function ClientDemo() {
  return (
    <div className="grid gap-4">
      <Field label="Project name" value="Untitled Project" />
      <Field label="Visibility" value="Private" />
      <Field label="Region" value="US-East" />
    </div>
  )
}

function HelpDemo() {
  return (
    <div className="space-y-3 text-sm">
      <p>
        Need help? Visit the documentation or reach out to support. This is placeholder text for a help section.
      </p>
      <ul className="list-disc pl-5">
        <li>Docs: Getting Started</li>
        <li>FAQ: Common questions</li>
        <li>Contact: support@example.com</li>
      </ul>
    </div>
  )
}

function CardLike({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <div className="mb-2 text-sm font-medium">{title}</div>
      {children}
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="rounded-md border bg-background px-3 py-2 text-sm">{value}</div>
    </div>
  )
}
