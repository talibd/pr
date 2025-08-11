'use client'
import React from 'react'

import { Button } from "@/components/ui/button"
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
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

type TagVariant = 'default' | 'outline'

export interface Project {
    id: string
    status: string
    logo: string
    title: string
    url: string
    display_url: string
    tags: {
        label: string
        variant: TagVariant
    }[]
    description: string
    team: {
        name: string
        avatar: string
        fallback: string
    }[]
    actions: {
        type: 'link' | 'popup'
        icon: string
        label: string
        href?: string
        popupId?: string
        danger?: boolean
    }[]
}

export default function ProjectCard({ projects }: { projects: Project[] }) {

    const router = useRouter();
    const site = typeof window !== "undefined" ? window.location.origin : process.env.DOMAIN;
  
    const handleCardRedirect = (id: string) => {
        router.push(`/dashboard/project/${id}`)
    }

    function copyText(text: string) {
        if (navigator && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            navigator.clipboard.writeText(text);
            toast('Copied Succesfully!',
                {
                  icon: '👍',
                  style: {
                    borderRadius: '50px',
                    background: '#333',
                    color: '#fff',
                  },
                }
              );
        } else {
            // fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.setAttribute('readonly', '');
            textarea.style.position = 'absolute';
            textarea.style.left = '-9999px';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
    }


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {projects.map((project) => {
                const linkAction = project.actions.find(a => a.type === 'link' && !!a.href)
                return (
                    <Card key={project.id} className="bg-sidebar gap-3 shadow-none hover:border-neutral-400 border p-4 rounded-xl relative">
                        <div className="flex flex-row justify-end right-2 w-full gap-2 absolute top-2">
                            <Badge variant="outline" className={` ${project.status === 'pending' ? 'text-yellow-600 border-yellow-500 bg-yellow-100' : ''} ${project.status === 'active' ? 'text-blue-600 border-blue-500 bg-blue-100' : ''} ${project.status === 'completed' ? 'text-green-600 border-green-500 bg-green-100' : ''}`}>{project.status}</Badge>
                        </div>
                        <div className="flex flex-col gap-3 cursor-pointer" onClick={() => handleCardRedirect(project.id)}>
                            <CardHeader className="flex p-0 flex-row gap-2 w-full ">
                                <Image src={project.logo} width={1080} height={1080} alt={project.title} className="rounded-full w-12 h-12 border bg-white" />
                                <div className="flex flex-col">
                                    <CardTitle className="text-xl text-neutral-600 font-normal w-[200px] line-clamp-1 truncate">{project.title}</CardTitle>
                                    <span className="text-sm text-neutral-500 flex flex-row items-center gap-1 w-[200px] line-clamp-1 truncate"><Globe size={14} /> {project.display_url}</span>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0 flex gap-2 flex-col">
                                <div className="text-neutral-400 flex gap-1 flex-wrap items-center">
                                    {project.tags.map((tag, idx) => (
                                        <React.Fragment key={idx}>
                                            <Badge variant={tag.variant}>{tag.label}</Badge>
                                            {idx < project.tags.length - 1 && <span className="mx-0 text-neutral-300">|</span>}
                                        </React.Fragment>
                                    ))}
                                </div>
                                {/* <p className="text-sm line-clamp-2 text-neutral-500">{project.description}</p> */}
                            </CardContent>
                        </div>
                        <Separator />
                        <CardFooter className="p-0">
                            <div className="flex items-center justify-between w-full flex-row">
                                <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 ">
                                    {project.team.map((member, idx) => (
                                        <Tooltip key={idx}>
                                            <TooltipTrigger>
                                                <Avatar className="hover:z-10 ring-2 ring-white">
                                                    <AvatarImage src={member.avatar} alt={member.name} />
                                                    <AvatarFallback>{member.fallback}</AvatarFallback>
                                                </Avatar>
                                            </TooltipTrigger>
                                            <TooltipContent >
                                                <p>{member.name}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    ))}
                                </div>
                                <div className="flex gap-2 flex-row">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="data-[state=open]:bg-accent h-7 w-7"
                                        aria-label="More options"
                                        onClick={() => copyText(`${site}/client/${project.id}`)}
                                    >
                                        <Link2 />
                                    </Button>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="data-[state=open]:bg-accent h-7 w-7"
                                                aria-label="More options"
                                            >
                                                <MoreHorizontal />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-45 overflow-hidden rounded-lg p-0"
                                            align="end" side='bottom'
                                        >
                                            <Sidebar collapsible="none" className="bg-transparent p-0">
                                                <SidebarContent>
                                                    <SidebarGroup className="border-b last:border-none p-1">
                                                        <SidebarGroupContent className="gap-0">
                                                            <SidebarMenu>
                                                                <SidebarMenuItem>
                                                                    <SidebarMenuButton>
                                                                        <Settings2 /> <span>Edit Project</span>
                                                                    </SidebarMenuButton>
                                                                </SidebarMenuItem>
                                                                <SidebarMenuItem>
                                                                    <SidebarMenuButton>
                                                                        <KeyRound /> <span>Login Website</span>
                                                                    </SidebarMenuButton>
                                                                </SidebarMenuItem>
                                                                <SidebarMenuItem>
                                                                    <SidebarMenuButton>
                                                                        <HardDrive /> <span>Login Hosting</span>
                                                                    </SidebarMenuButton>
                                                                </SidebarMenuItem>
                                                                <Separator />
                                                                <SidebarMenuItem>
                                                                    <SidebarMenuButton className="text-red-600/80 hover:bg-red-100 active:bg-red-200 active:text-red-600 hover:text-red-800">
                                                                        <Trash2 /> <span>Remove</span>
                                                                    </SidebarMenuButton>
                                                                </SidebarMenuItem>
                                                            </SidebarMenu>
                                                        </SidebarGroupContent>
                                                    </SidebarGroup>
                                                </SidebarContent>
                                            </Sidebar>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                )
            })}
        </div>
    )
}
