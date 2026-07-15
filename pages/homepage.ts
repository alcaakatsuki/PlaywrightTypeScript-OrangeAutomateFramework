import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  private page: Page;
  
  // Sidebar - Menu principal
  private sidebar: Locator;
  private menuItems: Locator;
  
  // Menu items individuales
  adminMenu: Locator;
  pimMenu: Locator;
  leaveMenu: Locator;
  timeMenu: Locator;
  recruitmentMenu: Locator;
  myInfoMenu: Locator;
  performanceMenu: Locator;
  directoryMenu: Locator;
  maintenanceMenu: Locator;
  claimMenu: Locator;
  buzzMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Selector del sidebar completo
    this.sidebar = page.locator('aside[class*="sidepanel"]');
    this.menuItems = page.locator('nav[class*="oxd-main-menu"] a');
    
    // Cada opción del menú
    this.adminMenu = page.getByRole('link', { name: /admin/i });
    this.pimMenu = page.getByRole('link', { name: /pim/i });
    this.leaveMenu = page.getByRole('link', { name: /leave/i });
    this.timeMenu = page.getByRole('link', { name: /time/i });
    this.recruitmentMenu = page.getByRole('link', { name: /recruitment/i });
    this.myInfoMenu = page.getByRole('link', { name: /my info/i });
    this.performanceMenu = page.getByRole('link', { name: /performance/i });
    this.directoryMenu = page.getByRole('link', { name: /directory/i });
    this.maintenanceMenu = page.getByRole('link', { name: /maintenance/i });
    this.claimMenu = page.getByRole('link', { name: /claim/i });
    this.buzzMenu = page.getByRole('link', { name: /buzz/i });
  }

  // Verificar que el sidebar está visible
  async isSidebarVisible(): Promise<boolean> {
    return this.sidebar.isVisible();
  }

  // Obtener todos los items del menú
  async getAllMenuItems(): Promise<string[]> {
    return this.menuItems.allTextContents();
  }

  // Click en un menú específico
  async clickAdminMenu() {
    await this.adminMenu.click();
  }

  async clickPimMenu() {
    await this.pimMenu.click();
  }

  async clickLeaveMenu() {
    await this.leaveMenu.click();
  }

  // Método genérico para cualquier opción
  async clickMenuByName(menuName: string) {
    await this.page.getByRole('link', { name: new RegExp(menuName, 'i') }).click();
  }
}