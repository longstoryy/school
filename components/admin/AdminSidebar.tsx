'use client';

import { useState, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Shield, X, ChevronRight, LogOut } from 'lucide-react';
import Link from 'next/link';
import { 
  adminMenuConfig, 
  getActiveMenuItem, 
  shouldExpandSection, 
  shouldExpandSubmenu,
  type AdminMenuItem,
  type AdminMenuSection 
} from './menuConfig';

interface AdminSidebarProps {
  darkMode: boolean;
  sidebarOpen: boolean;
  sidebarHovered: boolean;
  setSidebarOpen: (open: boolean) => void;
  setSidebarHovered: (hovered: boolean) => void;
  user: any;
  onLogout: () => void;
}

export default function AdminSidebar({
  darkMode,
  sidebarOpen,
  sidebarHovered,
  setSidebarOpen,
  setSidebarHovered,
  user,
  onLogout
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  // Initialize expanded sections based on current path
  useEffect(() => {
    const initialExpanded: {[key: string]: boolean} = {};
    let initialActiveSubmenu: string | null = null;

    adminMenuConfig.forEach(section => {
      if (shouldExpandSection(section, pathname)) {
        initialExpanded[section.title] = true;
        
        // Check for active submenu
        section.items.forEach(item => {
          if (shouldExpandSubmenu(item, pathname)) {
            initialActiveSubmenu = item.name;
          }
        });
      }
    });

    setExpandedSections(initialExpanded);
    setActiveSubmenu(initialActiveSubmenu);
  }, [pathname]);

  const toggleSection = useCallback((sectionTitle: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }));
  }, []);

  const handleSubmenuToggle = useCallback((itemName: string) => {
    setActiveSubmenu(activeSubmenu === itemName ? null : itemName);
  }, [activeSubmenu]);

  const isItemActive = (item: AdminMenuItem): boolean => {
    return pathname === item.href;
  };

  const hasActiveSubmenu = (item: AdminMenuItem): boolean => {
    if (!item.submenu) return false;
    return item.submenu.some(subItem => pathname === subItem.href);
  };

  return (
    <div 
      data-admin-sidebar
      className={`fixed inset-y-0 left-0 z-30 transform transition-all duration-500 ease-in-out lg:translate-x-0 flex flex-col group ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } ${
        sidebarOpen ? 'w-60' : sidebarHovered ? 'lg:w-60' : 'lg:w-20'
      }`}
      onMouseEnter={() => {
        if (!sidebarOpen) {
          setSidebarHovered(true);
          document.body.classList.add('admin-sidebar-hover-active');
          // Auto-move navbar
          const navbar = document.querySelector('nav[style*="left"]') as HTMLElement;
          if (navbar) {
            navbar.style.left = '240px';
          }
        }
      }}
      onMouseLeave={() => {
        if (!sidebarOpen) {
          setSidebarHovered(false);
          document.body.classList.remove('admin-sidebar-hover-active');
          // Reset navbar position
          const navbar = document.querySelector('nav[style*="left"]') as HTMLElement;
          if (navbar) {
            navbar.style.left = '80px';
          }
        }
      }}
      style={{
        background: darkMode 
          ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.98) 0%, rgba(31, 41, 55, 0.95) 50%, rgba(55, 65, 81, 0.92) 100%)'
          : 'linear-gradient(135deg, rgba(248, 250, 252, 0.98) 0%, rgba(241, 245, 249, 0.95) 50%, rgba(226, 232, 240, 0.92) 100%)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRight: darkMode ? '1px solid rgba(75, 85, 99, 0.3)' : '1px solid rgba(148, 163, 184, 0.2)',
        borderTop: '3px solid',
        borderImage: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b) 1',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
      }}
    >
      {/* 🎯 Admin Sidebar Header */}
      <div className={`flex items-center justify-between p-6 border-b ${
        darkMode ? 'border-gray-600/30' : 'border-white/10'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div className={`transition-all duration-300 overflow-hidden ${
            sidebarOpen || sidebarHovered ? 'opacity-100 max-w-none' : 'lg:opacity-0 lg:max-w-0'
          }`}>
            <h1 className={`text-xl font-bold whitespace-nowrap ${
              darkMode ? 'text-gray-100' : 'text-slate-800'
            }`}>Admin Panel</h1>
            <p className={`text-xs whitespace-nowrap ${
              darkMode ? 'text-gray-400' : 'text-slate-600'
            }`}>Enterprise Dashboard</p>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className={`lg:hidden p-2 rounded-lg transition-all duration-200 ${
            darkMode 
              ? 'text-gray-400 hover:text-white hover:bg-gray-700/30'
              : 'text-gray-400 hover:text-slate-700 hover:bg-white/10'
          }`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* 🎨 Admin Navigation */}
      <nav className="flex-1 px-2 py-2 overflow-y-auto">
        {/* Collapsed State - Icon Representatives */}
        {!sidebarOpen && !sidebarHovered && (
          <div className="lg:flex flex-col space-y-1 px-2">
            {adminMenuConfig.map((section, sectionIndex) => (
              <div key={`collapsed-${sectionIndex}`} className="space-y-1">
                {/* Section Divider */}
                {sectionIndex > 0 && (
                  <div className={`mx-2 my-3 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-40 ${
                    darkMode ? 'text-blue-400' : 'text-blue-500'
                  }`}></div>
                )}
                {section.items.map((item, itemIndex) => (
                  <div key={`collapsed-item-${itemIndex}`} className="relative group">
                    <Link
                      href={item.href}
                      className={`icon-representative w-full p-2 rounded-xl transition-all duration-300 flex items-center justify-center group/icon relative overflow-hidden transform hover:scale-105 active:scale-95 ${
                        isItemActive(item) || hasActiveSubmenu(item)
                          ? darkMode
                            ? 'bg-gradient-to-br from-blue-500/30 to-purple-600/30 text-blue-300 shadow-xl animate-pulse'
                            : 'bg-gradient-to-br from-blue-500/20 to-purple-600/20 text-blue-700 shadow-xl animate-pulse'
                          : darkMode
                            ? 'text-gray-300 hover:text-white hover:bg-gradient-to-br hover:from-gray-700/40 hover:to-gray-600/40 hover:shadow-lg'
                            : 'text-slate-600 hover:text-slate-800 hover:bg-gradient-to-br hover:from-white/60 hover:to-gray-50/60 hover:shadow-lg'
                      }`}
                      title={item.name}
                      onMouseEnter={(e) => {
                        // Sweet ripple effect on hover
                        const button = e.currentTarget;
                        const ripple = document.createElement('div');
                        ripple.className = 'absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30 animate-ping';
                        button.appendChild(ripple);
                        setTimeout(() => ripple.remove(), 600);
                      }}
                    >
                      {/* Gradient Border Animation */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      
                      {/* Sweet glow effect for active items */}
                      {(isItemActive(item) || hasActiveSubmenu(item)) && (
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 animate-pulse pointer-events-none"></div>
                      )}
                      
                      <item.icon className="w-5 h-5 transition-all duration-300 group-hover/icon:scale-125 group-hover/icon:rotate-12 relative z-10 drop-shadow-sm" />
                      
                      {/* Sparkle effect on hover */}
                      <div className="absolute top-0 right-0 w-2 h-2 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full opacity-0 group-hover/icon:opacity-100 group-hover/icon:animate-bounce transition-all duration-300 delay-100"></div>
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        
        {/* Expanded State - Full Menu */}
        <div className={`space-y-1 px-2 ${
          sidebarOpen || sidebarHovered ? 'block' : 'lg:hidden'
        }`}>
          {adminMenuConfig.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-1">
              {/* 🏷️ Collapsible Section Header */}
              <button
                onClick={() => {
                  toggleSection(section.title);
                  // Sweet click feedback
                  const button = document.activeElement as HTMLElement;
                  if (button) {
                    button.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                      button.style.transform = 'scale(1)';
                    }, 150);
                  }
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 rounded-lg group/section relative overflow-hidden transform hover:scale-[1.02] active:scale-95 ${
                  darkMode
                    ? 'text-gray-400/90 hover:text-gray-200 hover:bg-gray-700/30'
                    : 'text-slate-500/90 hover:text-slate-700 hover:bg-white/30'
                }`}
                onMouseEnter={(e) => {
                  // Delightful section hover effect
                  const element = e.currentTarget;
                  const sparkle = document.createElement('div');
                  sparkle.className = 'absolute top-1 right-8 w-1 h-1 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full animate-ping';
                  element.appendChild(sparkle);
                  setTimeout(() => sparkle.remove(), 1000);
                }}
              >
                {/* Section header gradient effect */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover/section:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))',
                  }}
                ></div>
                
                {/* Sweet expanding indicator */}
                {expandedSections[section.title] && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 rounded-r-full animate-pulse"></div>
                )}
                
                <span className="relative z-10 transition-all duration-300 overflow-hidden whitespace-nowrap group-hover/section:text-transparent group-hover/section:bg-clip-text group-hover/section:bg-gradient-to-r group-hover/section:from-blue-400 group-hover/section:to-purple-400">{section.title}</span>
                <ChevronRight className={`w-3 h-3 transition-all duration-500 flex-shrink-0 relative z-10 group-hover/section:text-blue-400 ${
                  expandedSections[section.title] ? 'rotate-90 text-blue-400' : ''
                }`} />
              </button>

              {/* 📋 Section Items */}
              {expandedSections[section.title] && (
                <div className="space-y-1 ml-2">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="relative group">
                      {/* Main Menu Item */}
                      <div className="flex items-center">
                        <Link
                          href={item.href}
                          className={`premium-menu-item flex items-center flex-1 px-3 py-2.5 rounded-lg transition-all duration-300 group/item relative overflow-hidden hover:translate-x-2 transform hover:scale-[1.02] active:scale-[0.98] ${
                            isItemActive(item) || hasActiveSubmenu(item)
                              ? darkMode
                                ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-300 shadow-lg'
                                : 'bg-gradient-to-r from-blue-500/10 to-purple-600/10 text-blue-700 shadow-lg'
                              : darkMode
                                ? 'text-gray-300 hover:text-white hover:bg-gray-700/40'
                                : 'text-slate-600 hover:text-slate-800 hover:bg-white/40'
                          } ${sidebarOpen || sidebarHovered ? 'space-x-3' : 'justify-center'}`}
                          style={{
                            backdropFilter: (isItemActive(item) || hasActiveSubmenu(item)) ? 'blur(15px)' : 'none'
                          }}
                          onMouseEnter={(e) => {
                            // Sweet success ripple effect
                            const element = e.currentTarget;
                            const rect = element.getBoundingClientRect();
                            const ripple = document.createElement('div');
                            ripple.className = 'absolute rounded-full bg-gradient-to-r from-green-400/40 via-blue-400/40 to-purple-400/40 animate-ping pointer-events-none';
                            ripple.style.width = ripple.style.height = '20px';
                            ripple.style.left = '10px';
                            ripple.style.top = '50%';
                            ripple.style.transform = 'translateY(-50%)';
                            element.appendChild(ripple);
                            setTimeout(() => ripple.remove(), 800);
                          }}
                        >
                          {/* 🌈 Animated Border Gradient */}
                          <div className="absolute inset-0 rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{
                              background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
                            }}
                          ></div>
                          
                          {/* Sweet active glow */}
                          {(isItemActive(item) || hasActiveSubmenu(item)) && (
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 animate-pulse pointer-events-none"></div>
                          )}
                          <div className="flex items-center relative z-10 w-full">
                            {/* 🎯 Icon - Always Visible */}
                            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                              <item.icon className={`w-6 h-6 transition-all duration-300 group-hover/item:scale-110 ${
                                isItemActive(item) || hasActiveSubmenu(item)
                                  ? darkMode ? 'text-blue-400' : 'text-blue-600'
                                  : darkMode
                                    ? 'text-gray-300 group-hover/item:text-white'
                                    : 'text-slate-600 group-hover/item:text-slate-800'
                              }`} />
                            </div>
                            
                            {/* 📝 Label */}
                            <span className={`text-sm font-medium transition-all duration-300 overflow-hidden whitespace-nowrap ${
                              sidebarOpen || sidebarHovered
                                ? 'opacity-100 w-auto ml-3' 
                                : 'lg:opacity-0 lg:w-0 lg:ml-0'
                            } ${
                              isItemActive(item) || hasActiveSubmenu(item)
                                ? darkMode ? 'text-blue-300' : 'text-blue-700'
                                : darkMode ? 'text-gray-300 group-hover/item:text-white' : 'text-slate-600 group-hover/item:text-slate-800'
                            }`}>
                              {item.name}
                            </span>
                          </div>

                          {/* 💬 Tooltip for collapsed sidebar */}
                          {!sidebarOpen && !sidebarHovered && (
                            <div className={`absolute left-full ml-2 px-2 py-1 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 ${
                              darkMode
                                ? 'bg-gray-700 text-gray-100 border border-gray-600'
                                : 'bg-white text-gray-900 border border-gray-200 shadow-lg'
                            }`}>
                              {item.name}
                            </div>
                          )}
                        </Link>

                        {/* Submenu Toggle Button */}
                        {item.submenu && (sidebarOpen || sidebarHovered) && (
                          <button
                            onClick={() => handleSubmenuToggle(item.name)}
                            className={`p-2 rounded-lg transition-all duration-200 ml-1 ${
                              darkMode
                                ? 'text-gray-400 hover:text-white hover:bg-gray-700/40'
                                : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
                            }`}
                          >
                            <ChevronRight className={`w-3 h-3 transition-transform duration-300 ${
                              activeSubmenu === item.name ? 'rotate-90' : ''
                            }`} />
                          </button>
                        )}
                      </div>

                      {/* Submenu Items */}
                      {item.submenu && activeSubmenu === item.name && (sidebarOpen || sidebarHovered) && (
                        <div className="ml-6 mt-1 space-y-1">
                          {item.submenu.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.href}
                              className={`flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-300 group/sub relative overflow-hidden ${
                                isItemActive(subItem)
                                  ? darkMode 
                                    ? 'text-blue-400 bg-gradient-to-r from-blue-500/15 to-purple-500/15 shadow-md' 
                                    : 'text-blue-600 bg-gradient-to-r from-blue-500/10 to-purple-500/10 shadow-md'
                                  : darkMode
                                    ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30'
                                    : 'text-slate-500 hover:text-slate-700 hover:bg-white/30'
                              } ${sidebarOpen || sidebarHovered ? 'space-x-2' : 'justify-center'}`}
                            >
                              {/* Submenu hover effect */}
                              <div className="absolute inset-0 rounded-lg opacity-0 group-hover/sub:opacity-100 transition-opacity duration-300 pointer-events-none"
                                style={{
                                  background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))',
                                }}
                              ></div>
                              <subItem.icon className={`w-4 h-4 flex-shrink-0 ${
                                isItemActive(subItem)
                                  ? darkMode ? 'text-blue-400' : 'text-blue-600'
                                  : darkMode ? 'text-gray-400' : 'text-slate-500'
                              }`} />
                              <span className={`transition-all duration-300 ${
                                sidebarOpen || sidebarHovered ? 'opacity-100' : 'lg:opacity-0 lg:w-0'
                              }`}>
                                {subItem.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* 📏 Section Divider */}
              {sectionIndex < adminMenuConfig.length - 1 && (
                <div className={`mx-3 my-4 transition-all duration-500 ${
                  sidebarOpen || sidebarHovered ? 'opacity-100' : 'lg:opacity-0'
                }`}>
                  <div className={`h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-30 ${
                    darkMode ? 'text-gray-400' : 'text-slate-400'
                  }`}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* 👤 Admin User Profile Section */}
      <div className={`p-3 border-t ${darkMode ? 'border-gray-600/30' : 'border-gray-200/20'}`}>
        <div className={`flex items-center rounded-xl transition-all duration-300 group/profile shadow-sm relative overflow-hidden ${
          darkMode 
            ? 'bg-gray-700/30 hover:bg-gray-600/40' 
            : 'bg-white/20 hover:bg-white/40'
        } ${
          sidebarOpen || sidebarHovered ? 'p-3 space-x-3' : 'p-2 justify-center'
        }`}>
          {/* Profile hover effect */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover/profile:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))',
            }}
          ></div>
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-xs font-bold">
                {user?.name?.charAt(0) || 'A'}
              </span>
            </div>
            {/* Online Status Indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
          </div>
          <div className={`transition-all duration-300 overflow-hidden ${
            sidebarOpen || sidebarHovered ? 'opacity-100 flex-1 min-w-0' : 'lg:opacity-0 lg:w-0'
          }`}>
            <div className="flex items-center justify-between w-full">
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-medium truncate ${
                  darkMode ? 'text-gray-200' : 'text-slate-800'
                }`}>
                  {user?.name || 'Admin User'}
                </p>
                <p className={`text-xs truncate ${
                  darkMode ? 'text-gray-400' : 'text-slate-600'
                }`}>
                  {user?.role || 'Administrator'}
                </p>
              </div>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to logout?')) {
                    onLogout();
                  }
                }}
                className={`p-1.5 rounded-xl transition-all duration-200 hover:scale-110 flex-shrink-0 ml-2 group/logout ${
                  darkMode
                    ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-500/50'
                    : 'bg-red-500/10 hover:bg-red-500/20 text-red-600 hover:text-red-700 border border-red-500/20 hover:border-red-500/40'
                }`}
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5 group-hover/logout:rotate-12 transition-transform duration-200" />
              </button>
            </div>
          </div>

          {/* Tooltip for collapsed state */}
          {!sidebarOpen && !sidebarHovered && (
            <div className={`absolute left-full ml-2 px-2 py-1 text-xs rounded-md opacity-0 group-hover/profile:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 ${
              darkMode
                ? 'bg-gray-700 text-gray-100 border border-gray-600'
                : 'bg-white text-gray-900 border border-gray-200 shadow-lg'
            }`}>
              {user?.name || 'Admin User'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
