'use client';

import {
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  Clock3,
  Files,
  LayoutDashboard,
  Newspaper,
  Package,
  PanelLeftClose,
  PanelLeftOpen,
  PenLine,
  ReceiptText,
  Search,
  Shapes,
  ShoppingCart,
  Tag,
  Users,
  UserRound,
  X,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';

const mainLinks = [
  { label: 'Welcome', href: '/', icon: LayoutDashboard },
  { label: 'Shop Dashboard', href: '/shop', icon: ShoppingCart },
  { label: 'HR Dashboard', href: '/hr', icon: BriefcaseBusiness },
];

const navigationGroups: {
  id: string;
  label: string;
  icon: LucideIcon;
  links: { label: string; href: string; icon: LucideIcon }[];
}[] = [
  {
    id: 'shop',
    label: 'Shop',
    icon: ShoppingCart,
    links: [
      { label: 'Products', href: '/shop/products', icon: Package },
      { label: 'Orders', href: '/shop/orders', icon: ClipboardList },
      { label: 'Customers', href: '/shop/customers', icon: Users },
      { label: 'Brands', href: '/shop/brands', icon: Tag },
      {
        label: 'Product Categories',
        href: '/shop/product-categories',
        icon: Shapes,
      },
    ],
  },
  {
    id: 'hr',
    label: 'HR',
    icon: BriefcaseBusiness,
    links: [
      { label: 'Employees', href: '/hr/employees', icon: Users },
      { label: 'Departments', href: '/hr/departments', icon: Building2 },
      {
        label: 'Leave Requests',
        href: '/hr/leave-requests',
        icon: CalendarDays,
      },
      { label: 'Expenses', href: '/hr/expenses', icon: ReceiptText },
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: Files,
    links: [
      {
        label: 'Projects',
        href: '/projects/projects',
        icon: BriefcaseBusiness,
      },
      { label: 'Tasks', href: '/projects/tasks', icon: ClipboardList },
      { label: 'Timesheets', href: '/projects/timesheets', icon: Clock3 },
    ],
  },
  {
    id: 'blog',
    label: 'Blog',
    icon: Newspaper,
    links: [
      { label: 'Posts', href: '/blog/posts', icon: PenLine },
      { label: 'Post Categories', href: '/blog/post-categories', icon: Tag },
      { label: 'Authors', href: '/blog/authors', icon: UserRound },
    ],
  },
];

function isActivePath(pathname: string, href: string) {
  return pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));
}

export default function Sidebar({
  children,
}: {
  readonly children: ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [groupOverrides, setGroupOverrides] = useState<
    Record<string, boolean | undefined>
  >({});
  const pathname = usePathname();
  const searchRef = useRef<HTMLInputElement>(null);
  const activeGroupId = navigationGroups.find((group) =>
    group.links.some((link) => isActivePath(pathname, link.href)),
  )?.id;

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCollapsed(false);
        setMobileOpen(true);
        requestAnimationFrame(() => searchRef.current?.focus());
      }
    }

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  function toggleGroup(id: string) {
    setGroupOverrides((overrides) => ({
      ...overrides,
      [id]: !(overrides[id] ?? id === activeGroupId),
    }));
  }

  function focusSearch() {
    setCollapsed(false);
    setMobileOpen(true);
    requestAnimationFrame(() => searchRef.current?.focus());
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <button
        type="button"
        aria-label="Close navigation"
        aria-hidden={!mobileOpen}
        tabIndex={mobileOpen ? 0 : -1}
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-40 cursor-pointer bg-slate-950/30 transition-opacity duration-150 ease-out motion-reduce:transition-none sm:hidden ${
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        id="dashboard-sidebar"
        aria-label="Sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-72 max-w-[85vw] shrink-0 flex-col border-r border-slate-200 bg-white transition-[translate,width] duration-200 ease-out motion-reduce:transition-none sm:sticky sm:top-0 sm:z-auto sm:h-screen sm:max-w-none sm:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } ${collapsed ? 'sm:w-20' : 'sm:w-64'}`}
      >
        <div
          className={`flex h-16 shrink-0 items-center border-b border-slate-200 px-4 ${
            collapsed ? 'justify-center' : 'justify-between'
          }`}
        >
          {!collapsed && (
            <span className="m-2 text-[32px] font-semibold tracking-tight">
              <Link href="/">Strand</Link>
            </span>
          )}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation"
              className="cursor-pointer rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:hidden"
            >
              <X aria-hidden="true" size={18} />
            </button>
            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-expanded={!collapsed}
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className="hidden cursor-pointer rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:block"
            >
              {collapsed ? (
                <PanelLeftOpen aria-hidden="true" size={18} />
              ) : (
                <PanelLeftClose aria-hidden="true" size={18} />
              )}
            </button>
          </div>
        </div>

        <div className="shrink-0 border-b border-slate-200 p-3">
          {collapsed ? (
            <button
              type="button"
              onClick={focusSearch}
              aria-label="Search dashboard"
              title="Search (Ctrl+K)"
              className="flex w-full cursor-pointer justify-center rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <Search aria-hidden="true" size={18} />
            </button>
          ) : (
            <label className="flex h-10 items-center gap-2 rounded-md border border-slate-200 px-3 text-slate-400 shadow-sm focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
              <Search aria-hidden="true" size={16} />
              <input
                ref={searchRef}
                type="search"
                placeholder="Search"
                aria-label="Search dashboard"
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
              <kbd className="shrink-0 rounded border border-slate-200 px-1.5 py-0.5 text-[10px] text-slate-400">
                Ctrl K
              </kbd>
            </label>
          )}
        </div>

        <nav
          id="dashboard-navigation"
          className="min-h-0 flex-1 scrollbar-thin [scrollbar-color:#cbd5e1_transparent] space-y-5 overflow-y-auto overscroll-contain p-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb:hover]:bg-slate-400 [&::-webkit-scrollbar-track]:bg-transparent"
        >
          <ul className="space-y-1">
            {mainLinks.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    aria-label={collapsed ? link.label : undefined}
                    aria-current={active ? 'page' : undefined}
                    title={collapsed ? link.label : undefined}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    } ${collapsed ? 'justify-center' : ''}`}
                  >
                    <Icon aria-hidden="true" size={18} className="shrink-0" />
                    {!collapsed && <span>{link.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="space-y-1">
            {navigationGroups.map((group) => {
              const GroupIcon = group.icon;
              const isOpen =
                groupOverrides[group.id] ?? group.id === activeGroupId;
              const panelId = `${group.id}-navigation`;

              return (
                <section key={group.id}>
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    aria-label={collapsed ? group.label : undefined}
                    title={collapsed ? group.label : undefined}
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 ${
                      collapsed ? 'justify-center' : ''
                    }`}
                  >
                    <GroupIcon
                      aria-hidden="true"
                      size={18}
                      className="shrink-0"
                    />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{group.label}</span>
                        <ChevronDown
                          aria-hidden="true"
                          size={16}
                          className={`transition-transform duration-150 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </>
                    )}
                  </button>
                  <div
                    id={panelId}
                    aria-hidden={!isOpen}
                    inert={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity] duration-150 ease-out ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <ul className="min-h-0 overflow-hidden pt-1">
                      {group.links.map((link) => {
                        const Icon = link.icon;
                        const active = isActivePath(pathname, link.href);

                        return (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={() => setMobileOpen(false)}
                              aria-label={collapsed ? link.label : undefined}
                              aria-current={active ? 'page' : undefined}
                              title={collapsed ? link.label : undefined}
                              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                                active
                                  ? 'bg-blue-50 font-medium text-blue-700'
                                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                              } ${collapsed ? 'justify-center' : 'pl-10'}`}
                            >
                              <Icon
                                aria-hidden="true"
                                size={18}
                                className="shrink-0"
                              />
                              {!collapsed && <span>{link.label}</span>}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </section>
              );
            })}
          </div>
        </nav>

        <div className="shrink-0 border-t border-slate-200 p-3">
          <Link
            href=""
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-600 ${
              collapsed ? 'justify-center' : ''
            } cursor-pointer transition-colors hover:bg-slate-100 hover:text-slate-900`}
          >
            <Bell
              aria-hidden="true"
              size={18}
              className="shrink-0 text-slate-400"
            />
            {!collapsed && <span className="flex-1">Notifications</span>}
            {!collapsed && (
              <span className="rounded-md border border-blue-100 bg-blue-50 px-1.5 py-0.5 text-xs text-blue-700">
                8
              </span>
            )}
          </Link>
          <Link
            href=""
            onClick={() => setMobileOpen(false)}
            className={`mt-2 flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-600 ${
              collapsed ? 'justify-center' : ''
            } cursor-pointer transition-colors hover:bg-slate-100 hover:text-slate-900`}
            aria-label={collapsed ? 'Demo User profile' : undefined}
            title={collapsed ? 'Demo User profile' : undefined}
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-medium text-white">
              DU
            </span>
            {!collapsed && <span>Demo User</span>}
          </Link>
        </div>
      </aside>

      <main className="min-w-0 flex-1 p-4 sm:p-8">
        <div className="mb-4 flex items-center gap-3 sm:hidden">
          <button
            type="button"
            onClick={() => {
              setCollapsed(false);
              setMobileOpen(true);
            }}
            aria-label="Open navigation"
            aria-controls="dashboard-sidebar"
            aria-expanded={mobileOpen}
            title="Open navigation"
            className="cursor-pointer rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <PanelLeftOpen aria-hidden="true" size={18} />
          </button>
          <span className="font-semibold">Strand</span>
        </div>
        {children}
      </main>
    </div>
  );
}
