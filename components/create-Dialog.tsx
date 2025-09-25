"use client"

import * as React from "react"
import { useState } from "react"
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
  PanelLeft,
  BriefcaseBusiness,
  CircleUser,
  Globe,
  Search,
  Users,
  X,
  Plus,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "./ui/input"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { ScrollArea } from "./ui/scroll-area"
import { Switch } from "./ui/switch"

type MenuKey = "Project" | "Team" | "Client" | "Setting"

const MENU_ITEMS: { key: MenuKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "Project", label: "Project", icon: FolderClosed },
  { key: "Team", label: "Team", icon: BarChart2 },
  { key: "Client", label: "Client", icon: CircleUser },
  { key: "Setting", label: "Setting", icon: Settings2 },
]

export function CreateDialog() {
  const [active, setActive] = React.useState<MenuKey>("Project")
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={"lg"} className="border border-neutral-400">
          <Plus className="mr-0 " /> Create Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px] rounded-2xl border-0 p-0 overflow-hidden">
        <div className="flex h-[450px]">
          {/* Sidebar inside dialog */}
          <aside
            className={cn(
              "shrink-0 border-r border-neutral-300 bg-muted/30 transition-all duration-200 overflow-hidden",
              collapsed ? "w-0 pointer-events-none" : "md:w-40 w-28"
            )}
            aria-hidden={collapsed}
          >
            <div className="px-3  py-4 min-h-[49px] max-h-[49px]">
              <DialogHeader >
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
                    "flex w-full items-center border-neutral-300 gap-2 rounded-0 border-t text-sm transition-colors",
                    collapsed ? "justify-center px-0 py-3" : "px-3 py-3",
                    active === key
                      ? "bg-sidebar-accent text-neutral-800"
                      : "hover:bg-sidebar hover:text-accent-foreground"
                  )}
                  title={collapsed ? label : undefined}
                >
                  <Icon className="size-4" />
                  <span className={cn(collapsed && "sr-only")}>{label}</span>
                </button>
              ))}
            </nav>
            <div className="mt-auto p-3 hidden" />
          </aside>

          {/* Content area */}
          <section className="flex-1 min-w-0">
            <div className="flex h-full flex-col">
              <header className="border-b border-neutral-300 px-2 py-2 pb-2 min-h-[50px] max-h-[50px] flex flex-row">
                <Button
                  size={'icon'}
                  variant={'ghost'}
                  className=" border"
                  onClick={() => setCollapsed((v) => !v)}
                  aria-pressed={collapsed}
                  title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                  <PanelLeft size={15} className={cn(collapsed && 'rotate-180 transition-transform')} />
                </Button>
                <div className="flex flex-col px-2">
                  <h3 className="text-sm font-medium leading-tight">
                    {MENU_ITEMS.find((m) => m.key === active)?.label}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate line-clamp-1">
                    {(() => {
                      const label = MENU_ITEMS.find((m) => m.key === active)?.label;
                      switch (label) {
                        case 'Project':
                          return 'Set up your project basics here.';
                        case 'Team':
                          return 'Manage your team and permissions.';
                        case 'Client':
                          return 'Add client details and contacts.';
                        case 'Setting':
                          return 'Get Setting or adjust your settings.';
                        default:
                          return '';
                      }
                    })()}
                  </p>
                </div>
              </header>
              <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
                {active === "Project" && <ProjectDemo />}
                {active === "Team" && <TeamDemo />}
                {active === "Client" && <ClientDemo />}
                {active === "Setting" && <SettingDemo />}
              </div>
              <footer className="border-t border-neutral-300 px-2 py-2 flex items-center justify-end gap-2">
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

function ProjectDemo() {
  const [logoSelection, setLogoSelection] = React.useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const [previewSource, setPreviewSource] = useState<'file' | 'url' | null>(null);
  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setLogoSelection(file);
    setPreviewSource('file');
  };
  const handleWebsiteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setWebsiteUrl(value);
    setPreviewSource('url');
    
    // Clear preview if URL is empty
    if (!value.trim()) {
      setPreview(null);
    }
  };
  const getDomainFromUrl = (value: string): string => {
    if (!value) return "";
    try {
      const url = value.includes("://") ? new URL(value) : new URL(`https://${value}`);
      return url.hostname;
    } catch {
      return "";
    }
  };

  const getDomainInitials = (url: string): string => {
    const domain = getDomainFromUrl(url);
    if (!domain) return "";
    
    const parts = domain.split('.');
    if (parts.length > 2) {
      // For subdomains, take first letter of first part and first letter of second part
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    // For domains without subdomains, take first two letters of the domain
    return domain.substring(0, 2).toUpperCase();
  };
  React.useEffect(() => {
    let objectUrl: string | null = null;
    const domain = getDomainFromUrl(websiteUrl);
    if (previewSource === 'url' && domain) {
      setPreview(`https://icons.duckduckgo.com/ip3/${domain}.ico`);
    } else if (previewSource === 'file' && logoSelection) {
      objectUrl = URL.createObjectURL(logoSelection);
      setPreview(objectUrl);
    } else if (logoSelection) {
      objectUrl = URL.createObjectURL(logoSelection);
      setPreview(objectUrl);
    } else if (domain) {
      setPreview(`https://icons.duckduckgo.com/ip3/${domain}.ico`);
    } else {
      setPreview(null);
    }
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [logoSelection, websiteUrl, previewSource]);
  
  return (
    <div className="grid gap-4 md:grid-cols-2 max-w-lg">
      <div className="col-span-2 flex flex-row gap-3">
        {/* website logo/favicon  */}
        <div className="flex gap-2">
          <label htmlFor="logo" className="w-12 h-12 relative">
            <Avatar className="w-full border-neutral-300 border rounded-lg h-full hover:border-blue-500 hover:ring-1 hover:ring-blue-500">
              {preview ? (
                <AvatarImage src={preview} alt="Logo preview" className="object-cover rounded" />
              ) : (
                <AvatarFallback className="bg-sidebar-accent rounded text-neutral-500 hover:bg-blue-200 hover:text-blue-500">
                  {websiteUrl ? getDomainInitials(websiteUrl) : <Globe size={16} />}
                </AvatarFallback>
              )}
            </Avatar>
            <input id="logo" type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
          </label>
        </div>
            <Input type="url" value={websiteUrl} onChange={handleWebsiteChange} placeholder="website link..." className="h-full border-neutral-300"  />
      </div>
      <div className="col-span-2 grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Project Name *</label>
          <Input type="text" placeholder="e.g., Marketing Website Redesign" className="h-12 border-neutral-300" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Project Key</label>
          <Input type="text" placeholder="e.g., MKT" className="h-12 border-neutral-300 uppercase" maxLength={5} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Start Date</label>
          <Input type="date" className="h-12 border-neutral-300" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Project Lead</label>
          <select className="flex h-12 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-neutral-300">
            <option value="">Select lead...</option>
            <option value="john">John Doe</option>
            <option value="jane">Jane Smith</option>
          </select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium leading-none">Description</label>
          <textarea 
            placeholder="Project description and goals..." 
            className="flex min-h-[100px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-neutral-300" 
          />
        </div>
      </div>
    
    </div>
  )
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

function TeamDemo() {
  const [search, setSearch] = React.useState('');
  const [isSearching, setIsSearching] = React.useState(false);
  const [selectedMembers, setSelectedMembers] = React.useState<TeamMember[]>([]);
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  
  // Mock data for team members
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Shadcn',
      email: 'shadcn',
      role: 'Developer',
      avatar: 'https://github.com/shadcn.png'
    },
    {
      id: '2',
      name: 'John Doe',
      email: 'johndoe',
      role: 'Designer',
      avatar: ''
    },
    {
      id: '3',
      name: 'Jane Smith',
      email: 'janesmith',
      role: 'Product Manager',
      avatar: ''
    },
    {
      id: '4',
      name: 'Alex Johnson',
      email: 'alexj',
      role: 'Developer',
      avatar: ''
    },
  ];

  // Debounced search
  const filteredMembers = React.useMemo(() => {
    if (!search.trim()) return [];
    const searchTerm = search.toLowerCase();
    return teamMembers.filter(member => {
      const isSelected = selectedMembers.some(m => m.id === member.id);
      return (
        !isSelected && (
          member.name.toLowerCase().includes(searchTerm) ||
          member.email.toLowerCase().includes(searchTerm) ||
          member.role.toLowerCase().includes(searchTerm)
        )
      )
    })
  }, [search, teamMembers, selectedMembers]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!filteredMembers.length) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => 
        prev < filteredMembers.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => 
        prev > 0 ? prev - 1 : 0
      );
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      handleAddMember(filteredMembers[highlightedIndex]);
      setSearch('');
      setHighlightedIndex(-1);
    } else if (e.key === 'Escape') {
      setSearch('');
      setHighlightedIndex(-1);
      searchInputRef.current?.blur();
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setHighlightedIndex(-1);
    setIsSearching(!!e.target.value.trim());
  };

  const clearSearch = () => {
    setSearch('');
    setHighlightedIndex(-1);
    searchInputRef.current?.focus();
  };

  const handleAddMember = (member: TeamMember) => {
    if (!selectedMembers.some(m => m.id === member.id)) {
      setSelectedMembers([...selectedMembers, member]);
      setSearch('');
      setHighlightedIndex(-1);
    }
    if (!selectedMembers.some(m => m.id === member.id)) {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const handleRemoveMember = (memberId: string) => {
    setSelectedMembers(selectedMembers.filter(member => member.id !== memberId));
  };

  return (
    <div className="w-full max-w-lg space-y-4">
    

      {/* Search input */}
      <div className="flex relative flex-col gap-2">
        <div className="relative">
          <div className="relative">
            <Input 
              ref={searchInputRef}
              type="text" 
              value={search} 
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              placeholder="Search by name, email, or role" 
              className="h-12 border-neutral-300 w-full pl-4 pr-10"
              autoComplete="off"
            />
            {search && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:bg-transparent"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
          <div className="absolute left-0 mt-1 text-xs text-muted-foreground pl-2">
            {search.trim().length > 0 && filteredMembers.length > 0 && (
              <span>{filteredMembers.length} result{filteredMembers.length !== 1 ? 's' : ''} found</span>
            )}
          </div>
        
        {/* Search results */}
        {search.trim() && (
          <Card className="rounded-md p-0 max-h-[200px]  absolute top-full mt-2 z-10 w-full overflow-hidden overflow-y-scroll">
            <CardContent className="p-0">
              {/* <ScrollArea className="max-h-[200px] w-full"> */}
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member, index) => (
                    <div 
                      key={member.id} 
                      onClick={() => handleAddMember(member)} 
                      className={cn(
                        "hover:bg-neutral-100 cursor-pointer transition-colors",
                        highlightedIndex === index ? "bg-neutral-100" : ""
                      )}
                      onMouseEnter={() => setHighlightedIndex(index)}
                    >
                      <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">@{member.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs border-neutral-300 text-neutral-500">
                            {member.role}
                          </Badge>
                         
                        </div>
                      </div>
                      <Separator />
                    </div>
                  ))
                ) : search.trim() ? (
                  <div className="p-6 text-center">
                    <Search className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium text-muted-foreground">No members found</p>
                    <p className="text-xs text-muted-foreground mt-1">Try different search terms</p>
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <Search className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium text-muted-foreground">Search team members</p>
                    <p className="text-xs text-muted-foreground mt-1">Search by name, username, or role</p>
                  </div>
                )}
              {/* </ScrollArea> */}
              {/* <div className="border p-2">sdf</div> */}
            </CardContent>
          </Card>
        )}
        </div>
      </div>
        {/* Selected members table */}
        <div className="border border-neutral-300 rounded-lg overflow-hidden mb-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-300">
              <thead className="bg-neutral-200">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Team Member
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    {/* Action */}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-300">
                {selectedMembers.length > 0 ? (
                  selectedMembers.map((member) => (
                    <tr 
                      key={member.id} 
                      onClick={() => handleAddMember(member)}
                      className="hover:bg-neutral-50 cursor-pointer"
                    >
                      <td className="px-6 py-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex items-center justify-center h-10 w-10">
                            <Avatar>
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-neutral-900">
                              {member.name}<br/>
                              <span className="text-neutral-500 font-normal">{member.email}</span>
                              
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="outline" className="text-xs border-neutral-300 text-neutral-500">
                          {member.role}
                        </Badge>
                      </td>
                      <td className="whitespace-nowrap text-sm text-neutral-500">
                        <Button onClick={(e) => { e.stopPropagation(); handleRemoveMember(member.id); }} variant="ghost" size="icon">
                          <X className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Users className="h-8 w-8 text-neutral-400" />
                        <p className="text-sm font-medium text-neutral-500">No team members selected</p>
                        <p className="text-xs text-neutral-400">Search and add team members above</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  )
}

interface Client {
  id: string;
  email: string;
  name: string;
  company: string;
}

function ClientDemo() {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [clients, setClients] = React.useState<Client[]>([]);
  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    const newClient: Client = {
      id: Date.now().toString(),
      email: email.trim(),
      name: name.trim(),
      company: company.trim()
    };
    
    setClients([...clients, newClient]);
    setEmail('');
    setName('');
    setCompany('');
    setIsAdding(false);
  };

  const handleRemoveClient = (clientId: string) => {
    setClients(clients.filter(client => client.id !== clientId));
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Client Access</h3>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => setIsAdding(!isAdding)}
          className="h-8"
        >
          {isAdding ? 'Cancel' : 'Add Client'}
        </Button>
      </div>

      {isAdding && (
        <Card className="p-4 mb-4">
          <form onSubmit={handleAddClient} className="space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Email <span className="text-red-500">*</span>
              </label>
              <Input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@example.com" 
                className="border-neutral-300 h-10"
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Name
                </label>
                <Input 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Client name" 
                  className="border-neutral-300 h-10"
                />
              </div>
              {/* <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Company
                </label>
                <Input 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company name" 
                  className="border-neutral-300 h-10"
                />
              </div> */}
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm">Add Client</Button>
            </div>
          </form>
        </Card>
      )}

      <div className="border border-neutral-300 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-300">
            <thead className="bg-neutral-200">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Client
                </th>
                {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Company
                </th> */}
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-300">
              {clients.length > 0 ? (
                clients.map((client) => (
                  <tr key={client.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-neutral-900">
                          {client.name || 'Unnamed Client'}
                        </p>
                        <p className="text-xs text-neutral-500">{client.email}</p>
                      </div>
                    </td>
                    {/* <td className="px-6 py-3 whitespace-nowrap text-sm text-neutral-500">
                      {client.company || '-'}
                    </td> */}
                    <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleRemoveClient(client.id)}
                      >
                        <X/>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Users className="h-8 w-8 text-neutral-400" />
                      <p className="text-sm font-medium text-neutral-500">No clients added yet</p>
                      <p className="text-xs text-neutral-400">
                        {isAdding ? 'Fill the form above to add a client' : 'Click "Add Client" to get started'}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function SettingDemo() {
  const [notifications, setNotifications] = React.useState({
    email: true,
    inApp: true,
    mentions: true
  });

  const [project, setProject] = React.useState({
    name: 'My Project',
    visibility: 'private',
    timezone: 'UTC+05:30',
    description: ''
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleProjectChange = (field: keyof typeof project, value: string) => {
    setProject(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Project Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Project Name
            </label>
            <Input 
              value={project.name}
              onChange={(e) => handleProjectChange('name', e.target.value)}
              className="border-neutral-300 h-10"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Description
            </label>
            <textarea
              value={project.description}
              onChange={(e) => handleProjectChange('description', e.target.value)}
              className="flex min-h-[80px] w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Project description..."
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Visibility
              </label>
              <select
                value={project.visibility}
                onChange={(e) => handleProjectChange('visibility', e.target.value)}
                className="flex h-10 w-full rounded-md border border-neutral-300 bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="private">Private</option>
                <option value="team">Team</option>
                <option value="public">Public</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Timezone
              </label>
              <select
                value={project.timezone}
                onChange={(e) => handleProjectChange('timezone', e.target.value)}
                className="flex h-10 w-full rounded-md border border-neutral-300 bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="UTC+05:30">(UTC+05:30) India</option>
                <option value="UTC+00:00">(UTC+00:00) UTC</option>
                <option value="UTC-05:00">(UTC-05:00) Eastern Time</option>
                <option value="UTC-08:00">(UTC-08:00) Pacific Time</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Notifications</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Email Notifications</p>
              <p className="text-xs text-muted-foreground">Receive email updates</p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={() => handleNotificationChange('email')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">In-app Notifications</p>
              <p className="text-xs text-muted-foreground">Get notified within the app</p>
            </div>
            <Switch
              checked={notifications.inApp}
              onCheckedChange={() => handleNotificationChange('inApp')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Mentions</p>
              <p className="text-xs text-muted-foreground">Get notified when mentioned</p>
            </div>
            <Switch
              checked={notifications.mentions}
              onCheckedChange={() => handleNotificationChange('mentions')}
            />
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Save Changes</Button>
      </div>
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
