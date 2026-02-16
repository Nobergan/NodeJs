# 📧 Email Notification System

This project features a modular email sending system built with **Nodemailer** and **Handlebars**, allowing for dynamic, template-based communication with users.

## 🛠 Tech Stack

- **Transport**: [Nodemailer](https://nodemailer.com/) - Node.js module for easy email sending.
- **Template Engine**: [Handlebars](https://handlebarsjs.com/) - Clean, semantic templates with logic-less syntax.
- **Provider Support**: Configured for SMTP (e.g., Gmail, Mailtrap).

## 📂 Project Structure

- **Service**: `src/services/email.service.ts` — contains the core logic for rendering and sending emails.
- **Templates**: `src/templates/` — stores `.hbs` template files.
  - `src/templates/base.hbs`: The master layout containing the universal HTML structure.
  - `src/templates/welcome.hbs`: The content-specific template for registration.

## ⚙️ Core Logic

### 1. Template Rendering
The `EmailService` uses a private method `_renderTemplate` to inject partial content into the base layout.
- It reads `base.hbs` and the specific child template (e.g., `welcome.hbs`).
- It compiles them using Handlebars and merges the provided context (e.g., user's name).

### 2. Sending Emails
The `sendEmail` method handles the transport:
```typescript
public async sendEmail(
    to: string,
    subject: string,
    templateName: string,
    context: Record<string, any>,
): Promise<void>
```

## 🔄 User Workflow: Registration
Currently, the email system is integrated into the `signUp` process:
1. A new user registers via `AuthService.signUp`.
2. Upon successful DB creation, the `emailService.sendEmail` is called.
3. The user receives a **Welcome** email rendered via the `welcome.hbs` template.

## 🔧 Configuration
To enable email sending, ensure the following variables are set in your `.env` file:
```env
# Gmail Example
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

> [!NOTE]
> For Gmail, you must use an "App Password" if 2FA is enabled.