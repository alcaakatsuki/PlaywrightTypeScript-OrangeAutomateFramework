import { type Locator, type Page } from '@playwright/test';

export class AuthPage {
    readonly page: Page;
    readonly signInButton: Locator;
    readonly pageheader: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator
    readonly forgotPasswordLink: Locator; 
    readonly Fieldrequired: Locator;
    readonly errorlogin: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.getByRole('button', { name: 'Login' });
        this.pageheader = page.getByRole('heading', { name: 'Login' })
        this.usernameInput = page.locator("input[name='username']");
        this.passwordInput = page.locator("input[name='password']");
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot your password?' });
        this.Fieldrequired = page.getByText('Required').first();
        this.errorlogin = page.locator('.oxd-alert-content-text');
    }   
    
    
        async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
        await this.page.waitForURL(/dashboard/i, { timeout: 30000 });

    }
        async navigate(){
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { waitUntil: 'domcontentloaded', timeout: 30000 });
        
    }

        async getErrorMessage(): Promise<string> {
        return await this.errorlogin.textContent() || '';
    }

        
 }
        
