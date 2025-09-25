import { AppSidebar } from "@/components/app-sidebar"
import { NavActions } from "@/components/nav-actions"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ClipboardList, CornerDownLeft, FolderClosed, Globe, Globe2, HardDrive, KeyRound, Link2, MoreHorizontal, Plus, Settings2, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import ProjectCard, { Project } from "@/components/project-card"
import { CreateDialog } from "@/components/create-Dialog"

export default function Page() {

  const projects: Project[] = [
    {
      "id": "1",
      "status": "pending",
      "logo": "/google.png",
      "title": "Google",
      "url": "https://google.com",
      "display_url": "google.com",
      "tags": [
        { "label": "Wordpress", "variant": "default" },
        { "label": "ecommerce", "variant": "outline" }
      ],
      "description": "Search engine platform connecting billions of users to information instantly.",
      "team": [
        {
          "name": "Dev",
          "avatar": "https://github.com/shadcn.png",
          "fallback": "CN"
        },
        {
          "name": "Writer",
          "avatar": "https://github.com/leerob.png",
          "fallback": "LR"
        },
        {
          "name": "Designer",
          "avatar": "https://github.com/evilrabbit.png",
          "fallback": "ER"
        }
      ],
      "actions": [
        {
          "type": "link",
          "icon": "link",
          "label": "Visit Website",
          "href": "https://google.com"
        },
        {
          "type": "popup",
          "icon": "more-horizontal",
          "label": "More Options",
          "popupId": "google-options"
        }
      ]
    },
    {
      "id": "2",
      "status": "active",
      "logo": "/facebook.png",
      "title": "Facebook",
      "url": "https://facebook.com",
      "display_url": "facebook.com",
      "tags": [
        { "label": "React", "variant": "default" },
        { "label": "social-media", "variant": "outline" }
      ],
      "description": "Social networking site connecting people worldwide.",
      "team": [
        {
          "name": "Manager",
          "avatar": "https://github.com/vercel.png",
          "fallback": "VC"
        }
      ],
      "actions": [
        {
          "type": "link",
          "icon": "link",
          "label": "Open Facebook",
          "href": "https://facebook.com"
        },
        {
          "type": "popup",
          "icon": "more-horizontal",
          "label": "Manage Project",
          "popupId": "facebook-options"
        }
      ]
    },
    {
      "id": '3',
      "status": "completed",
      "logo": "/amazon.png",
      "title": "Amazon",
      "url": "https://amazon.com",
      "display_url": "amazon.com",
      "tags": [
        { "label": "Node.js", "variant": "default" },
        { "label": "ecommerce", "variant": "outline" }
      ],
      "description": "E-commerce giant providing a wide range of products globally.",
      "team": [
        {
          "name": "Lead Dev",
          "avatar": "https://github.com/dan-abramov.png",
          "fallback": "DA"
        },
        {
          "name": "UX Designer",
          "avatar": "https://github.com/evilrabbit.png",
          "fallback": "ER"
        }
      ],
      "actions": [ 
        {
          "type": "link",
          "icon": "link",
          "label": "Visit Amazon",
          "href": "https://amazon.com"
        },
        {
          "type": "popup",
          "icon": "more-horizontal",
          "label": "More Settings",
          "popupId": "amazon-options"
        }
      ]
    }
  ]
  

  return (
    <div className="flex flex-1 flex-col gap-4 px-5">
      {/* search section  */}
      <div className=" mx-auto p-10 md:px-10 px-0 w-full max-w-5xl flex flex-col items-center gap-3 rounded-xl">
        <h1 className="text-3xl capitalize text-neutral-700 font-funnel ">
          What will you get done today?
        </h1>
        {/* <div className="flex gap-2 items-center justify-center">
          <div className="bg-blue-200 rounded-full p-1 flex gap-1 justify-center items-center">
            <span className="text-sm rounded-full w-6 h-6 flex items-center justify-center text-blue-900 font-medium  bg-white">10</span>
            <span className="text-sm rounded-full pr-1 text-blue-900 font-medium">Total Projects</span>
          </div>

          <div className="bg-blue-200 rounded-full p-1 flex gap-1 justify-center items-center">
            <span className="text-sm rounded-full w-6 h-6 flex items-center justify-center text-blue-900 font-medium  bg-white">10</span>
            <span className="text-sm rounded-full pr-1 text-blue-900 font-medium">Total Projects</span>
          </div>
          <div className="bg-blue-200 rounded-full p-1 flex gap-1 justify-center items-center">
            <span className="text-sm rounded-full w-6 h-6 flex items-center justify-center text-blue-900 font-medium  bg-white">10</span>
            <span className="text-sm rounded-full pr-1 text-blue-900 font-medium">Total Projects</span>
          </div>
        </div> */}
        <div className=" xl:text-lg text-sm md:leading-6 leading-8  text-neutral-600 ">
          You have <span className="bg-blue-300/60 p-1 px-2 rounded-md text-blue-900 font-medium">10 running projects</span> , <span className="bg-yellow-300/40 p-1 px-2 rounded-md text-yellow-800 font-medium">8 changes</span> and <span className="bg-purple-300/60 p-1 px-2 rounded-md text-purple-900 font-medium">3 open tasks</span> . Left review them!
        </div>
        {/* search input  */}
        <div className="mt-3 relative flex items-center">
          <Input placeholder="Search for projects" className="border border-neutral-400 h-[45px] rounded-xl p-4 " size={80} type="search" />
          <Button variant="secondary" size={'icon'} className="absolute right-0 mr-[5px]  border border-neutral-300 text-neutral-500 rounded-lg"><CornerDownLeft /></Button>
        </div>

      </div>
      {/* project cards  */}

      <div className=" mx-auto h-50 w-full 2xl:max-w-5xl md:max-w-7xl 2xl:px-0 xl:px-5 px-0    flex gap-4 flex-col">
        {/* create options  */}
        <div className="flex items-center  gap-2">
          <CreateDialog />
        </div>
        {/* cards  */}

      <ProjectCard projects={projects} />

      </div>
    </div>
  )
}
