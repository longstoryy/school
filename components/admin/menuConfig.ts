import { 
  LayoutDashboard, Users, GraduationCap, BookOpen, Calendar, Clock, FileText, 
  BarChart3, TrendingUp, Settings, Bell, MessageCircle, Mail, User, Target,
  ClipboardList, Award, Building, Car, Library, Shield, Globe, Database,
  Smartphone, UserCheck, UserX, Home, MapPin, FolderOpen, StickyNote,
  CheckSquare, Phone, Video, CreditCard, UserPlus, Trash2, Heart, Zap, Archive,
  Download, Upload, Share2, Search, Sun, Moon, Maximize, Plus, Languages,
  CalendarDays, Command, Trophy, Menu, X, ChevronDown, ChevronRight, LogOut,
  DollarSign, Lock
} from 'lucide-react';

export interface AdminMenuItem {
  name: string;
  icon: any;
  href: string;
  active?: boolean;
  submenu?: AdminMenuItem[];
}

export interface AdminMenuSection {
  title: string;
  items: AdminMenuItem[];
}

export const adminMenuConfig: AdminMenuSection[] = [
  {
    title: 'Dashboard',
    items: [
      { 
        name: 'Overview', 
        icon: LayoutDashboard, 
        href: '/admin/dashboard', 
        active: true 
      },
      { 
        name: 'Analytics', 
        icon: BarChart3, 
        href: '/admin/analytics' 
      },
    ]
  },
  {
    title: 'User Management',
    items: [
      { 
        name: 'Students', 
        icon: GraduationCap, 
        href: '/admin/students',
        submenu: [
          { name: 'All Students', icon: Users, href: '/admin/students' },
          { name: 'Add Student', icon: UserPlus, href: '/admin/students/add' },
          { name: 'Student Profiles', icon: User, href: '/admin/students/profiles' },
          { name: 'Admissions', icon: ClipboardList, href: '/admin/students/admissions' },
        ]
      },
      { 
        name: 'Teachers', 
        icon: Users, 
        href: '/admin/teachers',
        submenu: [
          { name: 'All Teachers', icon: Users, href: '/admin/teachers' },
          { name: 'Add Teacher', icon: UserPlus, href: '/admin/teachers/add' },
          { name: 'Teacher Profiles', icon: User, href: '/admin/teachers/profiles' },
          { name: 'Assignments', icon: ClipboardList, href: '/admin/teachers/assignments' },
        ]
      },
      { 
        name: 'Parents', 
        icon: Heart, 
        href: '/admin/parents' 
      },
      { 
        name: 'Staff', 
        icon: UserCheck, 
        href: '/admin/staff' 
      },
    ]
  },
  {
    title: 'Academic',
    items: [
      { 
        name: 'Classes', 
        icon: Building, 
        href: '/admin/classes',
        submenu: [
          { name: 'All Classes', icon: Building, href: '/admin/classes' },
          { name: 'Create Class', icon: Plus, href: '/admin/classes/create' },
          { name: 'Class Schedules', icon: Calendar, href: '/admin/classes/schedules' },
          { name: 'Room Management', icon: Home, href: '/admin/classes/rooms' },
        ]
      },
      { 
        name: 'Subjects', 
        icon: BookOpen, 
        href: '/admin/subjects' 
      },
      { 
        name: 'Examinations', 
        icon: FileText, 
        href: '/admin/exams',
        submenu: [
          { name: 'All Exams', icon: FileText, href: '/admin/exams' },
          { name: 'Create Exam', icon: Plus, href: '/admin/exams/create' },
          { name: 'Exam Results', icon: Trophy, href: '/admin/exams/results' },
          { name: 'Grade Reports', icon: BarChart3, href: '/admin/exams/grades' },
        ]
      },
      { 
        name: 'Time Table', 
        icon: Calendar, 
        href: '/admin/timetable' 
      },
    ]
  },
  {
    title: 'Finance',
    items: [
      { 
        name: 'Fee Collection', 
        icon: DollarSign, 
        href: '/admin/fees',
        submenu: [
          { name: 'Collect Fees', icon: DollarSign, href: '/admin/fees' },
          { name: 'Fee Structure', icon: FileText, href: '/admin/fees/structure' },
          { name: 'Payment History', icon: Clock, href: '/admin/fees/history' },
          { name: 'Outstanding Fees', icon: Bell, href: '/admin/fees/outstanding' },
        ]
      },
      { 
        name: 'Expenses', 
        icon: CreditCard, 
        href: '/admin/expenses' 
      },
      { 
        name: 'Reports', 
        icon: BarChart3, 
        href: '/admin/finance-reports' 
      },
    ]
  },
  {
    title: 'Communication',
    items: [
      { 
        name: 'Announcements', 
        icon: Bell, 
        href: '/admin/announcements' 
      },
      { 
        name: 'Messages', 
        icon: MessageCircle, 
        href: '/admin/messages' 
      },
      { 
        name: 'Events', 
        icon: Calendar, 
        href: '/admin/events' 
      },
    ]
  },
  {
    title: 'Reports',
    items: [
      { 
        name: 'Academic Reports', 
        icon: FileText, 
        href: '/admin/academic-reports' 
      },
      { 
        name: 'Attendance Reports', 
        icon: Clock, 
        href: '/admin/attendance-reports' 
      },
      { 
        name: 'Financial Reports', 
        icon: TrendingUp, 
        href: '/admin/financial-reports' 
      },
    ]
  },
  {
    title: 'Settings',
    items: [
      { 
        name: 'System Settings', 
        icon: Settings, 
        href: '/admin/settings',
        submenu: [
          { name: 'General Settings', icon: Settings, href: '/admin/settings' },
          { name: 'School Profile', icon: Building, href: '/admin/settings/profile' },
          { name: 'Academic Year', icon: Calendar, href: '/admin/settings/academic-year' },
          { name: 'Notifications', icon: Bell, href: '/admin/settings/notifications' },
        ]
      },
      { 
        name: 'User Roles', 
        icon: Shield, 
        href: '/admin/roles' 
      },
      { 
        name: 'Backup & Security', 
        icon: Lock, 
        href: '/admin/security' 
      },
    ]
  },
];

// Helper function to get active menu item based on current path
export const getActiveMenuItem = (currentPath: string): AdminMenuItem | null => {
  for (const section of adminMenuConfig) {
    for (const item of section.items) {
      if (item.href === currentPath) {
        return item;
      }
      if (item.submenu) {
        for (const subItem of item.submenu) {
          if (subItem.href === currentPath) {
            return subItem;
          }
        }
      }
    }
  }
  return null;
};

// Helper function to check if a section should be expanded based on current path
export const shouldExpandSection = (section: AdminMenuSection, currentPath: string): boolean => {
  return section.items.some(item => {
    if (item.href === currentPath) return true;
    if (item.submenu) {
      return item.submenu.some(subItem => subItem.href === currentPath);
    }
    return false;
  });
};

// Helper function to check if a submenu should be expanded
export const shouldExpandSubmenu = (item: AdminMenuItem, currentPath: string): boolean => {
  if (!item.submenu) return false;
  return item.submenu.some(subItem => subItem.href === currentPath);
};
